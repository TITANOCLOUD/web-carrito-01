import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getMonitoringPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MONITORING_DB_HOST || 'saturn-o-cloud.com',
      port: parseInt(process.env.MONITORING_DB_PORT || '3306'),
      user: process.env.MONITORING_DB_USER || 'monitor_user',
      password: process.env.MONITORING_DB_PASSWORD || 'T!t@n0-M0n!t0r2025',
      database: process.env.MONITORING_DB_NAME || 'data-monitoring',
      charset: 'utf8mb4',
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });
  }
  return pool;
}

export async function queryMonitoring(sql: string, params?: any[]) {
  try {
    const pool = getMonitoringPool();
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('[v0] Database query error:', error);
    throw error;
  }
}

export default getMonitoringPool;
