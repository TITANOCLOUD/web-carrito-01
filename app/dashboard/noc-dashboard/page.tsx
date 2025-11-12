"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, AlertTriangle, CheckCircle2, Server, XCircle, Network, MapPin } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import Link from "next/link"

interface PingResult {
  host: string
  ip: string
  alive: boolean
  time: number
  minTime?: number
  maxTime?: number
  packetsLost?: number
  ttl?: number
  timestamp: Date
}

interface TracerouteHop {
  hop: number
  ip: string
  hostname: string
  rtt: number[]
}

interface TracerouteResult {
  host: string
  hops: TracerouteHop[]
  complete: boolean
}

interface PortScanResult {
  host: string
  openPorts: Array<{
    port: number
    protocol: string
    service: string
    version: string
  }>
  os: string
  latency: number
  rawOutput: string
  scannedAt: string
}

const INITIAL_HOSTS = [
  // Reactor 1 - CEPH Clusters (130+ hosts)
  // CEPH - IBG.COM.CO
  {
    name: "483431-CEPH-IBG-SCA3-G2-BAY-01",
    ip: "72.251.3.93",
    status: "up",
    uptime: 99.98,
    responseTime: 12,
    reactor: 1,
    company: "IBG.COM.CO",
    id: "483431-ceph-ibg-sca3-g2-bay-01",
  },
  {
    name: "501691-CEPH-IBG-SCA3-G2-BAY-02",
    ip: "72.251.3.238",
    status: "up",
    uptime: 99.95,
    responseTime: 15,
    reactor: 1,
    company: "IBG.COM.CO",
    id: "501691-ceph-ibg-sca3-g2-bay-02",
  },
  {
    name: "493196-CEPH-IBG-SCA3-G2-BAY-03",
    ip: "72.251.3.212",
    status: "up",
    uptime: 99.99,
    responseTime: 10,
    reactor: 1,
    company: "IBG.COM.CO",
    id: "493196-ceph-ibg-sca3-g2-bay-03",
  },

  // CEPH - COOTRARIS.COM
  {
    name: "469453-CEPH-SCA1-BAY-01",
    ip: "15.235.67.86",
    status: "up",
    uptime: 100,
    responseTime: 8,
    reactor: 1,
    company: "COOTRARIS.COM",
    id: "469453-ceph-sca1-bay-01",
  },
  {
    name: "469864-CEPH-SCA1-BAY-02",
    ip: "15.235.67.180",
    status: "up",
    uptime: 99.97,
    responseTime: 11,
    reactor: 1,
    company: "COOTRARIS.COM",
    id: "469864-ceph-sca1-bay-02",
  },
  {
    name: "469855-CEPH-SCA1-BAY-03",
    ip: "15.235.43.103",
    status: "up",
    uptime: 99.92,
    responseTime: 13,
    reactor: 1,
    company: "COOTRARIS.COM",
    id: "469855-ceph-sca1-bay-03",
  },

  // CEPH - ICONET.COM.MX
  {
    name: "408163-CEPH-IC-HGR3-01",
    ip: "51.222.152.249",
    status: "up",
    uptime: 99.96,
    responseTime: 13,
    reactor: 1,
    company: "ICONET.COM.MX",
    id: "408163-ceph-ic-hgr3-01",
  },
  {
    name: "422255-CEPH-IC-HGR3-02",
    ip: "15.235.43.68",
    status: "up",
    uptime: 99.94,
    responseTime: 15,
    reactor: 1,
    company: "ICONET.COM.MX",
    id: "422255-ceph-ic-hgr3-02",
  },
  {
    name: "449125-CEPH-IC-HGR3-03",
    ip: "15.235.67.40",
    status: "up",
    uptime: 99.97,
    responseTime: 14,
    reactor: 1,
    company: "ICONET.COM.MX",
    id: "449125-ceph-ic-hgr3-03",
  },

  // CEPH - BETCONNECTIONS.COM (16 nodos)
  {
    name: "482770-CEPH-BT-HGR4-G2-BAY-01",
    ip: "51.222.152.212",
    status: "up",
    uptime: 99.98,
    responseTime: 12,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "482770-ceph-bt-hgr4-g2-bay-01",
  },
  {
    name: "490629-CEPH-BT-HGR4-G2-BAY-02",
    ip: "148.113.193.172",
    status: "up",
    uptime: 99.95,
    responseTime: 13,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "490629-ceph-bt-hgr4-g2-bay-02",
  },
  {
    name: "482769-CEPH-BT-HGR4-G2-BAY-03",
    ip: "148.113.199.14",
    status: "up",
    uptime: 99.97,
    responseTime: 11,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "482769-ceph-bt-hgr4-g2-bay-03",
  },
  {
    name: "499053-CEPH-BT-HGR4-G2-BAY-05",
    ip: "148.113.211.68",
    status: "up",
    uptime: 99.96,
    responseTime: 14,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "499053-ceph-bt-hgr4-g2-bay-05",
  },
  {
    name: "499056-CEPH-BT-HGR4-G2-BAY-06",
    ip: "148.113.211.71",
    status: "up",
    uptime: 99.98,
    responseTime: 12,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "499056-ceph-bt-hgr4-g2-bay-06",
  },
  {
    name: "499054-CEPH-BT-HGR4-G2-BAY-07",
    ip: "148.113.211.67",
    status: "up",
    uptime: 99.95,
    responseTime: 13,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "499054-ceph-bt-hgr4-g2-bay-07",
  },
  {
    name: "499059-CEPH-BT-HGR4-G2-BAY-08",
    ip: "148.113.211.70",
    status: "up",
    uptime: 99.97,
    responseTime: 15,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "499059-ceph-bt-hgr4-g2-bay-08",
  },
  {
    name: "499055-CEPH-BT-HGR4-G2-BAY-09",
    ip: "148.113.211.87",
    status: "up",
    uptime: 99.96,
    responseTime: 11,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "499055-ceph-bt-hgr4-g2-bay-09",
  },
  {
    name: "499057-CEPH-BT-HGR4-G2-BAY-10",
    ip: "148.113.211.69",
    status: "up",
    uptime: 99.98,
    responseTime: 14,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "499057-ceph-bt-hgr4-g2-bay-10",
  },
  {
    name: "499058-CEPH-BT-HGR4-G2-BAY-11",
    ip: "148.113.211.83",
    status: "up",
    uptime: 99.95,
    responseTime: 12,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "499058-ceph-bt-hgr4-g2-bay-11",
  },
  {
    name: "505062-CEPH-BT-HGR4-G2-BAY-12",
    ip: "148.113.215.29",
    status: "up",
    uptime: 99.97,
    responseTime: 13,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "505062-ceph-bt-hgr4-g2-bay-12",
  },
  {
    name: "510531-CEPH-BT-HGR4-G2-BAY-13",
    ip: "51.222.249.56",
    status: "up",
    uptime: 99.96,
    responseTime: 16,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "510531-ceph-bt-hgr4-g2-bay-13",
  },
  {
    name: "510532-CEPH-BT-HGR4-G2-BAY-14",
    ip: "148.113.219.12",
    status: "up",
    uptime: 99.98,
    responseTime: 14,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "510532-ceph-bt-hgr4-g2-bay-14",
  },
  {
    name: "510533-CEPH-BT-HGR4-G2-BAY-15",
    ip: "148.113.224.50",
    status: "up",
    uptime: 99.95,
    responseTime: 15,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "510533-ceph-bt-hgr4-g2-bay-15",
  },
  {
    name: "510534-CEPH-BT-HGR4-G2-BAY-16",
    ip: "15.235.67.107",
    status: "up",
    uptime: 99.97,
    responseTime: 13,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "510534-ceph-bt-hgr4-g2-bay-16",
  },
  {
    name: "510535-CEPH-BT-HGR4-G2-BAY-17",
    ip: "148.113.224.22",
    status: "up",
    uptime: 99.96,
    responseTime: 12,
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    id: "510535-ceph-bt-hgr4-g2-bay-17",
  },

  // CEPH - HBTC
  {
    name: "484063-CEPH-HBTC-HGR3-G2-BAY-01",
    ip: "148.113.187.44",
    status: "up",
    uptime: 99.98,
    responseTime: 14,
    reactor: 1,
    company: "HBTC",
    id: "484063-ceph-hbtc-hgr3-g2-bay-01",
  },
  {
    name: "490630-CEPH-HBTC-HGR3-G2-BAY-02",
    ip: "148.113.193.173",
    status: "up",
    uptime: 99.95,
    responseTime: 13,
    reactor: 1,
    company: "HBTC",
    id: "490630-ceph-hbtc-hgr3-g2-bay-02",
  },
  {
    name: "484062-CEPH-HBTC-HGR3-G2-BAY-03",
    ip: "148.113.187.43",
    status: "up",
    uptime: 99.97,
    responseTime: 15,
    reactor: 1,
    company: "HBTC",
    id: "484062-ceph-hbtc-hgr3-g2-bay-03",
  },

  // CEPH - PROCOM-INC.NET
  {
    name: "476771-CEPH-PO-SCAI3-01",
    ip: "72.251.3.67",
    status: "up",
    uptime: 99.96,
    responseTime: 12,
    reactor: 1,
    company: "PROCOM-INC.NET",
    id: "476771-ceph-po-scai3-01",
  },
  {
    name: "476772-CEPH-PO-SCAI3-02",
    ip: "72.251.3.72",
    status: "up",
    uptime: 99.98,
    responseTime: 11,
    reactor: 1,
    company: "PROCOM-INC.NET",
    id: "476772-ceph-po-scai3-02",
  },
  {
    name: "476784-CEPH-PO-SCAI3-03",
    ip: "72.251.3.45",
    status: "up",
    uptime: 99.95,
    responseTime: 13,
    reactor: 1,
    company: "PROCOM-INC.NET",
    id: "476784-ceph-po-scai3-03",
  },

  // CEPH - PCCORP.COM.AR
  {
    name: "491554-CEPH-PC-SCA1-G2-BAY-1",
    ip: "148.113.199.58",
    status: "up",
    uptime: 99.97,
    responseTime: 14,
    reactor: 1,
    company: "PCCORP.COM.AR",
    id: "491554-ceph-pc-sca1-g2-bay-1",
  },
  {
    name: "491555-CEPH-PC-SCA1-G2-BAY-2",
    ip: "148.113.199.29",
    status: "up",
    uptime: 99.96,
    responseTime: 15,
    reactor: 1,
    company: "PCCORP.COM.AR",
    id: "491555-ceph-pc-sca1-g2-bay-2",
  },
  {
    name: "491553-CEPH-PC-SCA1-G2-BAY-3",
    ip: "148.113.199.59",
    status: "up",
    uptime: 99.98,
    responseTime: 13,
    reactor: 1,
    company: "PCCORP.COM.AR",
    id: "491553-ceph-pc-sca1-g2-bay-3",
  },

  // CEPH - RYNDEM.MX
  {
    name: "483445-CEPH-RYN-SCA3-G2-BAY-01",
    ip: "72.251.3.103",
    status: "up",
    uptime: 99.96,
    responseTime: 12,
    reactor: 1,
    company: "RYNDEM.MX",
    id: "483445-ceph-ryn-sca3-g2-bay-01",
  },
  {
    name: "483442-CEPH-RYN-SCA3-G2-BAY-02",
    ip: "72.251.3.96",
    status: "up",
    uptime: 99.98,
    responseTime: 11,
    reactor: 1,
    company: "RYNDEM.MX",
    id: "483442-ceph-ryn-sca3-g2-bay-02",
  },
  {
    name: "486095-CEPH-RYN-SCA3-G2-BAY-03",
    ip: "72.251.3.139",
    status: "up",
    uptime: 99.95,
    responseTime: 14,
    reactor: 1,
    company: "RYNDEM.MX",
    id: "486095-ceph-ryn-sca3-g2-bay-03",
  },

  // CEPH - IINUBE.COM
  {
    name: "482995-CEPH-IN-HGR3-G2-01",
    ip: "72.251.3.100",
    status: "up",
    uptime: 99.97,
    responseTime: 13,
    reactor: 1,
    company: "IINUBE.COM",
    id: "482995-ceph-in-hgr3-g2-01",
  },
  {
    name: "498611-CEPH-IN-HGR3-G2-02",
    ip: "72.251.3.229",
    status: "up",
    uptime: 99.96,
    responseTime: 12,
    reactor: 1,
    company: "IINUBE.COM",
    id: "498611-ceph-in-hgr3-g2-02",
  },
  {
    name: "503809-CEPH-IN-HGR3-G2-03",
    ip: "72.251.3.242",
    status: "up",
    uptime: 99.98,
    responseTime: 15,
    reactor: 1,
    company: "IINUBE.COM",
    id: "503809-ceph-in-hgr3-g2-03",
  },
  {
    name: "510878-CEPH-IN-HGR3-G2-04",
    ip: "72.251.11.57",
    status: "up",
    uptime: 99.95,
    responseTime: 14,
    reactor: 1,
    company: "IINUBE.COM",
    id: "510878-ceph-in-hgr3-g2-04",
  },

  // CEPH - SERVERPY.COM
  {
    name: "511678-CEPH-STK-HGR-I1-G3-BAY-01",
    ip: "148.113.220.141",
    status: "up",
    uptime: 99.98,
    responseTime: 16,
    reactor: 1,
    company: "SERVERPY.COM",
    id: "511678-ceph-stk-hgr-i1-g3-bay-01",
  },
  {
    name: "500759-CEPH-STK-HGR-I1-G3-BAY-02",
    ip: "148.113.212.220",
    status: "up",
    uptime: 99.96,
    responseTime: 15,
    reactor: 1,
    company: "SERVERPY.COM",
    id: "500759-ceph-stk-hgr-i1-g3-bay-02",
  },
  {
    name: "506218-CEPH-STK-HGR-I1-G3-BAY-03",
    ip: "148.113.222.33",
    status: "up",
    uptime: 99.97,
    responseTime: 14,
    reactor: 1,
    company: "SERVERPY.COM",
    id: "506218-ceph-stk-hgr-i1-g3-bay-03",
  },

  // CEPH - CENTRALTELEFONICA.COM.AR
  {
    name: "469461-CEPH-scale-i1-01",
    ip: "15.235.67.115",
    status: "up",
    uptime: 99.96,
    responseTime: 13,
    reactor: 1,
    company: "CENTRALTELEFONICA.COM.AR",
    id: "469461-ceph-scale-i1-01",
  },
  {
    name: "469870-CEPH-scale-i1-02",
    ip: "15.235.67.186",
    status: "up",
    uptime: 99.98,
    responseTime: 12,
    reactor: 1,
    company: "CENTRALTELEFONICA.COM.AR",
    id: "469870-ceph-scale-i1-02",
  },
  {
    name: "466298-CEPH-scale-i1-03",
    ip: "51.222.249.37",
    status: "up",
    uptime: 99.95,
    responseTime: 16,
    reactor: 1,
    company: "CENTRALTELEFONICA.COM.AR",
    id: "466298-ceph-scale-i1-03",
  },

  // CEPH - AVANTIKA.MX
  {
    name: "475799-CEPH-A-HGR3-BAY-01",
    ip: "15.235.117.106",
    status: "up",
    uptime: 99.97,
    responseTime: 14,
    reactor: 1,
    company: "AVANTIKA.MX",
    id: "475799-ceph-a-hgr3-bay-01",
  },
  {
    name: "475798-CEPH-A-HGR3-BAY-02",
    ip: "15.235.117.104",
    status: "up",
    uptime: 99.96,
    responseTime: 13,
    reactor: 1,
    company: "AVANTIKA.MX",
    id: "475798-ceph-a-hgr3-bay-02",
  },
  {
    name: "475797-CEPH-A-HGR3-BAY-03",
    ip: "15.235.117.105",
    status: "up",
    uptime: 99.98,
    responseTime: 15,
    reactor: 1,
    company: "AVANTIKA.MX",
    id: "475797-ceph-a-hgr3-bay-03",
  },

  // CEPH - HPSERVIDOR.COM
  {
    name: "444276-CEPH-X-HGR3-01",
    ip: "15.235.117.37",
    status: "up",
    uptime: 99.96,
    responseTime: 12,
    reactor: 1,
    company: "HPSERVIDOR.COM",
    id: "444276-ceph-x-hgr3-01",
  },
  {
    name: "447438-CEPH-X-HGR3-02",
    ip: "15.235.117.53",
    status: "up",
    uptime: 99.98,
    responseTime: 11,
    reactor: 1,
    company: "HPSERVIDOR.COM",
    id: "447438-ceph-x-hgr3-02",
  },
  {
    name: "447437-CEPH-X-HGR3-03",
    ip: "15.235.117.52",
    status: "up",
    uptime: 99.95,
    responseTime: 13,
    reactor: 1,
    company: "HPSERVIDOR.COM",
    id: "447437-ceph-x-hgr3-03",
  },

  // CEPH - AGSAMERICAS.COM.CO
  {
    name: "494339-CEPH-AG-SCAI1-G2-BAY-01",
    ip: "148.113.208.166",
    status: "up",
    uptime: 99.97,
    responseTime: 14,
    reactor: 1,
    company: "AGSAMERICAS.COM.CO",
    id: "494339-ceph-ag-scai1-g2-bay-01",
  },
  {
    name: "494350-CEPH-AG-SCAI1-G2-BAY-02",
    ip: "15.235.43.42",
    status: "up",
    uptime: 99.96,
    responseTime: 15,
    reactor: 1,
    company: "AGSAMERICAS.COM.CO",
    id: "494350-ceph-ag-scai1-g2-bay-02",
  },
  {
    name: "494351-CEPH-AG-SCAI1-G2-BAY-03",
    ip: "15.235.43.115",
    status: "up",
    uptime: 99.98,
    responseTime: 13,
    reactor: 1,
    company: "AGSAMERICAS.COM.CO",
    id: "494351-ceph-ag-scai1-g2-bay-03",
  },

  // CEPH - XPERSOFT.NET
  {
    name: "483332-CEPH-EX-HGR3-3",
    ip: "15.235.43.231",
    status: "up",
    uptime: 99.96,
    responseTime: 12,
    reactor: 1,
    company: "XPERSOFT.NET",
    id: "483332-ceph-ex-hgr3-3",
  },
  {
    name: "483333-CEPH-EX-HGR3-1",
    ip: "15.235.43.230",
    status: "up",
    uptime: 99.98,
    responseTime: 11,
    reactor: 1,
    company: "XPERSOFT.NET",
    id: "483333-ceph-ex-hgr3-1",
  },
  {
    name: "483334-CEPH-EX-HGR3-2",
    ip: "15.235.43.237",
    status: "up",
    uptime: 99.95,
    responseTime: 14,
    reactor: 1,
    company: "XPERSOFT.NET",
    id: "483334-ceph-ex-hgr3-2",
  },

  // CEPH - CEIBA.COM.CO
  {
    name: "496225-CEPH-CSH-SCA-I3-G2-BAY-01",
    ip: "72.251.3.203",
    status: "up",
    uptime: 99.97,
    responseTime: 13,
    reactor: 1,
    company: "CEIBA.COM.CO",
    id: "496225-ceph-csh-sca-i3-g2-bay-01",
  },
  {
    name: "493198-CEPH-CSH-SCA-I3-G2-BAY-03",
    ip: "72.251.3.216",
    status: "up",
    uptime: 99.96,
    responseTime: 12,
    reactor: 1,
    company: "CEIBA.COM.CO",
    id: "493198-ceph-csh-sca-i3-g2-bay-03",
  },
  {
    name: "493199-CEPH-CSH-SCA-I3-G2-BAY-02",
    ip: "72.251.3.215",
    status: "up",
    uptime: 99.98,
    responseTime: 15,
    reactor: 1,
    company: "CEIBA.COM.CO",
    id: "493199-ceph-csh-sca-i3-g2-bay-02",
  },

  // CEPH - ABPROSYSTEMS.COM
  {
    name: "486569-CEPH-TAB-SCA3-BAY-01",
    ip: "148.113.187.110",
    status: "up",
    uptime: 99.95,
    responseTime: 14,
    reactor: 1,
    company: "ABPROSYSTEMS.COM",
    id: "486569-ceph-tab-sca3-bay-01",
  },
  {
    name: "486568-CEPH-TAB-SCA3-BAY-02",
    ip: "148.113.187.109",
    status: "up",
    uptime: 99.96,
    responseTime: 13,
    reactor: 1,
    company: "ABPROSYSTEMS.COM",
    id: "486568-ceph-tab-sca3-bay-02",
  },
  {
    name: "483529-CEPH-TAB-SCA3-BAY-03",
    ip: "148.113.187.35",
    status: "up",
    uptime: 99.98,
    responseTime: 12,
    reactor: 1,
    company: "ABPROSYSTEMS.COM",
    id: "483529-ceph-tab-sca3-bay-03",
  },

  // CEPH - KDUCEO.NET
  {
    name: "501686-CEPH-MRK-HGR4-G2-01",
    ip: "15.235.43.16",
    status: "up",
    uptime: 99.97,
    responseTime: 15,
    reactor: 1,
    company: "KDUCEO.NET",
    id: "501686-ceph-mrk-hgr4-g2-01",
  },
  {
    name: "501685-CEPH-MRK-HGR4-G2-02",
    ip: "148.113.213.79",
    status: "up",
    uptime: 99.96,
    responseTime: 14,
    reactor: 1,
    company: "KDUCEO.NET",
    id: "501685-ceph-mrk-hgr4-g2-02",
  },
  {
    name: "501684-CEPH-MRK-HGR4-G2-03",
    ip: "15.235.43.97",
    status: "up",
    uptime: 99.98,
    responseTime: 13,
    reactor: 1,
    company: "KDUCEO.NET",
    id: "501684-ceph-mrk-hgr4-g2-03",
  },
  {
    name: "501683-CEPH-MRK-HGR4-G2-04",
    ip: "15.235.43.104",
    status: "up",
    uptime: 99.95,
    responseTime: 16,
    reactor: 1,
    company: "KDUCEO.NET",
    id: "501683-ceph-mrk-hgr4-g2-04",
  },

  // CEPH - DG
  {
    name: "9002640-CEPH-DG-HGR4-BAY-01",
    ip: "15.235.117.114",
    status: "up",
    uptime: 99.97,
    responseTime: 12,
    reactor: 1,
    company: "DG",
    id: "9002640-ceph-dg-hgr4-bay-01",
  },
  {
    name: "9002641-CEPH-DG-HGR4-BAY-02",
    ip: "148.113.199.165",
    status: "up",
    uptime: 99.96,
    responseTime: 13,
    reactor: 1,
    company: "DG",
    id: "9002641-ceph-dg-hgr4-bay-02",
  },
  {
    name: "9002642-CEPH-DG-HGR4-BAY-03",
    ip: "15.235.117.181",
    status: "up",
    uptime: 99.98,
    responseTime: 14,
    reactor: 1,
    company: "DG",
    id: "9002642-ceph-dg-hgr4-bay-03",
  },
  {
    name: "9002643-CEPH-DG-HGR4-BAY-04",
    ip: "148.113.215.11",
    status: "up",
    uptime: 99.95,
    responseTime: 15,
    reactor: 1,
    company: "DG",
    id: "9002643-ceph-dg-hgr4-bay-04",
  },
  {
    name: "9002644-CEPH-DG-HGR4-BAY-05",
    ip: "148.113.212.203",
    status: "up",
    uptime: 99.96,
    responseTime: 13,
    reactor: 1,
    company: "DG",
    id: "9002644-ceph-dg-hgr4-bay-05",
  },
  {
    name: "9002645-CEPH-DG-HGR4-BAY-05-B",
    ip: "148.113.215.5",
    status: "up",
    uptime: 99.98,
    responseTime: 12,
    reactor: 1,
    company: "DG",
    id: "9002645-ceph-dg-hgr4-bay-05-b",
  },

  // CEPH - GP
  {
    name: "9002647-CEPH-GP-HGR4-G2-01",
    ip: "148.113.218.177",
    status: "up",
    uptime: 99.97,
    responseTime: 14,
    reactor: 1,
    company: "GP",
    id: "9002647-ceph-gp-hgr4-g2-01",
  },
  {
    name: "9002648-CEPH-GP-HGR4-G2-02",
    ip: "148.113.218.168",
    status: "up",
    uptime: 99.96,
    responseTime: 13,
    reactor: 1,
    company: "GP",
    id: "9002648-ceph-gp-hgr4-g2-02",
  },
  {
    name: "9002649-CEPH-GP-HGR4-G2-03",
    ip: "148.113.218.176",
    status: "up",
    uptime: 99.98,
    responseTime: 15,
    reactor: 1,
    company: "GP",
    id: "9002649-ceph-gp-hgr4-g2-03",
  },

  // CEPH - OAKSYSTEM (15 hosts)
  {
    name: "300001-CEPH-OAK-HGR3-G3-BAY-01",
    ip: "72.251.11.68",
    status: "up",
    uptime: 99.97,
    responseTime: 12,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "300001-ceph-oak-hgr3-g3-bay-01",
  },
  {
    name: "300002-CEPH-OAK-HGR3-G3-BAY-02",
    ip: "72.251.11.73",
    status: "up",
    uptime: 99.96,
    responseTime: 11,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "300002-ceph-oak-hgr3-g3-bay-02",
  },
  {
    name: "300003-CEPH-OAK-HGR3-G3-BAY-03",
    ip: "72.251.11.201",
    status: "up",
    uptime: 99.95,
    responseTime: 13,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "300003-ceph-oak-hgr3-g3-bay-03",
  },
  {
    name: "500001-CEPH-OAK-S-SCA1-ip132",
    ip: "144.217.17.132",
    status: "up",
    uptime: 99.98,
    responseTime: 14,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500001-ceph-oak-s-sca1-ip132",
  },
  {
    name: "500002-CEPH-OAK-S-SCA1-ip133",
    ip: "144.217.17.133",
    status: "up",
    uptime: 99.96,
    responseTime: 15,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500002-ceph-oak-s-sca1-ip133",
  },
  {
    name: "500003-CEPH-OAK-S-SCA1-ip134",
    ip: "144.217.17.134",
    status: "up",
    uptime: 99.97,
    responseTime: 13,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500003-ceph-oak-s-sca1-ip134",
  },
  {
    name: "500004-CEPH-OAK-S-SCA1-ip135",
    ip: "144.217.17.135",
    status: "up",
    uptime: 99.95,
    responseTime: 16,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500004-ceph-oak-s-sca1-ip135",
  },
  {
    name: "500005-CEPH-OAK-HGR-3-ip48",
    ip: "158.69.136.48",
    status: "up",
    uptime: 99.96,
    responseTime: 12,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500005-ceph-oak-hgr-3-ip48",
  },
  {
    name: "500006-CEPH-OAK-HGR-3-ip49",
    ip: "158.69.136.49",
    status: "up",
    uptime: 99.98,
    responseTime: 11,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500006-ceph-oak-hgr-3-ip49",
  },
  {
    name: "500007-CEPH-OAK-HGR-3-ip50",
    ip: "158.69.136.50",
    status: "up",
    uptime: 99.96,
    responseTime: 14,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500007-ceph-oak-hgr-3-ip50",
  },
  {
    name: "500008-CEPH-OAK-HGR-3-ip51",
    ip: "158.69.136.51",
    status: "up",
    uptime: 99.97,
    responseTime: 13,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500008-ceph-oak-hgr-3-ip51",
  },
  {
    name: "500009-CEPH-OAK-HGR-3-ip52",
    ip: "158.69.136.52",
    status: "up",
    uptime: 99.95,
    responseTime: 15,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500009-ceph-oak-hgr-3-ip52",
  },
  {
    name: "500010-CEPH-OAK-HGR-3-ip53",
    ip: "158.69.136.53",
    status: "up",
    uptime: 99.96,
    responseTime: 12,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500010-ceph-oak-hgr-3-ip53",
  },
  {
    name: "500011-CEPH-OAK-HGR-3-ip54",
    ip: "158.69.136.54",
    status: "up",
    uptime: 99.98,
    responseTime: 11,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500011-ceph-oak-hgr-3-ip54",
  },
  {
    name: "500012-CEPH-OAK-HGR-3-ip55",
    ip: "158.69.136.55",
    status: "up",
    uptime: 99.96,
    responseTime: 14,
    reactor: 1,
    company: "OAKSYSTEM",
    id: "500012-ceph-oak-hgr-3-ip55",
  },

  // CEPH - SKY
  {
    name: "600001-CEPH-SKY-HGR-I4-G3-BAY-01",
    ip: "148.113.220.120",
    status: "up",
    uptime: 99.97,
    responseTime: 16,
    reactor: 1,
    company: "SKY",
    id: "600001-ceph-sky-hgr-i4-g3-bay-01",
  },
  {
    name: "600002-CEPH-SKY-HGR-I4-G3-BAY-02",
    ip: "148.113.220.253",
    status: "up",
    uptime: 99.96,
    responseTime: 15,
    reactor: 1,
    company: "SKY",
    id: "600002-ceph-sky-hgr-i4-g3-bay-02",
  },
  {
    name: "600003-CEPH-SKY-HGR-I4-G3-BAY-03",
    ip: "148.113.222.35",
    status: "up",
    uptime: 99.98,
    responseTime: 14,
    reactor: 1,
    company: "SKY",
    id: "600003-ceph-sky-hgr-i4-g3-bay-03",
  },
  {
    name: "600004-CEPH-SKY-HGR-I4-G3-BAY-04",
    ip: "148.113.220.246",
    status: "up",
    uptime: 99.95,
    responseTime: 17,
    reactor: 1,
    company: "SKY",
    id: "600004-ceph-sky-hgr-i4-g3-bay-04",
  },
  {
    name: "600005-CEPH-SKY-HGR-I4-G3-BAY-05",
    ip: "148.113.222.37",
    status: "up",
    uptime: 99.96,
    responseTime: 16,
    reactor: 1,
    company: "SKY",
    id: "600005-ceph-sky-hgr-i4-g3-bay-05",
  },

  // ADDED UBIQUANDO CEPH CLUSTERS
  {
    name: "700001-CEPH-UB-HGR3-G2-BAY-01",
    ip: "72.251.3.243",
    status: "up",
    uptime: 99.98,
    responseTime: 12,
    reactor: 1,
    company: "UBIQUANDO",
    id: "700001-ceph-ub-hgr3-g2-bay-01",
  },
  {
    name: "700002-CEPH-UB-HGR3-G2-BAY-02",
    ip: "72.251.3.246",
    status: "up",
    uptime: 99.95,
    responseTime: 14,
    reactor: 1,
    company: "UBIQUANDO",
    id: "700002-ceph-ub-hgr3-g2-bay-02",
  },
  {
    name: "700003-CEPH-UB-HGR3-G2-BAY-03",
    ip: "72.251.3.247",
    status: "up",
    uptime: 99.97,
    responseTime: 13,
    reactor: 1,
    company: "UBIQUANDO",
    id: "700003-ceph-ub-hgr3-g2-bay-03",
  },

  // Reactor 2 - Servidores SPAM (3 hosts)
  {
    name: "100001-SPAM-HBTC-VM-2001",
    ip: "54.39.125.239",
    status: "up",
    uptime: 99.98,
    responseTime: 18,
    reactor: 2,
    company: "HBTC",
    id: "100001-spam-hbtc-vm-2001",
  },
  {
    name: "100002-SPAM-HBTC-VM-2002",
    ip: "54.39.46.9",
    status: "up",
    uptime: 99.96,
    responseTime: 19,
    reactor: 2,
    company: "HBTC",
    id: "100002-spam-hbtc-vm-2002",
  },
  {
    name: "100003-SPAM-HBTC-VM-2003",
    ip: "144.217.195.234",
    status: "up",
    uptime: 99.97,
    responseTime: 17,
    reactor: 2,
    company: "HBTC",
    id: "100003-spam-hbtc-vm-2003",
  },

  // Reactor 3 - VPS (38 hosts)
  // VPS - CTRLONLINE
  {
    name: "200001-VPS-CTRLONLINE-MinSalud",
    ip: "20.246.48.58",
    status: "up",
    uptime: 99.97,
    responseTime: 22,
    reactor: 3,
    company: "CTRLONLINE",
    id: "200001-vps-ctrlonline-minsalud",
  },
  {
    name: "200002-VPS-CTRLONLINE-Universidad-Militar",
    ip: "20.49.8.45",
    status: "up",
    uptime: 99.96,
    responseTime: 23,
    reactor: 3,
    company: "CTRLONLINE",
    id: "200002-vps-ctrlonline-universidad-militar",
  },
  {
    name: "200003-VPS-CTRLONLINE-Bomberos-Bogota",
    ip: "172.206.18.16",
    status: "up",
    uptime: 99.98,
    responseTime: 21,
    reactor: 3,
    company: "CTRLONLINE",
    id: "200003-vps-ctrlonline-bomberos-bogota",
  },
  {
    name: "200004-VPS-CTRLONLINE-Grupo-SUMMA",
    ip: "40.67.136.56",
    status: "up",
    uptime: 99.95,
    responseTime: 24,
    reactor: 3,
    company: "CTRLONLINE",
    id: "200004-vps-ctrlonline-grupo-summa",
  },
  {
    name: "200005-VPS-CTRLONLINE-ARGOS",
    ip: "20.96.177.143",
    status: "up",
    uptime: 99.96,
    responseTime: 22,
    reactor: 3,
    company: "CTRLONLINE",
    id: "200005-vps-ctrlonline-argos",
  },
  {
    name: "200006-VPS-CTRLONLINE-DESUR",
    ip: "158.69.43.204",
    status: "up",
    uptime: 99.98,
    responseTime: 20,
    reactor: 3,
    company: "CTRLONLINE",
    id: "200006-vps-ctrlonline-desur",
  },
  {
    name: "200007-VPS-CTRLONLINE-FORPO",
    ip: "167.114.48.85",
    status: "up",
    uptime: 99.96,
    responseTime: 21,
    reactor: 3,
    company: "CTRLONLINE",
    id: "200007-vps-ctrlonline-forpo",
  },
  {
    name: "200008-VPS-CTRLONLINE-INS",
    ip: "167.114.48.86",
    status: "up",
    uptime: 99.97,
    responseTime: 19,
    reactor: 3,
    company: "CTRLONLINE",
    id: "200008-vps-ctrlonline-ins",
  },
  {
    name: "200009-VPS-CTRLONLINE-CANCILLERIA",
    ip: "192.99.238.252",
    status: "up",
    uptime: 99.95,
    responseTime: 23,
    reactor: 3,
    company: "CTRLONLINE",
    id: "200009-vps-ctrlonline-cancilleria",
  },

  // VPS - OAKSYSTEM (29 hosts)
  {
    name: "400001-VPS-OAK-ip144",
    ip: "142.44.185.144",
    status: "up",
    uptime: 99.97,
    responseTime: 18,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400001-vps-oak-ip144",
  },
  {
    name: "400002-VPS-OAK-ip145",
    ip: "142.44.185.145",
    status: "up",
    uptime: 99.96,
    responseTime: 19,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400002-vps-oak-ip145",
  },
  {
    name: "400003-VPS-OAK-ip146",
    ip: "142.44.185.146",
    status: "up",
    uptime: 99.98,
    responseTime: 17,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400003-vps-oak-ip146",
  },
  {
    name: "400004-VPS-OAK-ip147",
    ip: "142.44.185.147",
    status: "up",
    uptime: 99.95,
    responseTime: 20,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400004-vps-oak-ip147",
  },
  {
    name: "400005-VPS-OAK-ip148",
    ip: "142.44.185.148",
    status: "up",
    uptime: 99.96,
    responseTime: 18,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400005-vps-oak-ip148",
  },
  {
    name: "400006-VPS-OAK-ip149",
    ip: "142.44.185.149",
    status: "up",
    uptime: 99.98,
    responseTime: 19,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400006-vps-oak-ip149",
  },
  {
    name: "400007-VPS-OAK-ip150",
    ip: "142.44.185.150",
    status: "up",
    uptime: 99.96,
    responseTime: 21,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400007-vps-oak-ip150",
  },
  {
    name: "400008-VPS-OAK-ip151",
    ip: "142.44.185.151",
    status: "up",
    uptime: 99.97,
    responseTime: 17,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400008-vps-oak-ip151",
  },
  {
    name: "400009-VPS-OAK-SVRCONTAB1",
    ip: "192.99.193.229",
    status: "up",
    uptime: 99.95,
    responseTime: 22,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400009-vps-oak-svrcontab1",
  },
  {
    name: "400010-VPS-OAK-SRVENCODER1",
    ip: "192.99.193.227",
    status: "up",
    uptime: 99.96,
    responseTime: 20,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400010-vps-oak-srvencoder1",
  },
  {
    name: "400011-VPS-OAK-SRVENCODER2",
    ip: "192.99.193.226",
    status: "up",
    uptime: 99.98,
    responseTime: 18,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400011-vps-oak-srvencoder2",
  },
  {
    name: "400012-VPS-OAK-SVR-APPPAGOS",
    ip: "142.44.185.149",
    status: "up",
    uptime: 99.96,
    responseTime: 19,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400012-vps-oak-svr-apppagos",
  },
  {
    name: "400013-VPS-OAK-SVRPANEL",
    ip: "142.44.185.146",
    status: "up",
    uptime: 99.97,
    responseTime: 21,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400013-vps-oak-svrpanel",
  },
  {
    name: "400014-VPS-OAK-SVRSTADISTICAS",
    ip: "54.39.46.112",
    status: "up",
    uptime: 99.95,
    responseTime: 23,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400014-vps-oak-svrstadisticas",
  },
  {
    name: "400015-VPS-OAK-ubuntu24",
    ip: "142.44.185.148",
    status: "up",
    uptime: 99.96,
    responseTime: 18,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400015-vps-oak-ubuntu24",
  },
  {
    name: "400016-VPS-OAK-MAIN1",
    ip: "72.251.12.245",
    status: "up",
    uptime: 99.98,
    responseTime: 17,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400016-vps-oak-main1",
  },
  {
    name: "400017-VPS-OAK-TV1-PPR",
    ip: "72.251.12.246",
    status: "up",
    uptime: 99.96,
    responseTime: 19,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400017-vps-oak-tv1-ppr",
  },
  {
    name: "400018-VPS-OAK-VLP1-PPR",
    ip: "72.251.12.247",
    status: "up",
    uptime: 99.97,
    responseTime: 20,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400018-vps-oak-vlp1-ppr",
  },
  {
    name: "400019-VPS-OAK-MAIN2",
    ip: "72.251.12.248",
    status: "up",
    uptime: 99.95,
    responseTime: 18,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400019-vps-oak-main2",
  },
  {
    name: "400020-VPS-OAK-TV2-PPR",
    ip: "72.251.12.249",
    status: "up",
    uptime: 99.96,
    responseTime: 21,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400020-vps-oak-tv2-ppr",
  },
  {
    name: "400021-VPS-OAK-VLP2-PPR",
    ip: "72.251.12.250",
    status: "up",
    uptime: 99.98,
    responseTime: 19,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400021-vps-oak-vlp2-ppr",
  },
  {
    name: "400022-VPS-OAK-MAIN3",
    ip: "72.251.12.252",
    status: "up",
    uptime: 99.96,
    responseTime: 22,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400022-vps-oak-main3",
  },
  {
    name: "400023-VPS-OAK-TV3-PPR",
    ip: "72.251.12.253",
    status: "up",
    uptime: 99.97,
    responseTime: 17,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400023-vps-oak-tv3-ppr",
  },
  {
    name: "400024-VPS-OAK-TV4-PPR",
    ip: "51.222.150.2",
    status: "up",
    uptime: 99.95,
    responseTime: 24,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400024-vps-oak-tv4-ppr",
  },
  {
    name: "400025-VPS-OAK-FIREWALL-VRACK",
    ip: "142.44.185.147",
    status: "up",
    uptime: 99.96,
    responseTime: 20,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400025-vps-oak-firewall-vrack",
  },
  {
    name: "400026-VPS-OAK-MGMERICK",
    ip: "10.20.200.2",
    status: "up",
    uptime: 99.98,
    responseTime: 5,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400026-vps-oak-mgmerick",
  },
  {
    name: "400027-VPS-OAK-MGMERICK-Copy",
    ip: "10.20.200.2",
    status: "up",
    uptime: 99.96,
    responseTime: 5,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400027-vps-oak-mgmerick-copy",
  },
  {
    name: "400028-VPS-OAK-Template-Win2019",
    ip: "10.20.200.2",
    status: "up",
    uptime: 99.97,
    responseTime: 5,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400028-vps-oak-template-win2019",
  },
  {
    name: "400029-VPS-OAK-META",
    ip: "51.222.150.1",
    status: "up",
    uptime: 99.95,
    responseTime: 23,
    reactor: 3,
    company: "OAKSYSTEM",
    id: "400029-vps-oak-meta",
  },

  // ADDED UBIQUANDO VPS
  {
    name: "700100-VPS-UB-FWCLUSTER-APP-PPR-V01",
    ip: "144.217.112.91",
    status: "up",
    uptime: 99.95,
    responseTime: 15,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700100-vps-ub-fwcluster-app-ppr-v01",
  },
  {
    name: "700101-VPS-UB-FWCLUSTER-APP-BKPV-V01",
    ip: "144.217.112.77",
    status: "up",
    uptime: 99.92,
    responseTime: 16,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700101-vps-ub-fwcluster-app-bkpv-v01",
  },
  {
    name: "700201-VPS-UB-PRD-03",
    ip: "144.217.112.88",
    status: "up",
    uptime: 99.98,
    responseTime: 12,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700201-vps-ub-prd-03",
  },
  {
    name: "700202-VPS-UB-TST-01",
    ip: "144.217.112.82",
    status: "up",
    uptime: 99.94,
    responseTime: 14,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700202-vps-ub-tst-01",
  },
  {
    name: "700204-VPS-UB-TST-02",
    ip: "144.217.112.83",
    status: "up",
    uptime: 99.96,
    responseTime: 13,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700204-vps-ub-tst-02",
  },
  {
    name: "700205-VPS-UB-DEV-01",
    ip: "144.217.112.79",
    status: "up",
    uptime: 99.91,
    responseTime: 17,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700205-vps-ub-dev-01",
  },
  {
    name: "700206-VPS-UB-DEV-02",
    ip: "144.217.112.80",
    status: "up",
    uptime: 99.93,
    responseTime: 15,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700206-vps-ub-dev-02",
  },
  {
    name: "700207-VPS-UB-DEV-03",
    ip: "144.217.112.81",
    status: "up",
    uptime: 99.95,
    responseTime: 14,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700207-vps-ub-dev-03",
  },
  {
    name: "700208-VPS-UB-PRD-01",
    ip: "144.217.112.84",
    status: "up",
    uptime: 99.97,
    responseTime: 13,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700208-vps-ub-prd-01",
  },
  {
    name: "700209-VPS-UB-PRD-02",
    ip: "144.217.112.85",
    status: "up",
    uptime: 99.98,
    responseTime: 12,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700209-vps-ub-prd-02",
  },
  {
    name: "700210-VPS-UB-PRD-04",
    ip: "144.217.112.87",
    status: "up",
    uptime: 99.96,
    responseTime: 13,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700210-vps-ub-prd-04",
  },
  {
    name: "700212-VPS-UB-PRD-06",
    ip: "144.217.112.90",
    status: "up",
    uptime: 99.94,
    responseTime: 15,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700212-vps-ub-prd-06",
  },
  {
    name: "700213-VPS-UB-UBS-01",
    ip: "144.217.112.78",
    status: "up",
    uptime: 99.92,
    responseTime: 16,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700213-vps-ub-ubs-01",
  },
  {
    name: "700214-VPS-UB-PRD-05",
    ip: "144.217.112.86",
    status: "up",
    uptime: 99.95,
    responseTime: 14,
    reactor: 3,
    company: "UBIQUANDO",
    id: "700214-vps-ub-prd-05",
  },
  {
    name: "702000-VPS-UB-SVRNAS-APP-PPR-V01",
    ip: "144.217.112.89",
    status: "up",
    uptime: 99.97,
    responseTime: 13,
    reactor: 3,
    company: "UBIQUANDO",
    id: "702000-vps-ub-svrnas-app-ppr-v01",
  },

  // Reactor 4 - Bare Metal (37 hosts)
  // PBS Servers
  {
    name: "506748-BARE-IBG-ADVSTO-G2-PBS-01",
    ip: "148.113.216.7",
    status: "up",
    uptime: 99.98,
    responseTime: 15,
    reactor: 4,
    company: "IBG.COM.CO",
    id: "506748-bare-ibg-advsto-g2-pbs-01",
  },
  {
    name: "472841-BARE-ADVSTORE-G2-PBS-01",
    ip: "148.113.169.29",
    status: "up",
    uptime: 99.96,
    responseTime: 16,
    reactor: 4,
    company: "COOTRARIS.COM",
    id: "472841-bare-advstore-g2-pbs-01",
  },
  {
    name: "489836-BARE-IC-ADVSTOR-STOR-NG3-PBS-01",
    ip: "148.113.193.2",
    status: "up",
    uptime: 99.97,
    responseTime: 14,
    reactor: 4,
    company: "ICONET.COM.MX",
    id: "489836-bare-ic-advstor-stor-ng3-pbs-01",
  },
  {
    name: "9002651-BARE-HBTC-ADV-G2-PBS-01",
    ip: "158.69.168.64",
    status: "up",
    uptime: 99.95,
    responseTime: 17,
    reactor: 4,
    company: "HBTC",
    id: "9002651-bare-hbtc-adv-g2-pbs-01",
  },
  {
    name: "446396-BARE-SYS-SYS-1-SAT-32-PBS-BAY-1",
    ip: "192.99.36.34",
    status: "up",
    uptime: 99.96,
    responseTime: 15,
    reactor: 4,
    company: "SERVSOFT.COM",
    id: "446396-bare-sys-sys-1-sat-32-pbs-bay-1",
  },
  {
    name: "414182-BARE-PR-PBS-BAY-01",
    ip: "15.235.10.221",
    status: "up",
    uptime: 99.98,
    responseTime: 16,
    reactor: 4,
    company: "PREVISALUD.COM.CO",
    id: "414182-bare-pr-pbs-bay-01",
  },
  {
    name: "506757-BARE-IN-ADVST1-G3-PBS-01",
    ip: "148.113.216.8",
    status: "up",
    uptime: 99.96,
    responseTime: 14,
    reactor: 4,
    company: "IINUBE.COM",
    id: "506757-bare-in-advst1-g3-pbs-01",
  },
  {
    name: "502741-BARE-STK-ADVSTOR-G1-PBS-BAY-01",
    ip: "148.113.214.35",
    status: "up",
    uptime: 99.97,
    responseTime: 18,
    reactor: 4,
    company: "SERVERPY.COM",
    id: "502741-bare-stk-advstor-g1-pbs-bay-01",
  },
  {
    name: "415417-BARE-ADVSTORE-G2-PBS-01",
    ip: "15.235.12.57",
    status: "up",
    uptime: 99.95,
    responseTime: 15,
    reactor: 4,
    company: "CENTRALTELEFONICA.COM.AR",
    id: "415417-bare-advstore-g2-pbs-01",
  },
  {
    name: "9002646-BARE-DG-HGRSTO-G2-PBS-01",
    ip: "192.99.84.56",
    status: "up",
    uptime: 99.96,
    responseTime: 16,
    reactor: 4,
    company: "DG",
    id: "9002646-bare-dg-hgrsto-g2-pbs-01",
  },
  {
    name: "9002650-BARE-GP-ADVSTO-G2-PBS-01",
    ip: "72.251.5.50",
    status: "up",
    uptime: 99.98,
    responseTime: 13,
    reactor: 4,
    company: "GP",
    id: "9002650-bare-gp-advsto-g2-pbs-01",
  },
  {
    name: "481396-BARE-EX-ADVG2-G2-PBS-01",
    ip: "148.113.170.146",
    status: "up",
    uptime: 99.96,
    responseTime: 17,
    reactor: 4,
    company: "XPERSOFT.NET",
    id: "481396-bare-ex-advg2-g2-pbs-01",
  },
  {
    name: "506750-BARE-CSH-ADVSTO-G3-PBS-BAY-01",
    ip: "148.113.216.4",
    status: "up",
    uptime: 99.97,
    responseTime: 14,
    reactor: 4,
    company: "CEIBA.COM.CO",
    id: "506750-bare-csh-advsto-g3-pbs-bay-01",
  },
  {
    name: "422858-BARE-T-ADVSTOR1-G2-PBS-01",
    ip: "15.235.12.231",
    status: "up",
    uptime: 99.95,
    responseTime: 16,
    reactor: 4,
    company: "ABPROSYSTEMS.COM",
    id: "422858-bare-t-advstor1-g2-pbs-01",
  },
  {
    name: "437541-BARE-ADVS1-PBS-01",
    ip: "15.235.83.54",
    status: "up",
    uptime: 99.96,
    responseTime: 15,
    reactor: 4,
    company: "KDUCEO.NET",
    id: "437541-bare-advs1-pbs-01",
  },
  {
    name: "472844-BARE-ADVS1-PBS-02",
    ip: "148.113.169.32",
    status: "up",
    uptime: 99.98,
    responseTime: 17,
    reactor: 4,
    company: "KDUCEO.NET",
    id: "472844-bare-advs1-pbs-02",
  },
  {
    name: "490047-BARE-PC-ADVSTOR2-G2-PBS-01",
    ip: "148.113.193.211",
    status: "up",
    uptime: 99.96,
    responseTime: 14,
    reactor: 4,
    company: "PCCORP.COM.AR",
    id: "490047-bare-pc-advstor2-g2-pbs-01",
  },
  {
    name: "494697-BARE-AG-ADVSTOR1-G2-PBS-01",
    ip: "148.113.208.27",
    status: "up",
    uptime: 99.97,
    responseTime: 16,
    reactor: 4,
    company: "AGSAMERICAS.COM.CO",
    id: "494697-bare-ag-advstor1-g2-pbs-01",
  },
  {
    name: "600006-BARE-SKY-RISESTRO-G3-BAY-01-GMR",
    ip: "141.95.85.145",
    status: "up",
    uptime: 99.95,
    responseTime: 19,
    reactor: 4,
    company: "SKY",
    id: "600006-bare-sky-risestro-g3-bay-01-gmr",
  },

  // ADDED UBIQUANDO BARE METAL PBS
  {
    name: "700500-BARE-UB-HGRSTO-G2-PBS-BAY-01",
    ip: "144.217.112.91",
    status: "up",
    uptime: 99.98,
    responseTime: 12,
    reactor: 4,
    company: "UBIQUANDO",
    id: "700500-bare-ub-hgrsto-g2-pbs-bay-01",
  },

  // Dedicated Servers
  {
    name: "473203-BARE-HBTC-ADVSTO-G2-PBS-01",
    ip: "148.113.169.39",
    status: "up",
    uptime: 99.98,
    responseTime: 15,
    reactor: 4,
    company: "HBTC",
    id: "473203-bare-hbtc-advsto-g2-pbs-01",
  },
  {
    name: "314722-BARE-HBTC-RISE1-LABHACK",
    ip: "54.39.105.106",
    status: "up",
    uptime: 99.96,
    responseTime: 21,
    reactor: 4,
    company: "HBTC",
    id: "314722-bare-hbtc-rise1-labhack",
  },
  {
    name: "378012-BARE-HBTC-INFRA-1-ZIMBRA",
    ip: "51.222.47.74",
    status: "up",
    uptime: 99.97,
    responseTime: 18,
    reactor: 4,
    company: "HBTC",
    id: "378012-bare-hbtc-infra-1-zimbra",
  },
  {
    name: "482760-BARE-BT-HGR1-G1-MONGO-GATEWAY",
    ip: "51.222.152.216",
    status: "up",
    uptime: 99.95,
    responseTime: 17,
    reactor: 4,
    company: "BETCONNECTIONS.COM",
    id: "482760-bare-bt-hgr1-g1-mongo-gateway",
  },
  {
    name: "484061-BARE-BT-HGR3-G1-MONGO-GATEWAY",
    ip: "148.113.187.42",
    status: "up",
    uptime: 99.96,
    responseTime: 16,
    reactor: 4,
    company: "BETCONNECTIONS.COM",
    id: "484061-bare-bt-hgr3-g1-mongo-gateway",
  },
  {
    name: "496833-BARE-BT-HGR-STOR-1-PBS-01",
    ip: "148.113.208.168",
    status: "up",
    uptime: 99.98,
    responseTime: 14,
    reactor: 4,
    company: "BETCONNECTIONS.COM",
    id: "496833-bare-bt-hgr-stor-1-pbs-01",
  },
  {
    name: "500013-BARE-OAK-SRVLP-4-LNX-10GB-ip25",
    ip: "192.95.19.25",
    status: "up",
    uptime: 99.96,
    responseTime: 20,
    reactor: 4,
    company: "OAKSYSTEM",
    id: "500013-bare-oak-srvlp-4-lnx-10gb-ip25",
  },
  {
    name: "425017-BARE-OAK-TM-ADV2-G2",
    ip: "15.235.42.45",
    status: "up",
    uptime: 99.97,
    responseTime: 15,
    reactor: 4,
    company: "OAKSYSTEM",
    id: "425017-bare-oak-tm-adv2-g2",
  },
  {
    name: "453197-BARE-OAK-TM-ADVSTOR1-G2",
    ip: "148.113.152.145",
    status: "up",
    uptime: 99.95,
    responseTime: 17,
    reactor: 4,
    company: "OAKSYSTEM",
    id: "453197-bare-oak-tm-advstor1-g2",
  },
  {
    name: "236186-BARE-panel",
    ip: "192.99.33.217",
    status: "up",
    uptime: 99.96,
    responseTime: 19,
    reactor: 4,
    company: "TITANO CLOUD",
    id: "236186-bare-panel",
  },
  {
    name: "493203-BARE-SYS-SCA-I3-G3-BAY-1",
    ip: "148.113.199.219",
    status: "up",
    uptime: 99.98,
    responseTime: 14,
    reactor: 4,
    company: "SERVSOFT.COM",
    id: "493203-bare-sys-sca-i3-g3-bay-1",
  },
  {
    name: "494422-BARE-RYN-ADVSTO-G2-PBS-01",
    ip: "148.113.206.140",
    status: "up",
    uptime: 99.96,
    responseTime: 16,
    reactor: 4,
    company: "RYNDEM.MX",
    id: "494422-bare-ryn-advsto-g2-pbs-01",
  },
  {
    name: "401453-BARE-PR-HGR3-BAY-01",
    ip: "51.222.249.84",
    status: "up",
    uptime: 99.97,
    responseTime: 18,
    reactor: 4,
    company: "PREVISALUD.COM.CO",
    id: "401453-bare-pr-hgr3-bay-01",
  },
  {
    name: "453090-BARE-ADV5-G2-1",
    ip: "15.235.115.179",
    status: "up",
    uptime: 99.95,
    responseTime: 15,
    reactor: 4,
    company: "VALORX.NET",
    id: "453090-bare-adv5-g2-1",
  },
  {
    name: "451816-BARE-ZE-RISE1-G2-PVE",
    ip: "148.113.159.120",
    status: "up",
    uptime: 99.96,
    responseTime: 17,
    reactor: 4,
    company: "ZETAMSELECTRIC.COM",
    id: "451816-bare-ze-rise1-g2-pve",
  },
  {
    name: "422719-BARE-S-ADVST1-G2",
    ip: "15.235.12.222",
    status: "up",
    uptime: 99.98,
    responseTime: 16,
    reactor: 4,
    company: "OAKTVPRO.CLUB",
    id: "422719-bare-s-advst1-g2",
  },
  {
    name: "462754-BARE-Delta",
    ip: "148.113.168.51",
    status: "up",
    uptime: 99.96,
    responseTime: 14,
    reactor: 4,
    company: "PLATAFORMAINTEGRA.NET",
    id: "462754-bare-delta",
  },
  {
    name: "497296-BARE-PRS-ADV5-G3-BAY-01",
    ip: "148.113.208.200",
    status: "up",
    uptime: 99.97,
    responseTime: 15,
    reactor: 4,
    company: "PROSOFT.CO",
    id: "497296-bare-prs-adv5-g3-bay-01",
  },
  {
    name: "412703-BARE-ADV-4-CLU",
    ip: "51.222.248.167",
    status: "up",
    uptime: 99.95,
    responseTime: 19,
    reactor: 4,
    company: "INTELLPLAT.COM",
    id: "412703-bare-adv-4-clu",
  },

  // Reactor 5 - Infraestructura de Red OAKSYSTEM (38 hosts)
  {
    name: "500014-OAK-VRACK-ip224",
    ip: "192.99.193.224",
    status: "up",
    uptime: 99.98,
    responseTime: 8,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500014-oak-vrack-ip224",
  },
  {
    name: "500015-OAK-VRACK-ip225",
    ip: "192.99.193.225",
    status: "up",
    uptime: 99.96,
    responseTime: 9,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500015-oak-vrack-ip225",
  },
  {
    name: "500016-OAK-VRACK-ip226",
    ip: "192.99.193.226",
    status: "up",
    uptime: 99.97,
    responseTime: 7,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500016-oak-vrack-ip226",
  },
  {
    name: "500017-OAK-VRACK-ip227",
    ip: "192.99.193.227",
    status: "up",
    uptime: 99.95,
    responseTime: 10,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500017-oak-vrack-ip227",
  },
  {
    name: "500018-OAK-VRACK-ip228",
    ip: "192.99.193.228",
    status: "up",
    uptime: 99.96,
    responseTime: 8,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500018-oak-vrack-ip228",
  },
  {
    name: "500019-OAK-VRACK-ip229",
    ip: "192.99.193.229",
    status: "up",
    uptime: 99.98,
    responseTime: 9,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500019-oak-vrack-ip229",
  },
  {
    name: "500020-OAK-VRACK-ip230",
    ip: "192.99.193.230",
    status: "up",
    uptime: 99.96,
    responseTime: 7,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500020-oak-vrack-ip230",
  },
  {
    name: "500021-OAK-VRACK-ip231",
    ip: "192.99.193.231",
    status: "up",
    uptime: 99.97,
    responseTime: 11,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500021-oak-vrack-ip231",
  },
  {
    name: "500022-OAK-BLK146-ip128",
    ip: "51.222.146.128",
    status: "up",
    uptime: 99.95,
    responseTime: 12,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500022-oak-blk146-ip128",
  },
  {
    name: "500023-OAK-BLK146-ip129",
    ip: "51.222.146.129",
    status: "up",
    uptime: 99.96,
    responseTime: 10,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500023-oak-blk146-ip129",
  },
  {
    name: "500024-OAK-BLK146-ip130",
    ip: "51.222.146.130",
    status: "up",
    uptime: 99.98,
    responseTime: 9,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500024-oak-blk146-ip130",
  },
  {
    name: "500025-OAK-BLK146-ip131",
    ip: "51.222.146.131",
    status: "up",
    uptime: 99.96,
    responseTime: 11,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500025-oak-blk146-ip131",
  },
  {
    name: "500026-OAK-BLK146-ip132",
    ip: "51.222.146.132",
    status: "up",
    uptime: 99.97,
    responseTime: 8,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500026-oak-blk146-ip132",
  },
  {
    name: "500027-OAK-BLK146-ip133",
    ip: "51.222.146.133",
    status: "up",
    uptime: 99.95,
    responseTime: 13,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500027-oak-blk146-ip133",
  },
  {
    name: "500028-OAK-BLK146-ip134",
    ip: "51.222.146.134",
    status: "up",
    uptime: 99.96,
    responseTime: 10,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500028-oak-blk146-ip134",
  },
  {
    name: "500029-OAK-BLK146-ip135",
    ip: "51.222.146.135",
    status: "up",
    uptime: 99.98,
    responseTime: 9,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500029-oak-blk146-ip135",
  },
  {
    name: "500030-OAK-BLK150-ip0",
    ip: "51.222.150.0",
    status: "up",
    uptime: 99.96,
    responseTime: 12,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500030-oak-blk150-ip0",
  },
  {
    name: "500031-OAK-BLK150-ip1",
    ip: "51.222.150.1",
    status: "up",
    uptime: 99.97,
    responseTime: 8,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500031-oak-blk150-ip1",
  },
  {
    name: "500032-OAK-BLK150-ip2",
    ip: "51.222.150.2",
    status: "up",
    uptime: 99.95,
    responseTime: 11,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500032-oak-blk150-ip2",
  },
  {
    name: "500033-OAK-BLK150-ip3",
    ip: "51.222.150.3",
    status: "up",
    uptime: 99.96,
    responseTime: 9,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500033-oak-blk150-ip3",
  },
  {
    name: "500034-OAK-BLK150-ip4",
    ip: "51.222.150.4",
    status: "up",
    uptime: 99.98,
    responseTime: 10,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500034-oak-blk150-ip4",
  },
  {
    name: "500035-OAK-BLK150-ip5",
    ip: "51.222.150.5",
    status: "up",
    uptime: 99.96,
    responseTime: 7,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500035-oak-blk150-ip5",
  },
  {
    name: "500036-OAK-BLK150-ip6",
    ip: "51.222.150.6",
    status: "up",
    uptime: 99.97,
    responseTime: 12,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500036-oak-blk150-ip6",
  },
  {
    name: "500037-OAK-BLK150-ip7",
    ip: "51.222.150.7",
    status: "up",
    uptime: 99.95,
    responseTime: 11,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500037-oak-blk150-ip7",
  },
  {
    name: "500038-OAK-ip140",
    ip: "54.39.163.140",
    status: "up",
    uptime: 99.96,
    responseTime: 14,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500038-oak-ip140",
  },
  {
    name: "500039-OAK-ip112",
    ip: "54.39.46.112",
    status: "up",
    uptime: 99.98,
    responseTime: 13,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500039-oak-ip112",
  },
  {
    name: "500040-OAK-TOR-ip244",
    ip: "72.251.12.244",
    status: "up",
    uptime: 99.96,
    responseTime: 8,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500040-oak-tor-ip244",
  },
  {
    name: "500041-OAK-TOR-ip245",
    ip: "72.251.12.245",
    status: "up",
    uptime: 99.97,
    responseTime: 9,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500041-oak-tor-ip245",
  },
  {
    name: "500042-OAK-TOR-ip246",
    ip: "72.251.12.246",
    status: "up",
    uptime: 99.95,
    responseTime: 10,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500042-oak-tor-ip246",
  },
  {
    name: "500043-OAK-TOR-ip247",
    ip: "72.251.12.247",
    status: "up",
    uptime: 99.96,
    responseTime: 7,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500043-oak-tor-ip247",
  },
  {
    name: "500044-OAK-TOR-ip248",
    ip: "72.251.12.248",
    status: "up",
    uptime: 99.98,
    responseTime: 11,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500044-oak-tor-ip248",
  },
  {
    name: "500045-OAK-TOR-ip249",
    ip: "72.251.12.249",
    status: "up",
    uptime: 99.96,
    responseTime: 8,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500045-oak-tor-ip249",
  },
  {
    name: "500046-OAK-TOR-ip250",
    ip: "72.251.12.250",
    status: "up",
    uptime: 99.97,
    responseTime: 9,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500046-oak-tor-ip250",
  },
  {
    name: "500047-OAK-TOR-ip251",
    ip: "72.251.12.251",
    status: "up",
    uptime: 99.95,
    responseTime: 12,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500047-oak-tor-ip251",
  },
  {
    name: "500048-OAK-TOR-ip252",
    ip: "72.251.12.252",
    status: "up",
    uptime: 99.96,
    responseTime: 10,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500048-oak-tor-ip252",
  },
  {
    name: "500049-OAK-TOR-ip253",
    ip: "72.251.12.253",
    status: "up",
    uptime: 99.98,
    responseTime: 8,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500049-oak-tor-ip253",
  },
  {
    name: "500050-OAK-TOR-ip254",
    ip: "72.251.12.254",
    status: "up",
    uptime: 99.96,
    responseTime: 11,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500050-oak-tor-ip254",
  },
  {
    name: "500051-OAK-TOR-ip255",
    ip: "72.251.12.255",
    status: "up",
    uptime: 99.97,
    responseTime: 9,
    reactor: 5,
    company: "OAKSYSTEM",
    id: "500051-oak-tor-ip255",
  },
]

export default function NOCDashboardPage() {
  const [hosts, setHosts] = useState(INITIAL_HOSTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReactor, setSelectedReactor] = useState<number | null>(null)
  const [activePings, setActivePings] = useState<Record<string, PingResult>>({})
  const [selectedHost, setSelectedHost] = useState<string | null>(null)
  const [isTracingRoute, setIsTracingRoute] = useState(false)
  const [tracerouteData, setTracerouteData] = useState<TracerouteResult | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [portScanData, setPortScanData] = useState<PortScanResult | null>(null)
  const [ipmiLoading, setIpmiLoading] = useState<Record<string, boolean>>({})

  const connectIPMI = async (
    host: { name: string; ip: string },
    type: "kvmipHtml5URL" | "kvmipJnlp" | "serialOverLanURL" = "kvmipHtml5URL",
  ) => {
    const serviceName = host.name.toLowerCase().replace(/\./g, "")

    setIpmiLoading((prev) => ({ ...prev, [serviceName]: true }))

    try {
      console.log("[v0] Requesting IPMI access for:", serviceName)

      const requestResponse = await fetch("/api/ovh/ipmi/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName,
          type,
          ttl: 120,
        }),
      })

      const requestData = await requestResponse.json()

      if (!requestData.success) {
        throw new Error(requestData.error || "Failed to request IPMI access")
      }

      await new Promise((resolve) => setTimeout(resolve, 3000))

      const accessResponse = await fetch(`/api/ovh/ipmi/access?serviceName=${serviceName}&type=${type}`)
      const accessData = await accessResponse.json()

      if (accessData.success && accessData.access.value) {
        window.open(accessData.access.value, "_blank", "width=1024,height=768")
        alert(`IPMI conectado exitosamente a ${host.name}`)
      } else {
        throw new Error("No IPMI access URL available")
      }
    } catch (error: any) {
      console.error("[v0] IPMI connection error:", error)
      alert(`Error conectando IPMI: ${error.message}`)
    } finally {
      setIpmiLoading((prev) => ({ ...prev, [serviceName]: false }))
    }
  }

  const resetIPMISessions = async (host: { name: string }) => {
    const serviceName = host.name.toLowerCase().replace(/\./g, "")

    try {
      const response = await fetch("/api/ovh/ipmi/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName,
          action: "resetSessions",
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert(`Sesiones IPMI de ${host.name} reseteadas exitosamente`)
      }
    } catch (error: any) {
      console.error("[v0] IPMI reset error:", error)
      alert(`Error reseteando sesiones: ${error.message}`)
    }
  }

  const executePing = async (host: { name: string; ip: string }) => {
    console.log("[v0] Ejecutando ping real a:", host.ip)
    try {
      const startTime = Date.now()
      const response = await fetch(`/api/network/ping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host: host.ip }),
      })

      const data = await response.json()

      const result: PingResult = {
        host: host.name,
        ip: host.ip,
        alive: data.alive,
        time: data.time,
        minTime: data.minTime,
        maxTime: data.maxTime,
        packetsLost: data.packetsLost,
        ttl: data.ttl,
        timestamp: new Date(),
      }

      setActivePings((prev) => ({ ...prev, [host.ip]: result }))

      // Actualizar el estado del host
      setHosts((prevHosts) =>
        prevHosts.map((h) =>
          h.ip === host.ip
            ? {
                ...h,
                status: result.alive ? "up" : "down",
                responseTime: result.time,
              }
            : h,
        ),
      )
    } catch (error) {
      console.error("[v0] Error en ping:", error)
      setActivePings((prev) => ({
        ...prev,
        [host.ip]: {
          host: host.name,
          ip: host.ip,
          alive: false,
          time: -1,
          packetsLost: 100, // Assuming 100% packet loss on error
          ttl: 0, // Assuming 0 TTL on error
          timestamp: new Date(),
        },
      }))
    }
  }

  const executeTraceroute = async (host: { name: string; ip: string }) => {
    console.log("[v0] Ejecutando traceroute a:", host.ip)
    setIsTracingRoute(true)
    setSelectedHost(host.ip)
    setTracerouteData(null)

    try {
      const response = await fetch(`/api/network/traceroute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host: host.ip }),
      })

      const data = await response.json()

      setTracerouteData({
        host: host.name,
        hops: data.hops || [],
        complete: data.complete || true,
      })
    } catch (error) {
      console.error("[v0] Error en traceroute:", error)
      setTracerouteData({
        host: host.name,
        hops: [],
        complete: false,
      })
    } finally {
      setIsTracingRoute(false)
    }
  }

  const executePortScan = async (host: { name: string; ip: string }) => {
    console.log("[v0] Ejecutando escaneo de puertos en:", host.ip)
    setIsScanning(true)
    setSelectedHost(host.ip)
    setPortScanData(null)

    try {
      const response = await fetch(`/api/network/portscan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.JSON.stringify({ host: host.ip }),
      })

      const data = await response.json()

      if (data.success) {
        setPortScanData({
          host: host.name,
          openPorts: data.openPorts || [],
          os: data.os || "Unknown",
          latency: data.latency || 0,
          rawOutput: data.rawOutput || "",
          scannedAt: data.scannedAt,
        })
      } else {
        console.error("[v0] Error en escaneo de puertos:", data.error)
      }
    } catch (error) {
      console.error("[v0] Error en escaneo de puertos:", error)
    } finally {
      setIsScanning(false)
    }
  }

  useEffect(() => {
    console.log("[v0] NOC Dashboard montado, iniciando pings automáticos")
    console.log("[v0] Total de hosts a monitorear:", INITIAL_HOSTS.length)

    INITIAL_HOSTS.forEach((host) => {
      executePing(host)
    })

    const interval = setInterval(() => {
      console.log("[v0] Ejecutando pings automáticos...")
      INITIAL_HOSTS.forEach((host) => {
        executePing(host)
      })
    }, 30000)

    return () => {
      console.log("[v0] Limpiando intervalo de pings")
      clearInterval(interval)
    }
  }, [])

  const stats = {
    total: hosts.length,
    up: hosts.filter((h) => h.status === "up").length,
    degraded: hosts.filter((h) => h.status === "degraded").length,
    down: hosts.filter((h) => h.status === "down").length,
    avgUptime: (hosts.reduce((acc, h) => acc + h.uptime, 0) / hosts.length).toFixed(2),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "up":
        return "text-green-400"
      case "degraded":
        return "text-yellow-400"
      case "down":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up":
        return <CheckCircle2 className="w-4 h-4" />
      case "degraded":
        return <AlertTriangle className="w-4 h-4" />
      case "down":
        return <XCircle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const hostsByReactor = hosts.reduce(
    (acc, host) => {
      const reactor = host.reactor || 0
      if (!acc[reactor]) acc[reactor] = []
      acc[reactor].push(host)
      return acc
    },
    {} as Record<number, typeof hosts>,
  )

  const reactorNames: Record<number, string> = {
    1: "Reactor 1 - CEPH Clusters",
    2: "Reactor 2 - Servidores SPAM",
    3: "Reactor 3 - VPS",
    4: "Reactor 4 - Bare Metal",
    5: "Reactor 5 - Infraestructura de Red OAKSYSTEM",
  }

  const generateUptimeData = () => {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      uptime: 95 + Math.random() * 5,
    }))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard NOC - Monitoreo en Tiempo Real</h1>
        <p className="text-slate-400">
          Sistema de monitoreo con ping y traceroute en tiempo real - {hosts.length} hosts monitoreados
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Hosts</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <Server className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Operacionales</p>
                <p className="text-3xl font-bold text-green-400">{stats.up}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Degradados</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.degraded}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Caídos</p>
                <p className="text-3xl font-bold text-red-400">{stats.down}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Disponibilidad General (Últimas 24 horas)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={generateUptimeData()}>
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[90, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="uptime" stroke="#06b6d4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Uptime Graph */}
      <Card className="bg-slate-950 border-slate-800 mb-8">
        <CardHeader>
          <CardTitle className="text-white">Disponibilidad General (Últimas 24 horas)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={generateUptimeData()}>
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[90, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="uptime" stroke="#06b6d4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {selectedHost && (
        <Card className="bg-slate-950 border-slate-800 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Network className="w-5 h-5" />
              Traceroute - {tracerouteData?.host || selectedHost}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setSelectedHost(null)}>
              Cerrar
            </Button>
          </CardHeader>
          <CardContent>
            {isTracingRoute ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Trazando ruta...</p>
                </div>
              </div>
            ) : tracerouteData ? (
              <div className="space-y-4">
                {/* Mapa visual de nodos */}
                <div className="bg-slate-900 rounded-lg p-6 mb-6">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    Mapa de Red
                  </h3>
                  <div className="flex items-center gap-4 overflow-x-auto pb-4">
                    <div className="flex items-center gap-2 bg-cyan-900/20 px-4 py-3 rounded-lg border border-cyan-800 flex-shrink-0">
                      <Server className="w-5 h-5 text-cyan-400" />
                      <span className="text-white font-medium text-sm">Origen</span>
                    </div>
                    {tracerouteData.hops.map((hop, idx) => (
                      <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                        <div className="h-0.5 w-8 bg-cyan-600" />
                        <div className="bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
                          <div className="text-slate-400 text-xs mb-1">Hop {hop.hop}</div>
                          <div className="text-white text-sm font-medium">{hop.hostname || hop.ip}</div>
                          <div className="text-cyan-400 text-xs">{hop.rtt[0]?.toFixed(1)}ms</div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="h-0.5 w-8 bg-green-600" />
                      <div className="bg-green-900/20 px-4 py-3 rounded-lg border border-green-800">
                        <Server className="w-5 h-5 text-green-400" />
                        <span className="text-white font-medium text-sm">Destino</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lista detallada de hops */}
                <div className="space-y-2">
                  {tracerouteData.hops.map((hop, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-cyan-900/20 px-3 py-1 rounded-full">
                          <span className="text-cyan-400 font-mono text-sm">{hop.hop}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{hop.hostname || "Unknown"}</p>
                          <p className="text-slate-400 text-sm">{hop.ip}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-slate-400 text-xs">RTT 1</p>
                          <p className="text-white font-medium">{hop.rtt[0]?.toFixed(1)}ms</p>
                        </div>
                        {hop.rtt.length > 1 && (
                          <div className="text-right">
                            <p className="text-slate-400 text-xs">RTT 2</p>
                            <p className="text-white font-medium">{hop.rtt[1]?.toFixed(1)}ms</p>
                          </div>
                        )}
                        {hop.rtt.length > 2 && (
                          <div className="text-right">
                            <p className="text-slate-400 text-xs">RTT 3</p>
                            <p className="text-white font-medium">{hop.rtt[2]?.toFixed(1)}ms</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-slate-400">Error al trazar la ruta</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {portScanData && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-lg border border-cyan-500/30 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-900 border-b border-cyan-500/20 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400">Escaneo de Puertos - {portScanData.host}</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Escaneado el {new Date(portScanData.scannedAt).toLocaleString()}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setPortScanData(null)} className="border-cyan-500/30">
                Cerrar
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Información del sistema */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                  <div className="text-sm text-slate-400">Sistema Operativo</div>
                  <div className="text-lg font-semibold text-white mt-1">{portScanData.os}</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                  <div className="text-sm text-slate-400">Latencia</div>
                  <div className="text-lg font-semibold text-white mt-1">{portScanData.latency.toFixed(2)} ms</div>
                </div>
              </div>

              {/* Puertos abiertos */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">
                  Puertos Abiertos ({portScanData.openPorts.length})
                </h4>

                {portScanData.openPorts.length > 0 ? (
                  <div className="bg-slate-800/50 rounded-lg border border-cyan-500/20 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-cyan-500/20 bg-slate-800">
                          <th className="text-left p-3 text-sm font-medium text-slate-400">Puerto</th>
                          <th className="text-left p-3 text-sm font-medium text-slate-400">Protocolo</th>
                          <th className="text-left p-3 text-sm font-medium text-slate-400">Servicio</th>
                          <th className="text-left p-3 text-sm font-medium text-slate-400">Versión</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portScanData.openPorts.map((port, index) => (
                          <tr
                            key={index}
                            className="border-b border-cyan-500/10 hover:bg-slate-700/30 transition-colors"
                          >
                            <td className="p-3 font-mono text-cyan-400">{port.port}</td>
                            <td className="p-3 text-slate-300">{port.protocol}</td>
                            <td className="p-3 text-white">{port.service}</td>
                            <td className="p-3 text-slate-400 text-sm">{port.version}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-slate-800/50 rounded-lg p-8 border border-cyan-500/20 text-center">
                    <p className="text-slate-400">No se encontraron puertos abiertos</p>
                  </div>
                )}
              </div>

              {/* Salida completa de nmap */}
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-4">Salida Completa de Nmap</h4>
                <div className="bg-slate-950 rounded-lg p-4 border border-cyan-500/20 overflow-x-auto">
                  <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">{portScanData.rawOutput}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hosts by Reactor */}
      {Object.entries(hostsByReactor).map(([reactor, reactorHosts]) => (
        <Card key={reactor} className="bg-slate-950 border-slate-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">{reactorNames[Number(reactor)]}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reactorHosts.map((host, index) => {
                const pingResult = activePings[host.ip]
                const serviceName = host.name.toLowerCase().replace(/\./g, "")
                return (
                  <Link href={`/dashboard/host-monitor/${host.id}`} key={index}>
                    <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={getStatusColor(host.status)}>{getStatusIcon(host.status)}</div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm">{host.name}</h3>
                          <p className="text-slate-500 text-xs">{host.ip}</p>
                          {pingResult && (
                            <p className="text-slate-600 text-xs">
                              Último ping: {pingResult.timestamp.toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-slate-400 text-xs">Uptime</p>
                          <p className="text-white font-medium">{host.uptime}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-xs">Response</p>
                          <p className="text-white font-medium">{host.responseTime}ms</p>
                        </div>
                        <div className="flex gap-2">
                          <select
                            className="px-2 py-1 text-xs bg-slate-800 border border-slate-700 rounded text-white"
                            onChange={(e) => {
                              if (e.target.value === "html5") connectIPMI(host, "kvmipHtml5URL")
                              else if (e.target.value === "jnlp") connectIPMI(host, "kvmipJnlp")
                              else if (e.target.value === "sol") connectIPMI(host, "serialOverLanURL")
                              else if (e.target.value === "reset") resetIPMISessions(host)
                              e.target.value = "" // Reset dropdown to default
                            }}
                            disabled={ipmiLoading[serviceName]}
                          >
                            <option value="">IPMI</option>
                            <option value="html5">HTML5 Console</option>
                            <option value="jnlp">JNLP Console</option>
                            <option value="sol">Serial Over LAN</option>
                            <option value="reset">Reset Sessions</option>
                          </select>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault() // Prevent link navigation
                              executePing(host)
                            }}
                            className="text-xs"
                            disabled={pingResult && Date.now() - pingResult.timestamp.getTime() < 5000}
                          >
                            Ping
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault() // Prevent link navigation
                              executeTraceroute(host)
                            }}
                            className="text-xs"
                            disabled={isTracingRoute}
                          >
                            Trace
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault() // Prevent link navigation
                              executePortScan(host)
                            }}
                            className="text-xs"
                            disabled={isScanning}
                          >
                            {isScanning && selectedHost === host.ip ? "Escaneando..." : "Puertos"}
                          </Button>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(host.status)}`}>
                          {host.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
