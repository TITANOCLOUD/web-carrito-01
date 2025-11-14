import { NextRequest, NextResponse } from 'next/server'
import { getMonitoringDbConnection } from '@/lib/db-monitoring'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const connection = await getMonitoringDbConnection()
  
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '24h'

    let timeFilter = 'DATE_SUB(NOW(), INTERVAL 24 HOUR)'
    
    switch (range) {
      case '1h':
        timeFilter = 'DATE_SUB(NOW(), INTERVAL 1 HOUR)'
        break
      case '12h':
        timeFilter = 'DATE_SUB(NOW(), INTERVAL 12 HOUR)'
        break
      case '24h':
        timeFilter = 'DATE_SUB(NOW(), INTERVAL 24 HOUR)'
        break
      case 'week':
        timeFilter = 'DATE_SUB(NOW(), INTERVAL 7 DAY)'
        break
      case 'month':
        timeFilter = 'DATE_SUB(NOW(), INTERVAL 30 DAY)'
        break
      case 'year':
        timeFilter = 'DATE_SUB(NOW(), INTERVAL 365 DAY)'
        break
    }

    const [metrics] = await connection.execute(
      `SELECT 
        cpu_usage,
        memory_percent,
        (disk_used / disk_total * 100) as disk_percent,
        network_rx_bytes,
        network_tx_bytes,
        created_at
      FROM system_metrics
      WHERE host_id = ? AND created_at >= ${timeFilter}
      ORDER BY created_at ASC`,
      [id]
    )

    const data = metrics as any[]
    
    const response = {
      cpu: data.map(m => m.cpu_usage),
      memory: data.map(m => m.memory_percent),
      disk: data.map(m => m.disk_percent),
      network: data.map(m => ((m.network_rx_bytes + m.network_tx_bytes) / 1024 / 1024 / 1024 * 100)),
      timestamps: data.map(m => new Date(m.created_at).toLocaleTimeString())
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('[v0] Error fetching metrics:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    await connection.end()
  }
}
