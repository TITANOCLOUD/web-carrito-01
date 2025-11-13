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
    console.error('[v0] Database query error:', error);
    throw error;
  }
}

export default pool;
