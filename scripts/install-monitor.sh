#!/bin/bash
# Script de instalación del agente de monitoreo

echo "=========================================="
echo "Saturno Cloud Panel - Instalador"
echo "=========================================="
echo ""

# Verificar si es root
if [ "$EUID" -ne 0 ]; then
  echo "Por favor ejecutar como root (sudo)"
  exit 1
fi

# Instalar dependencias
echo "Instalando dependencias..."
apt-get update
apt-get install -y python3 python3-pip

# Instalar librerías Python
echo "Instalando librerías Python..."
pip3 install psutil requests py-cpuinfo

# Copiar script
echo "Instalando agente de monitoreo..."
cp monitor-agent.py /usr/local/bin/saturno-monitor
chmod +x /usr/local/bin/saturno-monitor

# Crear servicio systemd
echo "Creando servicio systemd..."
cat > /etc/systemd/system/saturno-monitor.service << 'EOF'
[Unit]
Description=Saturno Cloud Panel Monitor Agent
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/bin/python3 /usr/local/bin/saturno-monitor
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Solicitar configuración
echo ""
echo "Configuración del agente:"
read -p "Ingrese el HOST_ID (ej: cluster-01): " HOST_ID
read -p "Ingrese el API_KEY: " API_KEY
read -p "Ingrese el API_ENDPOINT (ej: https://panel.saturnocloud.com/api/metrics/ingest): " API_ENDPOINT

# Actualizar configuración en el script
sed -i "s|HOST_ID = \"cluster-01\"|HOST_ID = \"$HOST_ID\"|g" /usr/local/bin/saturno-monitor
sed -i "s|API_KEY = \"TU_API_KEY_AQUI\"|API_KEY = \"$API_KEY\"|g" /usr/local/bin/saturno-monitor
sed -i "s|API_ENDPOINT = \"https://tu-dominio.com/api/metrics/ingest\"|API_ENDPOINT = \"$API_ENDPOINT\"|g" /usr/local/bin/saturno-monitor

# Habilitar e iniciar servicio
echo "Habilitando servicio..."
systemctl daemon-reload
systemctl enable saturno-monitor
systemctl start saturno-monitor

echo ""
echo "=========================================="
echo "¡Instalación completada!"
echo "=========================================="
echo ""
echo "Comandos útiles:"
echo "  Ver estado:  systemctl status saturno-monitor"
echo "  Ver logs:    journalctl -u saturno-monitor -f"
echo "  Reiniciar:   systemctl restart saturno-monitor"
echo "  Detener:     systemctl stop saturno-monitor"
echo ""
