import { NextResponse } from "next/server"

export const runtime = "edge"

// Mock data generator - En producción esto se conectaría a sistemas SNMP reales
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  // Simulación de datos - En producción esto vendría de sistemas reales
  const mockData = {
    id,
    name: `Host-${id}`,
    ip: "192.168.1.100",
    status: "online" as const,
    type: "Ceph Storage",
    reactor: 1,

    snmp: {
      osVersion: "Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-91-generic x86_64)",
      uptime: "45 days, 12:34:56",
      cpu: {
        usage: 45,
        cores: 32,
        model: "Intel(R) Xeon(R) Gold 6248R CPU @ 3.00GHz",
      },
      memory: {
        total: 131072, // MB
        used: 98304,
        free: 32768,
      },
      disks: [
        { name: "/dev/sda1", size: 2048000, used: 1536000, mountPoint: "/" },
        { name: "/dev/sdb1", size: 4096000, used: 2048000, mountPoint: "/data" },
        { name: "/dev/sdc1", size: 8192000, used: 4096000, mountPoint: "/storage" },
      ],
      network: {
        interfaces: [
          { name: "eth0", status: "up" as const, speed: "10 Gbps", rx: 1024000000, tx: 512000000 },
          { name: "eth1", status: "up" as const, speed: "10 Gbps", rx: 2048000000, tx: 1024000000 },
        ],
      },
      hardware: [
        "Intel Xeon Gold 6248R (32 cores)",
        "128 GB DDR4 ECC RAM",
        "2x 2TB NVMe SSD",
        "4x 8TB HDD SATA",
        "Dual 10GbE Network Cards",
        "Redundant Power Supply 1200W",
      ],
    },

    ping: {
      current: 12,
      average: 15,
      min: 8,
      max: 45,
      packetLoss: 0,
      history: [12, 15, 13, 14, 18, 12, 11, 16, 14, 13, 15, 12, 14, 13, 15, 16, 14, 12, 13, 15],
    },
  }

  return NextResponse.json(mockData)
}
