#!/bin/bash

# Script de instalación de archivos de monitoreo
# Ruta base de la aplicación
BASE_PATH="/home/saturno/nodeapp"

echo "======================================"
echo "Instalando archivos de monitoreo"
echo "Ruta base: $BASE_PATH"
echo "======================================"

# Verificar que existe la ruta
if [ ! -d "$BASE_PATH" ]; then
  echo "Error: La ruta $BASE_PATH no existe"
  exit 1
fi

# Crear directorio lib si no existe
mkdir -p "$BASE_PATH/lib"

# Crear archivo lib/db-monitoring.ts
echo "Creando lib/db-monitoring.ts..."
cat > "$BASE_PATH/lib/db-monitoring.ts" << 'EOF'
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MONITORING_DB_HOST || '158.69.43.200',
  port: parseInt(process.env.MONITORING_DB_PORT || '3306'),
  user: process.env.MONITORING_DB_USER || 'monitor_user',
  password: process.env.MONITORING_DB_PASSWORD,
  database: process.env.MONITORING_DB_NAME || 'data-monitoring',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function queryMonitoring(sql: string, params?: any[]) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default pool;
EOF

# Crear directorio app/api/monitoring
mkdir -p "$BASE_PATH/app/api/monitoring"

# Crear archivo app/api/monitoring/route.ts
echo "Creando app/api/monitoring/route.ts..."
cat > "$BASE_PATH/app/api/monitoring/route.ts" << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verificar token
    const tokenResult = await queryMonitoring(
      'SELECT host_id FROM api_tokens WHERE token = ? AND active = 1',
      [token]
    ) as any[];

    if (tokenResult.length === 0) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const hostId = tokenResult[0].host_id;
    const data = await request.json();

    // Guardar métricas
    await queryMonitoring(
      `INSERT INTO metrics (
        host_id, cpu_usage, memory_total, memory_used, memory_free,
        disk_total, disk_used, disk_free, network_rx, network_tx,
        load_avg, uptime, processes, cpu_model, os_version
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        hostId,
        data.cpu_usage,
        data.memory.total,
        data.memory.used,
        data.memory.free,
        data.disk.total,
        data.disk.used,
        data.disk.free,
        data.network.rx_bytes,
        data.network.tx_bytes,
        data.load_avg,
        data.uptime,
        data.processes,
        data.cpu_model,
        data.os_version
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving metrics:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
EOF

# Crear directorio app/api/hosts/list
mkdir -p "$BASE_PATH/app/api/hosts/list"

# Crear archivo app/api/hosts/list/route.ts
echo "Creando app/api/hosts/list/route.ts..."
cat > "$BASE_PATH/app/api/hosts/list/route.ts" << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { queryMonitoring } from '@/lib/db-monitoring';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const reactor = searchParams.get('reactor');

    let query = `
      SELECT 
        h.*,
        m.cpu_usage,
        m.memory_used,
        m.memory_total,
        m.disk_used,
        m.disk_total,
        m.created_at as last_seen
      FROM hosts h
      LEFT JOIN (
        SELECT * FROM metrics m1
        WHERE id IN (
          SELECT MAX(id) FROM metrics GROUP BY host_id
        )
      ) m ON h.id = m.host_id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (type) {
      query += ' AND h.type = ?';
      params.push(type);
    }

    if (reactor) {
      query += ' AND h.reactor_id = ?';
      params.push(parseInt(reactor));
    }

    query += ' ORDER BY h.reactor_id, h.name';

    const hosts = await queryMonitoring(query, params) as any[];

    return NextResponse.json({ hosts });
  } catch (error: any) {
    console.error('Error fetching hosts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
EOF

# Crear archivo .env.local si no existe
if [ ! -f "$BASE_PATH/.env.local" ]; then
  echo "Creando .env.local..."
  cat > "$BASE_PATH/.env.local" << 'EOF'
# Base de datos de monitoreo
MONITORING_DB_HOST=158.69.43.200
MONITORING_DB_PORT=3306
MONITORING_DB_USER=monitor_user
MONITORING_DB_PASSWORD=CAMBIAR_ESTE_PASSWORD
MONITORING_DB_NAME=data-monitoring
EOF
  echo "IMPORTANTE: Edita $BASE_PATH/.env.local y cambia el password"
else
  echo ".env.local ya existe, saltando..."
fi

# Crear directorio scripts si no existe
mkdir -p "$BASE_PATH/scripts"

# Crear agente de monitoreo
echo "Creando scripts/monitor-agent.py..."
cat > "$BASE_PATH/scripts/monitor-agent.py" << 'EOF'
#!/usr/bin/env python3
import psutil
import platform
import requests
import time
import sys
import os

API_URL = os.environ.get('MONITOR_API_URL', 'https://saturn-o.cloud/api/monitoring')
TOKEN = os.environ.get('MONITOR_TOKEN', '')

def get_metrics():
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    net = psutil.net_io_counters()
    
    return {
        'cpu_usage': cpu_percent,
        'memory': {
            'total': memory.total,
            'used': memory.used,
            'free': memory.available
        },
        'disk': {
            'total': disk.total,
            'used': disk.used,
            'free': disk.free
        },
        'network': {
            'rx_bytes': net.bytes_recv,
            'tx_bytes': net.bytes_sent
        },
        'load_avg': os.getloadavg()[0],
        'uptime': int(time.time() - psutil.boot_time()),
        'processes': len(psutil.pids()),
        'cpu_model': platform.processor(),
        'os_version': platform.platform()
    }

def send_metrics():
    try:
        metrics = get_metrics()
        response = requests.post(
            API_URL,
            json=metrics,
            headers={'Authorization': f'Bearer {TOKEN}'},
            timeout=10
        )
        if response.status_code == 200:
            print(f"Métricas enviadas exitosamente")
        else:
            print(f"Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error enviando métricas: {e}")

if __name__ == '__main__':
    while True:
        send_metrics()
        time.sleep(60)
EOF

chmod +x "$BASE_PATH/scripts/monitor-agent.py"

echo ""
echo "======================================"
echo "Instalación completada"
echo "======================================"
echo ""
echo "Archivos creados:"
echo "  - $BASE_PATH/lib/db-monitoring.ts"
echo "  - $BASE_PATH/app/api/monitoring/route.ts"
echo "  - $BASE_PATH/app/api/hosts/list/route.ts"
echo "  - $BASE_PATH/scripts/monitor-agent.py"
echo ""
echo "SIGUIENTES PASOS:"
echo "1. Editar $BASE_PATH/.env.local con el password correcto"
echo "2. Instalar dependencia: cd $BASE_PATH && npm install mysql2"
echo "3. Reiniciar la aplicación Next.js"
echo ""
echo "Para instalar el agente en un servidor monitoreado:"
echo "  export MONITOR_API_URL=https://saturn-o.cloud/api/monitoring"
echo "  export MONITOR_TOKEN=tu_token_aqui"
echo "  python3 $BASE_PATH/scripts/monitor-agent.py"
echo ""
