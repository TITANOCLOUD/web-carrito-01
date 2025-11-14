import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getMonitoringPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MONITORING_DB_HOST || 'localhost',
      port: parseInt(process.env.MONITORING_DB_PORT || '3306'),
      user: process.env.MONITORING_DB_USER || 'monitor_user',
      password: process.env.MONITORING_DB_PASSWORD || 'T!t@n0-M0n!t0r2025',
      database: process.env.MONITORING_DB_NAME || 'data-monitoring',
      charset: 'utf8mb4',
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      connectTimeout: 10000
    });
    
    console.log('[v0] Pool de MySQL creado para', process.env.MONITORING_DB_HOST || 'localhost');
  }
  return pool;
}

export async function getMonitoringDbConnection() {
  return await mysql.createConnection({
    host: process.env.MONITORING_DB_HOST || 'localhost',
    port: parseInt(process.env.MONITORING_DB_PORT || '3306'),
    user: process.env.MONITORING_DB_USER || 'monitor_user',
    password: process.env.MONITORING_DB_PASSWORD || 'T!t@n0-M0n!t0r2025',
    database: process.env.MONITORING_DB_NAME || 'data-monitoring',
    charset: 'utf8mb4'
  });
}

export async function queryMonitoring(sql: string, params?: any[]) {
  try {
    const pool = getMonitoringPool();
    
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Query timeout after 10s')), 10000)
    );
    
    const query = pool.execute(sql, params);
    
    const [rows] = await Promise.race([query, timeout]) as any;
    
    console.log('[v0] Query ejecutada exitosamente');
    
    return rows;
  } catch (error: any) {
    console.error('[v0] Database query error:', error.message);
    console.error('[v0] SQL:', sql);
    console.error('[v0] Params:', params);
    throw error;
  }
}

export default getMonitoringPool;
