"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Server, Download, ChevronLeft, ChevronRight, Link } from "lucide-react" // Added Link

interface Host {
  id: number
  name: string
  ip: string
  type:
    | "CEPH Cluster"
    | "VPS"
    | "Bare Metal"
    | "SPAM"
    | "Website"
    | "Infrastructure"
    | "Proxmox Backup"
    | "Proxmox VE"
    | "cPanel"
    | "WHM"
    | "Proxmox Cluster"
  reactor: number
  company: string
  status: "online" | "offline" | "warning"
  specs?: string
  uptime?: number
  lastSNMPConnection?: string
  agentVersion?: string
  hardwareSpecs?: {
    cpu: string
    memory: string
    storage: string
  }
}

const INITIAL_HOSTS: Host[] = [
  // ========== REACTOR 1: CEPH CLUSTERS (130+ hosts) ==========
  // CEPH - IBG.COM.CO
  {
    id: 483431,
    name: "483431-CEPH-IBG-SCA3-G2-BAY-01",
    ip: "72.251.3.93",
    type: "CEPH Cluster",
    reactor: 1,
    company: "IBG.COM.CO",
    status: "online",
    specs: "64 cores, 256 GB RAM, 10TB Storage",
  },
  {
    id: 501691,
    name: "501691-CEPH-IBG-SCA3-G2-BAY-02",
    ip: "72.251.3.238",
    type: "CEPH Cluster",
    reactor: 1,
    company: "IBG.COM.CO",
    status: "online",
    specs: "64 cores, 256 GB RAM, 10TB Storage",
  },
  {
    id: 493196,
    name: "493196-CEPH-IBG-SCA3-G2-BAY-03",
    ip: "72.251.3.212",
    type: "CEPH Cluster",
    reactor: 1,
    company: "IBG.COM.CO",
    status: "online",
    specs: "64 cores, 256 GB RAM, 10TB Storage",
  },

  // CEPH - COOTRARIS.COM
  {
    id: 469453,
    name: "469453-CEPH-SCA1-BAY-01",
    ip: "15.235.67.86",
    type: "CEPH Cluster",
    reactor: 1,
    company: "COOTRARIS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 469864,
    name: "469864-CEPH-SCA1-BAY-02",
    ip: "15.235.67.180",
    type: "CEPH Cluster",
    reactor: 1,
    company: "COOTRARIS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 469855,
    name: "469855-CEPH-SCA1-BAY-03",
    ip: "15.235.43.103",
    type: "CEPH Cluster",
    reactor: 1,
    company: "COOTRARIS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - ICONET.COM.MX
  {
    id: 408163,
    name: "408163-CEPH-IC-HGR3-01",
    ip: "51.222.152.249",
    type: "CEPH Cluster",
    reactor: 1,
    company: "ICONET.COM.MX",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 422255,
    name: "422255-CEPH-IC-HGR3-02",
    ip: "15.235.43.68",
    type: "CEPH Cluster",
    reactor: 1,
    company: "ICONET.COM.MX",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 449125,
    name: "449125-CEPH-IC-HGR3-03",
    ip: "15.235.67.40",
    type: "CEPH Cluster",
    reactor: 1,
    company: "ICONET.COM.MX",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - BETCONNECTIONS.COM
  {
    id: 482770,
    name: "482770-CEPH-BT-HGR4-G2-BAY-01",
    ip: "51.222.152.212",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 490629,
    name: "490629-CEPH-BT-HGR4-G2-BAY-02",
    ip: "148.113.193.172",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 482769,
    name: "482769-CEPH-BT-HGR4-G2-BAY-03",
    ip: "148.113.199.14",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 499053,
    name: "499053-CEPH-BT-HGR4-G2-BAY-05",
    ip: "148.113.211.68",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 499056,
    name: "499056-CEPH-BT-HGR4-G2-BAY-06",
    ip: "148.113.211.71",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 499054,
    name: "499054-CEPH-BT-HGR4-G2-BAY-07",
    ip: "148.113.211.67",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 499059,
    name: "499059-CEPH-BT-HGR4-G2-BAY-08",
    ip: "148.113.211.70",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 499055,
    name: "499055-CEPH-BT-HGR4-G2-BAY-09",
    ip: "148.113.211.87",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 499057,
    name: "499057-CEPH-BT-HGR4-G2-BAY-10",
    ip: "148.113.211.69",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 499058,
    name: "499058-CEPH-BT-HGR4-G2-BAY-11",
    ip: "148.113.211.83",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 505062,
    name: "505062-CEPH-BT-HGR4-G2-BAY-12",
    ip: "148.113.215.29",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 510531,
    name: "510531-CEPH-BT-HGR4-G2-BAY-13",
    ip: "51.222.249.56",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 510532,
    name: "510532-CEPH-BT-HGR4-G2-BAY-14",
    ip: "148.113.219.12",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 510533,
    name: "510533-CEPH-BT-HGR4-G2-BAY-15",
    ip: "148.113.224.50",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 510534,
    name: "510534-CEPH-BT-HGR4-G2-BAY-16",
    ip: "15.235.67.107",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 510535,
    name: "510535-CEPH-BT-HGR4-G2-BAY-17",
    ip: "148.113.224.22",
    type: "CEPH Cluster",
    reactor: 1,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - HBTC
  {
    id: 484063,
    name: "484063-CEPH-HBTC-HGR3-G2-BAY-01",
    ip: "148.113.187.44",
    type: "CEPH Cluster",
    reactor: 1,
    company: "HBTC",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 490630,
    name: "490630-CEPH-HBTC-HGR3-G2-BAY-02",
    ip: "148.113.193.173",
    type: "CEPH Cluster",
    reactor: 1,
    company: "HBTC",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 484062,
    name: "484062-CEPH-HBTC-HGR3-G2-BAY-03",
    ip: "148.113.187.43",
    type: "CEPH Cluster",
    reactor: 1,
    company: "HBTC",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - PROCOM-INC.NET
  {
    id: 476771,
    name: "476771-CEPH-PO-SCAI3-01",
    ip: "72.251.3.67",
    type: "CEPH Cluster",
    reactor: 1,
    company: "PROCOM-INC.NET",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 476772,
    name: "476772-CEPH-PO-SCAI3-02",
    ip: "72.251.3.72",
    type: "CEPH Cluster",
    reactor: 1,
    company: "PROCOM-INC.NET",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 476784,
    name: "476784-CEPH-PO-SCAI3-03",
    ip: "72.251.3.45",
    type: "CEPH Cluster",
    reactor: 1,
    company: "PROCOM-INC.NET",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - PCCORP.COM.AR
  {
    id: 491554,
    name: "491554-CEPH-PC-SCA1-G2-BAY-1",
    ip: "148.113.199.58",
    type: "CEPH Cluster",
    reactor: 1,
    company: "PCCORP.COM.AR",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 491555,
    name: "491555-CEPH-PC-SCA1-G2-BAY-2",
    ip: "148.113.199.29",
    type: "CEPH Cluster",
    reactor: 1,
    company: "PCCORP.COM.AR",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 491553,
    name: "491553-CEPH-PC-SCA1-G2-BAY-3",
    ip: "148.113.199.59",
    type: "CEPH Cluster",
    reactor: 1,
    company: "PCCORP.COM.AR",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - RYNDEM.MX
  {
    id: 483445,
    name: "483445-CEPH-RYN-SCA3-G2-BAY-01",
    ip: "72.251.3.103",
    type: "CEPH Cluster",
    reactor: 1,
    company: "RYNDEM.MX",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 483442,
    name: "483442-CEPH-RYN-SCA3-G2-BAY-02",
    ip: "72.251.3.96",
    type: "CEPH Cluster",
    reactor: 1,
    company: "RYNDEM.MX",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 486095,
    name: "486095-CEPH-RYN-SCA3-G2-BAY-03",
    ip: "72.251.3.139",
    type: "CEPH Cluster",
    reactor: 1,
    company: "RYNDEM.MX",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - IINUBE.COM
  {
    id: 482995,
    name: "482995-CEPH-IN-HGR3-G2-01",
    ip: "72.251.3.100",
    type: "CEPH Cluster",
    reactor: 1,
    company: "IINUBE.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 498611,
    name: "498611-CEPH-IN-HGR3-G2-02",
    ip: "72.251.3.229",
    type: "CEPH Cluster",
    reactor: 1,
    company: "IINUBE.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 503809,
    name: "503809-CEPH-IN-HGR3-G2-03",
    ip: "72.251.3.242",
    type: "CEPH Cluster",
    reactor: 1,
    company: "IINUBE.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 510878,
    name: "510878-CEPH-IN-HGR3-G2-04",
    ip: "72.251.11.57",
    type: "CEPH Cluster",
    reactor: 1,
    company: "IINUBE.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - SERVERPY.COM
  {
    id: 511678,
    name: "511678-CEPH-STK-HGR-I1-G3-BAY-01",
    ip: "148.113.220.141",
    type: "CEPH Cluster",
    reactor: 1,
    company: "SERVERPY.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500759,
    name: "500759-CEPH-STK-HGR-I1-G3-BAY-02",
    ip: "148.113.212.220",
    type: "CEPH Cluster",
    reactor: 1,
    company: "SERVERPY.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 506218,
    name: "506218-CEPH-STK-HGR-I1-G3-BAY-03",
    ip: "148.113.222.33",
    type: "CEPH Cluster",
    reactor: 1,
    company: "SERVERPY.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - CENTRALTELEFONICA.COM.AR
  {
    id: 469461,
    name: "469461-CEPH-scale-i1-01",
    ip: "15.235.67.115",
    type: "CEPH Cluster",
    reactor: 1,
    company: "CENTRALTELEFONICA.COM.AR",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 469870,
    name: "469870-CEPH-scale-i1-02",
    ip: "15.235.67.186",
    type: "CEPH Cluster",
    reactor: 1,
    company: "CENTRALTELEFONICA.COM.AR",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 466298,
    name: "466298-CEPH-scale-i1-03",
    ip: "51.222.249.37",
    type: "CEPH Cluster",
    reactor: 1,
    company: "CENTRALTELEFONICA.COM.AR",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - AVANTIKA.MX
  {
    id: 475799,
    name: "475799-CEPH-A-HGR3-BAY-01",
    ip: "15.235.117.106",
    type: "CEPH Cluster",
    reactor: 1,
    company: "AVANTIKA.MX",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 475798,
    name: "475798-CEPH-A-HGR3-BAY-02",
    ip: "15.235.117.104",
    type: "CEPH Cluster",
    reactor: 1,
    company: "AVANTIKA.MX",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 475797,
    name: "475797-CEPH-A-HGR3-BAY-03",
    ip: "15.235.117.105",
    type: "CEPH Cluster",
    reactor: 1,
    company: "AVANTIKA.MX",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - HPSERVIDOR.COM
  {
    id: 444276,
    name: "444276-CEPH-X-HGR3-01",
    ip: "15.235.117.37",
    type: "CEPH Cluster",
    reactor: 1,
    company: "HPSERVIDOR.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 447438,
    name: "447438-CEPH-X-HGR3-02",
    ip: "15.235.117.53",
    type: "CEPH Cluster",
    reactor: 1,
    company: "HPSERVIDOR.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 447437,
    name: "447437-CEPH-X-HGR3-03",
    ip: "15.235.117.52",
    type: "CEPH Cluster",
    reactor: 1,
    company: "HPSERVIDOR.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - AGSAMERICAS.COM.CO
  {
    id: 494339,
    name: "494339-CEPH-AG-SCAI1-G2-BAY-01",
    ip: "148.113.208.166",
    type: "CEPH Cluster",
    reactor: 1,
    company: "AGSAMERICAS.COM.CO",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 494350,
    name: "494350-CEPH-AG-SCAI1-G2-BAY-02",
    ip: "15.235.43.42",
    type: "CEPH Cluster",
    reactor: 1,
    company: "AGSAMERICAS.COM.CO",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 494351,
    name: "494351-CEPH-AG-SCAI1-G2-BAY-03",
    ip: "15.235.43.115",
    type: "CEPH Cluster",
    reactor: 1,
    company: "AGSAMERICAS.COM.CO",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - XPERSOFT.NET
  {
    id: 483332,
    name: "483332-CEPH-EX-HGR3-3",
    ip: "15.235.43.231",
    type: "CEPH Cluster",
    reactor: 1,
    company: "XPERSOFT.NET",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 483333,
    name: "483333-CEPH-EX-HGR3-1",
    ip: "15.235.43.230",
    type: "CEPH Cluster",
    reactor: 1,
    company: "XPERSOFT.NET",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 483334,
    name: "483334-CEPH-EX-HGR3-2",
    ip: "15.235.43.237",
    type: "CEPH Cluster",
    reactor: 1,
    company: "XPERSOFT.NET",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - CEIBA.COM.CO
  {
    id: 496225,
    name: "496225-CEPH-CSH-SCA-I3-G2-BAY-01",
    ip: "72.251.3.203",
    type: "CEPH Cluster",
    reactor: 1,
    company: "CEIBA.COM.CO",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 493198,
    name: "493198-CEPH-CSH-SCA-I3-G2-BAY-03",
    ip: "72.251.3.216",
    type: "CEPH Cluster",
    reactor: 1,
    company: "CEIBA.COM.CO",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 493199,
    name: "493199-CEPH-CSH-SCA-I3-G2-BAY-02",
    ip: "72.251.3.215",
    type: "CEPH Cluster",
    reactor: 1,
    company: "CEIBA.COM.CO",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - ABPROSYSTEMS.COM
  {
    id: 486569,
    name: "486569-CEPH-TAB-SCA3-BAY-01",
    ip: "148.113.187.110",
    type: "CEPH Cluster",
    reactor: 1,
    company: "ABPROSYSTEMS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 486568,
    name: "486568-CEPH-TAB-SCA3-BAY-02",
    ip: "148.113.187.109",
    type: "CEPH Cluster",
    reactor: 1,
    company: "ABPROSYSTEMS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 483529,
    name: "483529-CEPH-TAB-SCA3-BAY-03",
    ip: "148.113.187.35",
    type: "CEPH Cluster",
    reactor: 1,
    company: "ABPROSYSTEMS.COM",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - KDUCEO.NET
  {
    id: 501686,
    name: "501686-CEPH-MRK-HGR4-G2-01",
    ip: "15.235.43.16",
    type: "CEPH Cluster",
    reactor: 1,
    company: "KDUCEO.NET",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 501685,
    name: "501685-CEPH-MRK-HGR4-G2-02",
    ip: "148.113.213.79",
    type: "CEPH Cluster",
    reactor: 1,
    company: "KDUCEO.NET",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 501684,
    name: "501684-CEPH-MRK-HGR4-G2-03",
    ip: "15.235.43.97",
    type: "CEPH Cluster",
    reactor: 1,
    company: "KDUCEO.NET",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 501683,
    name: "501683-CEPH-MRK-HGR4-G2-04",
    ip: "15.235.43.104",
    type: "CEPH Cluster",
    reactor: 1,
    company: "KDUCEO.NET",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - DG
  {
    id: 9002640,
    name: "9002640-CEPH-DG-HGR4-BAY-01",
    ip: "15.235.117.114",
    type: "CEPH Cluster",
    reactor: 1,
    company: "DG",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 9002641,
    name: "9002641-CEPH-DG-HGR4-BAY-02",
    ip: "148.113.199.165",
    type: "CEPH Cluster",
    reactor: 1,
    company: "DG",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 9002642,
    name: "9002642-CEPH-DG-HGR4-BAY-03",
    ip: "15.235.117.181",
    type: "CEPH Cluster",
    reactor: 1,
    company: "DG",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 9002643,
    name: "9002643-CEPH-DG-HGR4-BAY-04",
    ip: "148.113.215.11",
    type: "CEPH Cluster",
    reactor: 1,
    company: "DG",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 9002644,
    name: "9002644-CEPH-DG-HGR4-BAY-05",
    ip: "148.113.212.203",
    type: "CEPH Cluster",
    reactor: 1,
    company: "DG",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 9002645,
    name: "9002645-CEPH-DG-HGR4-BAY-05-B",
    ip: "148.113.215.5",
    type: "CEPH Cluster",
    reactor: 1,
    company: "DG",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - GP
  {
    id: 9002647,
    name: "9002647-CEPH-GP-HGR4-G2-01",
    ip: "148.113.218.177",
    type: "CEPH Cluster",
    reactor: 1,
    company: "GP",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 9002648,
    name: "9002648-CEPH-GP-HGR4-G2-02",
    ip: "148.113.218.168",
    type: "CEPH Cluster",
    reactor: 1,
    company: "GP",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 9002649,
    name: "9002649-CEPH-GP-HGR4-G2-03",
    ip: "148.113.218.176",
    type: "CEPH Cluster",
    reactor: 1,
    company: "GP",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - OAKSYSTEM
  {
    id: 300001,
    name: "300001-CEPH-OAK-HGR3-G3-BAY-01",
    ip: "72.251.11.68",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 300002,
    name: "300002-CEPH-OAK-HGR3-G3-BAY-02",
    ip: "72.251.11.73",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 300003,
    name: "300003-CEPH-OAK-HGR3-G3-BAY-03",
    ip: "72.251.11.201",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500001,
    name: "500001-CEPH-OAK-S-SCA1-ip132",
    ip: "144.217.17.132",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500002,
    name: "500002-CEPH-OAK-S-SCA1-ip133",
    ip: "144.217.17.133",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500003,
    name: "500003-CEPH-OAK-S-SCA1-ip134",
    ip: "144.217.17.134",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500004,
    name: "500004-CEPH-OAK-S-SCA1-ip135",
    ip: "144.217.17.135",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500005,
    name: "500005-CEPH-OAK-HGR-3-ip48",
    ip: "158.69.136.48",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500006,
    name: "500006-CEPH-OAK-HGR-3-ip49",
    ip: "158.69.136.49",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500007,
    name: "500007-CEPH-OAK-HGR-3-ip50",
    ip: "158.69.136.50",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500008,
    name: "500008-CEPH-OAK-HGR-3-ip51",
    ip: "158.69.136.51",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500009,
    name: "500009-CEPH-OAK-HGR-3-ip52",
    ip: "158.69.136.52",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500010,
    name: "500010-CEPH-OAK-HGR-3-ip53",
    ip: "158.69.136.53",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500011,
    name: "500011-CEPH-OAK-HGR-3-ip54",
    ip: "158.69.136.54",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 500012,
    name: "500012-CEPH-OAK-HGR-3-ip55",
    ip: "158.69.136.55",
    type: "CEPH Cluster",
    reactor: 1,
    company: "OAKSYSTEM",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - SKY
  {
    id: 600001,
    name: "600001-CEPH-SKY-HGR-I4-G3-BAY-01",
    ip: "148.113.220.120",
    type: "CEPH Cluster",
    reactor: 1,
    company: "SKY",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 600002,
    name: "600002-CEPH-SKY-HGR-I4-G3-BAY-02",
    ip: "148.113.220.253",
    type: "CEPH Cluster",
    reactor: 1,
    company: "SKY",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 600003,
    name: "600003-CEPH-SKY-HGR-I4-G3-BAY-03",
    ip: "148.113.222.35",
    type: "CEPH Cluster",
    reactor: 1,
    company: "SKY",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 600004,
    name: "600004-CEPH-SKY-HGR-I4-G3-BAY-04",
    ip: "148.113.220.246",
    type: "CEPH Cluster",
    reactor: 1,
    company: "SKY",
    status: "online",
    specs: "CEPH Storage Node",
  },
  {
    id: 600005,
    name: "600005-CEPH-SKY-HGR-I4-G3-BAY-05",
    ip: "148.113.222.37",
    type: "CEPH Cluster",
    reactor: 1,
    company: "SKY",
    status: "online",
    specs: "CEPH Storage Node",
  },

  // CEPH - UBIQUANDO
  {
    id: 700001,
    name: "700001-CEPH-UB-HGR3-G2-BAY-01",
    ip: "72.251.3.243",
    type: "CEPH Cluster",
    reactor: 1,
    company: "UBIQUANDO",
    status: "online",
    specs: "CEPH Storage - High Performance",
  },
  {
    id: 700002,
    name: "700002-CEPH-UB-HGR3-G2-BAY-02",
    ip: "72.251.3.246",
    type: "CEPH Cluster",
    reactor: 1,
    company: "UBIQUANDO",
    status: "online",
    specs: "CEPH Storage - High Performance",
  },
  {
    id: 700003,
    name: "700003-CEPH-UB-HGR3-G2-BAY-03",
    ip: "72.251.3.247",
    type: "CEPH Cluster",
    reactor: 1,
    company: "UBIQUANDO",
    status: "online",
    specs: "CEPH Storage - High Performance",
  },

  // ========== REACTOR 2: SPAM SERVERS ==========
  {
    id: 100001,
    name: "100001-SPAM-HBTC-VM-2001",
    ip: "54.39.125.239",
    type: "SPAM",
    reactor: 2,
    company: "HBTC",
    status: "online",
    specs: "Anti-SPAM Filter",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1 min",
    agentVersion: "1.2.0",
    hardwareSpecs: { cpu: "2 cores", memory: "4 GB RAM", storage: "100 GB SSD" },
  },
  {
    id: 100002,
    name: "100002-SPAM-HBTC-VM-2002",
    ip: "54.39.46.9",
    type: "SPAM",
    reactor: 2,
    company: "HBTC",
    status: "online",
    specs: "Anti-SPAM Filter",
    uptime: 99.8,
    lastSNMPConnection: "Hace 5 min",
    agentVersion: "1.2.0",
    hardwareSpecs: { cpu: "2 cores", memory: "4 GB RAM", storage: "100 GB SSD" },
  },
  {
    id: 100003,
    name: "100003-SPAM-HBTC-VM-2003",
    ip: "144.217.195.234",
    type: "SPAM",
    reactor: 2,
    company: "HBTC",
    status: "warning",
    specs: "Anti-SPAM Filter",
    uptime: 98.5,
    lastSNMPConnection: "Hace 15 min",
    agentVersion: "1.1.9",
    hardwareSpecs: { cpu: "4 cores", memory: "8 GB RAM", storage: "200 GB SSD" },
  },

  // ========== REACTOR 3: VPS - CTRLONLINE & OAKSYSTEM ==========
  // VPS - CTRLONLINE
  {
    id: 200001,
    name: "200001-VPS-CTRLONLINE-MinSalud",
    ip: "20.246.48.58",
    type: "VPS",
    reactor: 3,
    company: "CTRLONLINE",
    status: "online",
    specs: "MinSalud VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 30 sec",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB NVMe" },
  },
  {
    id: 200002,
    name: "200002-VPS-CTRLONLINE-Universidad-Militar",
    ip: "20.49.8.45",
    type: "VPS",
    reactor: 3,
    company: "CTRLONLINE",
    status: "online",
    specs: "Universidad Militar",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "8 GB RAM", storage: "250 GB NVMe" },
  },
  {
    id: 200003,
    name: "200003-VPS-CTRLONLINE-Bomberos-Bogota",
    ip: "172.206.18.16",
    type: "VPS",
    reactor: 3,
    company: "CTRLONLINE",
    status: "online",
    specs: "Bomberos Bogota",
    uptime: 99.9,
    lastSNMPConnection: "Hace 2 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB NVMe" },
  },
  {
    id: 200004,
    name: "200004-VPS-CTRLONLINE-Grupo-SUMMA",
    ip: "40.67.136.56",
    type: "VPS",
    reactor: 3,
    company: "CTRLONLINE",
    status: "online",
    specs: "Grupo SUMMA",
    uptime: 99.9,
    lastSNMPConnection: "Hace 3 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB NVMe" },
  },
  {
    id: 200005,
    name: "200005-VPS-CTRLONLINE-ARGOS",
    ip: "20.96.177.143",
    type: "VPS",
    reactor: 3,
    company: "CTRLONLINE",
    status: "online",
    specs: "ARGOS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 4 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "8 GB RAM", storage: "250 GB NVMe" },
  },
  {
    id: 200006,
    name: "200006-VPS-CTRLONLINE-DESUR",
    ip: "158.69.43.204",
    type: "VPS",
    reactor: 3,
    company: "CTRLONLINE",
    status: "online",
    specs: "DESUR",
    uptime: 99.9,
    lastSNMPConnection: "Hace 5 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB NVMe" },
  },
  {
    id: 200007,
    name: "200007-VPS-CTRLONLINE-FORPO",
    ip: "167.114.48.85",
    type: "VPS",
    reactor: 3,
    company: "CTRLONLINE",
    status: "online",
    specs: "FORPO",
    uptime: 99.9,
    lastSNMPConnection: "Hace 6 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "8 GB RAM", storage: "250 GB NVMe" },
  },
  {
    id: 200008,
    name: "200008-VPS-CTRLONLINE-INS",
    ip: "167.114.48.86",
    type: "VPS",
    reactor: 3,
    company: "CTRLONLINE",
    status: "online",
    specs: "INS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 7 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB NVMe" },
  },
  {
    id: 200009,
    name: "200009-VPS-CTRLONLINE-CANCILLERIA",
    ip: "192.99.238.252",
    type: "VPS",
    reactor: 3,
    company: "CTRLONLINE",
    status: "online",
    specs: "CANCILLERIA",
    uptime: 99.9,
    lastSNMPConnection: "Hace 8 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "8 GB RAM", storage: "250 GB NVMe" },
  },

  // VPS - OAKSYSTEM
  {
    id: 400001,
    name: "400001-VPS-OAK-ip144",
    ip: "142.44.185.144",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VPS Node",
    uptime: 99.9,
    lastSNMPConnection: "Hace 9 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400002,
    name: "400002-VPS-OAK-ip145",
    ip: "142.44.185.145",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VPS Node",
    uptime: 99.9,
    lastSNMPConnection: "Hace 10 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400003,
    name: "400003-VPS-OAK-ip146",
    ip: "142.44.185.146",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VPS Node",
    uptime: 99.9,
    lastSNMPConnection: "Hace 11 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400004,
    name: "400004-VPS-OAK-ip147",
    ip: "142.44.185.147",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VPS Node",
    uptime: 99.9,
    lastSNMPConnection: "Hace 12 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "8 GB RAM", storage: "250 GB SSD" },
  },
  {
    id: 400005,
    name: "400005-VPS-OAK-ip148",
    ip: "142.44.185.148",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VPS Node",
    uptime: 99.9,
    lastSNMPConnection: "Hace 13 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400006,
    name: "400006-VPS-OAK-ip149",
    ip: "142.44.185.149",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VPS Node",
    uptime: 99.9,
    lastSNMPConnection: "Hace 14 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400007,
    name: "400007-VPS-OAK-ip150",
    ip: "142.44.185.150",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VPS Node",
    uptime: 99.9,
    lastSNMPConnection: "Hace 15 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400008,
    name: "400008-VPS-OAK-ip151",
    ip: "142.44.185.151",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VPS Node",
    uptime: 99.9,
    lastSNMPConnection: "Hace 16 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "8 GB RAM", storage: "250 GB SSD" },
  },
  {
    id: 400009,
    name: "400009-VPS-OAK-SVRCONTAB1-LNX-PPR-V01",
    ip: "192.99.193.229",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Contabilidad VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 17 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400010,
    name: "400010-VPS-OAK-SRVENCODER1-LNX-1GB",
    ip: "192.99.193.227",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Encoder VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 18 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "4 GB RAM", storage: "100 GB SSD" },
  },
  {
    id: 400011,
    name: "400011-VPS-OAK-SRVENCODER2-LNX-1GB",
    ip: "192.99.193.226",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Encoder VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 19 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "4 GB RAM", storage: "100 GB SSD" },
  },
  {
    id: 400012,
    name: "400012-VPS-OAK-SVR-APPPAGOS-LNX-PPR-V01",
    ip: "142.44.185.149",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "App Pagos VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 20 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400013,
    name: "400013-VPS-OAK-SVRPANEL-LNX-PPR-V01",
    ip: "142.44.185.146",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Panel VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 21 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400014,
    name: "400014-VPS-OAK-SVRSTADISTICAS-LNX-PPR-V01",
    ip: "54.39.46.112",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Estadisticas VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 22 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "8 GB RAM", storage: "250 GB SSD" },
  },
  {
    id: 400015,
    name: "400015-VPS-OAK-ubuntu24-LNX-PPR-V01",
    ip: "142.44.185.148",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Ubuntu 24 VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 23 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400016,
    name: "400016-VPS-OAK-MAIN1-LNX-PPR-V01",
    ip: "72.251.12.245",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Main VPS 1",
    uptime: 99.9,
    lastSNMPConnection: "Hace 24 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "8 cores", memory: "32 GB RAM", storage: "1 TB SSD" },
  },
  {
    id: 400017,
    name: "400017-VPS-OAK-TV1-PPR-LNX-PPR-V01",
    ip: "72.251.12.246",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "TV VPS 1",
    uptime: 99.9,
    lastSNMPConnection: "Hace 25 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400018,
    name: "400018-VPS-OAK-VLP1-PPR-LNX-PPR-V01",
    ip: "72.251.12.247",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VLP VPS 1",
    uptime: 99.9,
    lastSNMPConnection: "Hace 26 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400019,
    name: "400019-VPS-OAK-MAIN2-LNX-PPR-V01",
    ip: "72.251.12.248",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Main VPS 2",
    uptime: 99.9,
    lastSNMPConnection: "Hace 27 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "8 cores", memory: "32 GB RAM", storage: "1 TB SSD" },
  },
  {
    id: 400020,
    name: "400020-VPS-OAK-TV2-PPR-LNX-PPR-V01",
    ip: "72.251.12.249",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "TV VPS 2",
    uptime: 99.9,
    lastSNMPConnection: "Hace 28 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400021,
    name: "400021-VPS-OAK-VLP2-PPR-LNX-PPR-V01",
    ip: "72.251.12.250",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VLP VPS 2",
    uptime: 99.9,
    lastSNMPConnection: "Hace 29 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400022,
    name: "400022-VPS-OAK-MAIN3-LNX-PPR-V01",
    ip: "72.251.12.252",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Main VPS 3",
    uptime: 99.9,
    lastSNMPConnection: "Hace 30 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "8 cores", memory: "32 GB RAM", storage: "1 TB SSD" },
  },
  {
    id: 400023,
    name: "400023-VPS-OAK-TV3-PPR-LNX-PPR-V01",
    ip: "72.251.12.253",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "TV VPS 3",
    uptime: 99.9,
    lastSNMPConnection: "Hace 31 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400024,
    name: "400024-VPS-OAK-TV4-PPR-LNX-PPR-V01",
    ip: "51.222.150.2",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "TV VPS 4",
    uptime: 99.9,
    lastSNMPConnection: "Hace 32 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },
  {
    id: 400025,
    name: "400025-VPS-OAK-FIREWALL-VRACK-APP",
    ip: "142.44.185.147",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Firewall VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 33 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "8 GB RAM", storage: "250 GB SSD" },
  },
  {
    id: 400026,
    name: "400026-VPS-OAK-MGMERICK-WND-PPR-V01",
    ip: "10.20.200.2",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Management VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 34 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "2 cores", memory: "8 GB RAM", storage: "250 GB SSD" },
  },
  {
    id: 400029,
    name: "400029-VPS-OAK-META-LNX-PPR-V01",
    ip: "51.222.150.1",
    type: "VPS",
    reactor: 3,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Meta VPS",
    uptime: 99.9,
    lastSNMPConnection: "Hace 35 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB SSD" },
  },

  // VPS - UBIQUANDO
  {
    id: 700100,
    name: "700100-VPS-UB-FWCLUSTER-APP-PPR-V01",
    ip: "144.217.112.91",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Firewall Cluster Production",
    uptime: 99.9,
    lastSNMPConnection: "Hace 36 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "8 cores", memory: "32 GB RAM", storage: "1 TB NVMe" },
  },
  {
    id: 700101,
    name: "700101-VPS-UB-FWCLUSTER-APP-BKPV-V01",
    ip: "144.217.112.77",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Firewall Cluster Backup",
    uptime: 99.9,
    lastSNMPConnection: "Hace 37 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "8 cores", memory: "32 GB RAM", storage: "1 TB NVMe" },
  },
  {
    id: 700201,
    name: "700201-VPS-UB-PRD-03",
    ip: "144.217.112.88",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Production Server 03",
    uptime: 99.9,
    lastSNMPConnection: "Hace 38 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "16 cores", memory: "64 GB RAM", storage: "2 TB NVMe" },
  },
  {
    id: 700202,
    name: "700202-VPS-UB-TST-01",
    ip: "144.217.112.82",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Test Server 01",
    uptime: 99.9,
    lastSNMPConnection: "Hace 39 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "8 cores", memory: "32 GB RAM", storage: "1 TB NVMe" },
  },
  {
    id: 700204,
    name: "700204-VPS-UB-TST-02",
    ip: "144.217.112.83",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Test Server 02",
    uptime: 99.9,
    lastSNMPConnection: "Hace 40 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "8 cores", memory: "32 GB RAM", storage: "1 TB NVMe" },
  },
  {
    id: 700205,
    name: "700205-VPS-UB-DEV-01",
    ip: "144.217.112.79",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Development Server 01",
    uptime: 99.9,
    lastSNMPConnection: "Hace 41 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB NVMe" },
  },
  {
    id: 700206,
    name: "700206-VPS-UB-DEV-02",
    ip: "144.217.112.80",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Development Server 02",
    uptime: 99.9,
    lastSNMPConnection: "Hace 42 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB NVMe" },
  },
  {
    id: 700207,
    name: "700207-VPS-UB-DEV-03",
    ip: "144.217.112.81",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Development Server 03",
    uptime: 99.9,
    lastSNMPConnection: "Hace 43 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "4 cores", memory: "16 GB RAM", storage: "500 GB NVMe" },
  },
  {
    id: 700208,
    name: "700208-VPS-UB-PRD-01",
    ip: "144.217.112.84",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Production Server 01",
    uptime: 99.9,
    lastSNMPConnection: "Hace 44 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "16 cores", memory: "64 GB RAM", storage: "2 TB NVMe" },
  },
  {
    id: 700209,
    name: "700209-VPS-UB-PRD-02",
    ip: "144.217.112.85",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Production Server 02",
    uptime: 99.9,
    lastSNMPConnection: "Hace 45 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "16 cores", memory: "64 GB RAM", storage: "2 TB NVMe" },
  },
  {
    id: 700210,
    name: "700210-VPS-UB-PRD-04",
    ip: "144.217.112.87",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Production Server 04",
    uptime: 99.9,
    lastSNMPConnection: "Hace 46 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "16 cores", memory: "64 GB RAM", storage: "2 TB NVMe" },
  },
  {
    id: 700212,
    name: "700212-VPS-UB-PRD-06",
    ip: "144.217.112.90",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Production Server 06",
    uptime: 99.9,
    lastSNMPConnection: "Hace 47 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "16 cores", memory: "64 GB RAM", storage: "2 TB NVMe" },
  },
  {
    id: 700213,
    name: "700213-VPS-UB-UBS-01",
    ip: "144.217.112.78",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "UBS Server 01",
    uptime: 99.9,
    lastSNMPConnection: "Hace 48 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "8 cores", memory: "32 GB RAM", storage: "1 TB NVMe" },
  },
  {
    id: 700214,
    name: "700214-VPS-UB-PRD-05",
    ip: "144.217.112.86",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "Production Server 05",
    uptime: 99.9,
    lastSNMPConnection: "Hace 49 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "16 cores", memory: "64 GB RAM", storage: "2 TB NVMe" },
  },
  {
    id: 702000,
    name: "702000-VPS-UB-SVRNAS-APP-PPR-V01",
    ip: "144.217.112.89",
    type: "VPS",
    reactor: 3,
    company: "UBIQUANDO",
    status: "online",
    specs: "NAS Server Production",
    uptime: 99.9,
    lastSNMPConnection: "Hace 50 min",
    agentVersion: "1.2.1",
    hardwareSpecs: { cpu: "8 cores", memory: "32 GB RAM", storage: "1 TB NVMe" },
  },

  // ========== REACTOR 4: BARE METAL SERVERS ==========
  // PBS Servers
  {
    id: 506748,
    name: "506748-BARE-IBG-ADVSTO-G2-PBS-01",
    ip: "148.113.216.7",
    type: "Bare Metal",
    reactor: 4,
    company: "IBG.COM.CO",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 51 min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 472841,
    name: "472841-BARE-ADVSTORE-G2-PBS-01",
    ip: "148.113.169.29",
    type: "Bare Metal",
    reactor: 4,
    company: "COOTRARIS.COM",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 52 min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 489836,
    name: "489836-BARE-IC-ADVSTOR-STOR-NG3-PBS-01",
    ip: "148.113.193.2",
    type: "Bare Metal",
    reactor: 4,
    company: "ICONET.COM.MX",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 53 min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 9002651,
    name: "9002651-BARE-HBTC-ADV-G2-PBS-01",
    ip: "158.69.168.64",
    type: "Bare Metal",
    reactor: 4,
    company: "HBTC",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 54 min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 446396,
    name: "446396-BARE-SYS-SYS-1-SAT-32-PBS-BAY-1",
    ip: "192.99.36.34",
    type: "Bare Metal",
    reactor: 4,
    company: "Infrastructure",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 55 min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 414182,
    name: "414182-BARE-PR-PBS-BAY-01",
    ip: "15.235.10.221",
    type: "Bare Metal",
    reactor: 4,
    company: "PREVISALUD.COM.CO",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 56 min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 506757,
    name: "506757-BARE-IN-ADVST1-G3-PBS-01",
    ip: "148.113.216.8",
    type: "Bare Metal",
    reactor: 4,
    company: "IINUBE.COM",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 57 min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 502741,
    name: "502741-BARE-STK-ADVSTOR-G1-PBS-BAY-01",
    ip: "148.113.214.35",
    type: "Bare Metal",
    reactor: 4,
    company: "SERVERPY.COM",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 58 min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 415417,
    name: "415417-BARE-ADVSTORE-G2-PBS-01",
    ip: "15.235.12.57",
    type: "Bare Metal",
    reactor: 4,
    company: "CENTRALTELEFONICA.COM.AR",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 59 min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 9002646,
    name: "9002646-BARE-DG-HGRSTO-G2-PBS-01",
    ip: "192.99.84.56",
    type: "Bare Metal",
    reactor: 4,
    company: "DG",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 9002650,
    name: "9002650-BARE-GP-ADVSTO-G2-PBS-01",
    ip: "72.251.5.50",
    type: "Bare Metal",
    reactor: 4,
    company: "GP",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 1min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 481396,
    name: "481396-BARE-EX-ADVG2-G2-PBS-01",
    ip: "148.113.170.146",
    type: "Bare Metal",
    reactor: 4,
    company: "XPERSOFT.NET",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 2min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 506750,
    name: "506750-BARE-CSH-ADVSTO-G3-PBS-BAY-01",
    ip: "148.113.216.4",
    type: "Bare Metal",
    reactor: 4,
    company: "CEIBA.COM.CO",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 3min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 422858,
    name: "422858-BARE-T-ADVSTOR1-G2-PBS-01",
    ip: "15.235.12.231",
    type: "Bare Metal",
    reactor: 4,
    company: "ABPROSYSTEMS.COM",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 4min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 437541,
    name: "437541-BARE-ADVS1-PBS-01",
    ip: "15.235.83.54",
    type: "Bare Metal",
    reactor: 4,
    company: "KDUCEO.NET",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 5min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 472844,
    name: "472844-BARE-ADVS1-PBS-02",
    ip: "148.113.169.32",
    type: "Bare Metal",
    reactor: 4,
    company: "KDUCEO.NET",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 6min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 490047,
    name: "490047-BARE-PC-ADVSTOR2-G2-PBS-01",
    ip: "148.113.193.211",
    type: "Bare Metal",
    reactor: 4,
    company: "PCCORP.COM.AR",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 7min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 494697,
    name: "494697-BARE-AG-ADVSTOR1-G2-PBS-01",
    ip: "148.113.208.27",
    type: "Bare Metal",
    reactor: 4,
    company: "AGSAMERICAS.COM.CO",
    status: "online",
    specs: "Proxmox Backup Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 8min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 600006,
    name: "600006-BARE-SKY-RISESTRO-G3-BAY-01-GMR",
    ip: "141.95.85.145",
    type: "Bare Metal",
    reactor: 4,
    company: "SKY",
    status: "online",
    specs: "Storage Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 9min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  // PBS Servers - UBIQUANDO
  {
    id: 700500,
    name: "700500-BARE-UB-HGRSTO-G2-PBS-BAY-01",
    ip: "142.44.163.20",
    type: "Bare Metal",
    reactor: 4,
    company: "UBIQUANDO",
    status: "online",
    specs: "High Storage",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 10min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },

  // Dedicated Bare Metal Servers
  {
    id: 473203,
    name: "473203-BARE-HBTC-ADVSTO-G2-PBS-01",
    ip: "148.113.169.61",
    type: "Bare Metal",
    reactor: 4,
    company: "HBTC",
    status: "online",
    specs: "Advanced Storage",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 11min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 494710,
    name: "494710-BARE-HBTC-BAY-01",
    ip: "148.113.208.40",
    type: "Bare Metal",
    reactor: 4,
    company: "HBTC",
    status: "online",
    specs: "Bare Metal Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 12min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 485520,
    name: "485520-BARE-TP-RISE-G3-BAY-01",
    ip: "148.113.185.34",
    type: "Bare Metal",
    reactor: 4,
    company: "TEMPORIS.MX",
    status: "online",
    specs: "Bare Metal Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 13min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 496833,
    name: "496833-BARE-BT-HGR-STOR-1-PBS-01",
    ip: "148.113.211.163",
    type: "Bare Metal",
    reactor: 4,
    company: "BOOKTAM.COM",
    status: "online",
    specs: "High Storage",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 14min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 494700,
    name: "494700-BARE-UBIQ-ADVS1-G2-BAY-01",
    ip: "148.113.208.30",
    type: "Bare Metal",
    reactor: 4,
    company: "UBIQUANDO",
    status: "online",
    specs: "Advanced Storage",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 15min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 506756,
    name: "506756-BARE-UBIQ-ADVSTO-G3-BAY-01",
    ip: "148.113.216.7",
    type: "Bare Metal",
    reactor: 4,
    company: "UBIQUANDO",
    status: "online",
    specs: "Advanced Storage",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 16min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 481339,
    name: "481339-BARE-OGS-RISE-G3-BAY-01",
    ip: "148.113.170.81",
    type: "Bare Metal",
    reactor: 4,
    company: "OLDGREYSTONE.COM",
    status: "online",
    specs: "Bare Metal Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 17min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 494422,
    name: "494422-BARE-RYN-ADVSTO-G2-PBS-01",
    ip: "148.113.207.162",
    type: "Bare Metal",
    reactor: 4,
    company: "REYNAR.COM.CO",
    status: "online",
    specs: "Advanced Storage",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 18min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },

  // Dedicated Bare Metal Servers
  {
    id: 314722,
    name: "314722-BARE-HBTC-RISE1-LABHACK-HACKACADEMY",
    ip: "54.39.105.106",
    type: "Bare Metal",
    reactor: 4,
    company: "HBTC",
    status: "online",
    specs: "Lab Hack Academy",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 19min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 378012,
    name: "378012-BARE-HBTC-INFRA-1-ZIMBRA-CORZO",
    ip: "51.222.47.74",
    type: "Bare Metal",
    reactor: 4,
    company: "HBTC",
    status: "online",
    specs: "Zimbra Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 20min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 482760,
    name: "482760-BARE-BT-HGR1-G1-MONGO-GATEWAY-PORCAMBIO",
    ip: "51.222.152.216",
    type: "Bare Metal",
    reactor: 4,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "MongoDB Gateway",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 21min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 484061,
    name: "484061-BARE-BT-HGR3-G1-MONGO-GATEWAY-PORINTALAR",
    ip: "148.113.187.42",
    type: "Bare Metal",
    reactor: 4,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "MongoDB Gateway",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 22min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 496833,
    name: "496833-BARE-BT-HGR-STOR-1-PBS-01",
    ip: "148.113.208.168",
    type: "Bare Metal",
    reactor: 4,
    company: "BETCONNECTIONS.COM",
    status: "online",
    specs: "Storage Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 23min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 500013,
    name: "500013-BARE-OAK-SRVLP-4-LNX-10GB-ip25",
    ip: "192.95.19.25",
    type: "Bare Metal",
    reactor: 4,
    company: "OAKSYSTEM",
    status: "online",
    specs: "10GB Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 24min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 425017,
    name: "425017-BARE-OAK-TM-ADV2-G2",
    ip: "15.235.42.45",
    type: "Bare Metal",
    reactor: 4,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Advanced Server G2",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 25min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 453197,
    name: "453197-BARE-OAK-TM-ADVSTOR1-G2",
    ip: "148.113.152.145",
    type: "Bare Metal",
    reactor: 4,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Storage Server G2",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 26min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 236186,
    name: "236186-BARE-panel",
    ip: "192.99.33.217",
    type: "Bare Metal",
    reactor: 4,
    company: "TITANO CLOUD",
    status: "online",
    specs: "Control Panel Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 27min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 493203,
    name: "493203-BARE-SYS-SCA-I3-G3-BAY-1",
    ip: "148.113.199.219",
    type: "Bare Metal",
    reactor: 4,
    company: "SERVSOFT.COM",
    status: "online",
    specs: "Bare Metal Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 28min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 494422,
    name: "494422-BARE-RYN-ADVSTO-G2-PBS-01",
    ip: "148.113.206.140",
    type: "Bare Metal",
    reactor: 4,
    company: "RYNDEM.MX",
    status: "online",
    specs: "Storage Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 29min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 401453,
    name: "401453-BARE-PR-HGR3-BAY-01",
    ip: "51.222.249.84",
    type: "Bare Metal",
    reactor: 4,
    company: "PREVISALUD.COM.CO",
    status: "online",
    specs: "Bare Metal Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 30min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 453090,
    name: "453090-BARE-ADV5-G2-1",
    ip: "15.235.115.179",
    type: "Bare Metal",
    reactor: 4,
    company: "VALORX.NET",
    status: "online",
    specs: "Advanced Server G2",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 31min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 451816,
    name: "451816-BARE-ZE-RISE1-G2-PVE",
    ip: "148.113.159.120",
    type: "Bare Metal",
    reactor: 4,
    company: "ZETAMSELECTRIC.COM",
    status: "online",
    specs: "Proxmox VE Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 32min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 422719,
    name: "422719-BARE-S-ADVST1-G2",
    ip: "15.235.12.222",
    type: "Bare Metal",
    reactor: 4,
    company: "OAKTVPRO.CLUB",
    status: "online",
    specs: "Storage Server G2",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 33min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 462754,
    name: "462754-BARE-Delta",
    ip: "148.113.168.51",
    type: "Bare Metal",
    reactor: 4,
    company: "PLATAFORMAINTEGRA.NET",
    status: "online",
    specs: "Delta Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 34min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 497296,
    name: "497296-BARE-PRS-ADV5-G3-BAY-01",
    ip: "148.113.208.200",
    type: "Bare Metal",
    reactor: 4,
    company: "PROSOFT.CO",
    status: "online",
    specs: "Advanced Server G3",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 35min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },
  {
    id: 412703,
    name: "412703-BARE-ADV-4-CLU",
    ip: "51.222.248.167",
    type: "Bare Metal",
    reactor: 4,
    company: "INTELLPLAT.COM",
    status: "online",
    specs: "Cluster Server",
    uptime: 99.9,
    lastSNMPConnection: "Hace 1h 36min",
    agentVersion: "1.1.8",
    hardwareSpecs: { cpu: "32 cores", memory: "256 GB RAM", storage: "50 TB SAS" },
  },

  // ========== REACTOR 5: OAKSYSTEM INFRASTRUCTURE ==========
  {
    id: 500014,
    name: "500014-OAK-VRACK-ip224",
    ip: "192.99.193.224",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VRACK Connection",
    uptime: 100.0,
    lastSNMPConnection: "Hace 5 min",
    agentVersion: "N/A",
  },
  {
    id: 500015,
    name: "500015-OAK-VRACK-ip225",
    ip: "192.99.193.225",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VRACK Connection",
    uptime: 100.0,
    lastSNMPConnection: "Hace 6 min",
    agentVersion: "N/A",
  },
  {
    id: 500016,
    name: "500016-OAK-VRACK-ip226",
    ip: "192.99.193.226",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VRACK Connection",
    uptime: 100.0,
    lastSNMPConnection: "Hace 7 min",
    agentVersion: "N/A",
  },
  {
    id: 500017,
    name: "500017-OAK-VRACK-ip227",
    ip: "192.99.193.227",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VRACK Connection",
    uptime: 100.0,
    lastSNMPConnection: "Hace 8 min",
    agentVersion: "N/A",
  },
  {
    id: 500018,
    name: "500018-OAK-VRACK-ip228",
    ip: "192.99.193.228",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VRACK Connection",
    uptime: 100.0,
    lastSNMPConnection: "Hace 9 min",
    agentVersion: "N/A",
  },
  {
    id: 500019,
    name: "500019-OAK-VRACK-ip229",
    ip: "192.99.193.229",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VRACK Connection",
    uptime: 100.0,
    lastSNMPConnection: "Hace 10 min",
    agentVersion: "N/A",
  },
  {
    id: 500020,
    name: "500020-OAK-VRACK-ip230",
    ip: "192.99.193.230",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VRACK Connection",
    uptime: 100.0,
    lastSNMPConnection: "Hace 11 min",
    agentVersion: "N/A",
  },
  {
    id: 500021,
    name: "500021-OAK-VRACK-ip231",
    ip: "192.99.193.231",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "VRACK Connection",
    uptime: 100.0,
    lastSNMPConnection: "Hace 12 min",
    agentVersion: "N/A",
  },
  {
    id: 500022,
    name: "500022-OAK-BLK146-ip128",
    ip: "51.222.146.128",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 146",
    uptime: 100.0,
    lastSNMPConnection: "Hace 13 min",
    agentVersion: "N/A",
  },
  {
    id: 500023,
    name: "500023-OAK-BLK146-ip129",
    ip: "51.222.146.129",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 146",
    uptime: 100.0,
    lastSNMPConnection: "Hace 14 min",
    agentVersion: "N/A",
  },
  {
    id: 500024,
    name: "500024-OAK-BLK146-ip130",
    ip: "51.222.146.130",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 146",
    uptime: 100.0,
    lastSNMPConnection: "Hace 15 min",
    agentVersion: "N/A",
  },
  {
    id: 500025,
    name: "500025-OAK-BLK146-ip131",
    ip: "51.222.146.131",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 146",
    uptime: 100.0,
    lastSNMPConnection: "Hace 16 min",
    agentVersion: "N/A",
  },
  {
    id: 500026,
    name: "500026-OAK-BLK146-ip132",
    ip: "51.222.146.132",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 146",
    uptime: 100.0,
    lastSNMPConnection: "Hace 17 min",
    agentVersion: "N/A",
  },
  {
    id: 500027,
    name: "500027-OAK-BLK146-ip133",
    ip: "51.222.146.133",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 146",
    uptime: 100.0,
    lastSNMPConnection: "Hace 18 min",
    agentVersion: "N/A",
  },
  {
    id: 500028,
    name: "500028-OAK-BLK146-ip134",
    ip: "51.222.146.134",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 146",
    uptime: 100.0,
    lastSNMPConnection: "Hace 19 min",
    agentVersion: "N/A",
  },
  {
    id: 500029,
    name: "500029-OAK-BLK146-ip135",
    ip: "51.222.146.135",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 146",
    uptime: 100.0,
    lastSNMPConnection: "Hace 20 min",
    agentVersion: "N/A",
  },
  {
    id: 500030,
    name: "500030-OAK-BLK150-ip0",
    ip: "51.222.150.0",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 150",
    uptime: 100.0,
    lastSNMPConnection: "Hace 21 min",
    agentVersion: "N/A",
  },
  {
    id: 500031,
    name: "500031-OAK-BLK150-ip1",
    ip: "51.222.150.1",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 150",
    uptime: 100.0,
    lastSNMPConnection: "Hace 22 min",
    agentVersion: "N/A",
  },
  {
    id: 500032,
    name: "500032-OAK-BLK150-ip2",
    ip: "51.222.150.2",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 150",
    uptime: 100.0,
    lastSNMPConnection: "Hace 23 min",
    agentVersion: "N/A",
  },
  {
    id: 500033,
    name: "500033-OAK-BLK150-ip3",
    ip: "51.222.150.3",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 150",
    uptime: 100.0,
    lastSNMPConnection: "Hace 24 min",
    agentVersion: "N/A",
  },
  {
    id: 500034,
    name: "500034-OAK-BLK150-ip4",
    ip: "51.222.150.4",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 150",
    uptime: 100.0,
    lastSNMPConnection: "Hace 25 min",
    agentVersion: "N/A",
  },
  {
    id: 500035,
    name: "500035-OAK-BLK150-ip5",
    ip: "51.222.150.5",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 150",
    uptime: 100.0,
    lastSNMPConnection: "Hace 26 min",
    agentVersion: "N/A",
  },
  {
    id: 500036,
    name: "500036-OAK-BLK150-ip6",
    ip: "51.222.150.6",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 150",
    uptime: 100.0,
    lastSNMPConnection: "Hace 27 min",
    agentVersion: "N/A",
  },
  {
    id: 500037,
    name: "500037-OAK-BLK150-ip7",
    ip: "51.222.150.7",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Block 150",
    uptime: 100.0,
    lastSNMPConnection: "Hace 28 min",
    agentVersion: "N/A",
  },
  {
    id: 500038,
    name: "500038-OAK-ip140",
    ip: "54.39.163.140",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Node",
    uptime: 100.0,
    lastSNMPConnection: "Hace 29 min",
    agentVersion: "N/A",
  },
  {
    id: 500039,
    name: "500039-OAK-ip112",
    ip: "54.39.46.112",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Network Node",
    uptime: 100.0,
    lastSNMPConnection: "Hace 30 min",
    agentVersion: "N/A",
  },
  {
    id: 500040,
    name: "500040-OAK-TOR-ip244",
    ip: "72.251.12.244",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 31 min",
    agentVersion: "N/A",
  },
  {
    id: 500041,
    name: "500041-OAK-TOR-ip245",
    ip: "72.251.12.245",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 32 min",
    agentVersion: "N/A",
  },
  {
    id: 500042,
    name: "500042-OAK-TOR-ip246",
    ip: "72.251.12.246",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 33 min",
    agentVersion: "N/A",
  },
  {
    id: 500043,
    name: "500043-OAK-TOR-ip247",
    ip: "72.251.12.247",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 34 min",
    agentVersion: "N/A",
  },
  {
    id: 500044,
    name: "500044-OAK-TOR-ip248",
    ip: "72.251.12.248",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 35 min",
    agentVersion: "N/A",
  },
  {
    id: 500045,
    name: "500045-OAK-TOR-ip249",
    ip: "72.251.12.249",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 36 min",
    agentVersion: "N/A",
  },
  {
    id: 500046,
    name: "500046-OAK-TOR-ip250",
    ip: "72.251.12.250",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 37 min",
    agentVersion: "N/A",
  },
  {
    id: 500047,
    name: "500047-OAK-TOR-ip251",
    ip: "72.251.12.251",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 38 min",
    agentVersion: "N/A",
  },
  {
    id: 500048,
    name: "500048-OAK-TOR-ip252",
    ip: "72.251.12.252",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 39 min",
    agentVersion: "N/A",
  },
  {
    id: 500049,
    name: "500049-OAK-TOR-ip253",
    ip: "72.251.12.253",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 40 min",
    agentVersion: "N/A",
  },
  {
    id: 500050,
    name: "500050-OAK-TOR-ip254",
    ip: "72.251.12.254",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 41 min",
    agentVersion: "N/A",
  },
  {
    id: 500051,
    name: "500051-OAK-TOR-ip255",
    ip: "72.251.12.255",
    type: "Infrastructure",
    reactor: 5,
    company: "OAKSYSTEM",
    status: "online",
    specs: "Toronto Block",
    uptime: 100.0,
    lastSNMPConnection: "Hace 42 min",
    agentVersion: "N/A",
  },
]

export default function HostsPage() {
  const [hosts] = useState<Host[]>(INITIAL_HOSTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedReactor, setSelectedReactor] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50

  const filteredHosts = hosts.filter((host) => {
    const matchesSearch =
      host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.ip.includes(searchTerm) ||
      host.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || host.type === selectedType
    const matchesReactor = selectedReactor === "all" || host.reactor.toString() === selectedReactor
    return matchesSearch && matchesType && matchesReactor
  })

  const totalPages = Math.ceil(filteredHosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedHosts = filteredHosts.slice(startIndex, endIndex)

  const stats = {
    total: hosts.length,
    online: hosts.filter((h) => h.status === "online").length,
    offline: hosts.filter((h) => h.status === "offline").length,
    warning: hosts.filter((h) => h.status === "warning").length,
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Hosts y Servidores</h1>
          <p className="text-slate-400">Gestión completa de servidores clasificados por reactor y tipo</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Hosts</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <Server className="w-8 h-8 text-cyan-500" />
            </div>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Online</p>
                <p className="text-2xl font-bold text-green-500 mt-1">{stats.online}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            </div>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Offline</p>
                <p className="text-2xl font-bold text-red-500 mt-1">{stats.offline}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-red-500" />
            </div>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Warning</p>
                <p className="text-2xl font-bold text-yellow-500 mt-1">{stats.warning}</p>
              </div>
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900 border-slate-800 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar por nombre, IP o empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-white"
            >
              <option value="all">Todos los tipos</option>
              <option value="CEPH Cluster">CEPH Cluster</option>
              <option value="VPS">VPS</option>
              <option value="Bare Metal">Bare Metal</option>
              <option value="SPAM">SPAM</option>
              <option value="Website">Website</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Proxmox Backup">Proxmox Backup</option>
              <option value="Proxmox VE">Proxmox VE</option>
              <option value="cPanel">cPanel</option>
              <option value="WHM">WHM</option>
              <option value="Proxmox Cluster">Proxmox Cluster</option>
            </select>
            <select
              value={selectedReactor}
              onChange={(e) => setSelectedReactor(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-white"
            >
              <option value="all">Todos los reactores</option>
              <option value="1">Reactor 1</option>
              <option value="2">Reactor 2</option>
              <option value="3">Reactor 3</option>
              <option value="4">Reactor 4</option>
              <option value="5">Reactor 5</option>
            </select>
            <Button variant="outline" className="border-slate-700 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </Card>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedType === "all" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedType("VPS")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedType === "VPS" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
          >
            VPS
          </button>
          <button
            onClick={() => setSelectedType("Proxmox Backup")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedType === "Proxmox Backup" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
          >
            Proxmox Backup (PBS)
          </button>
          <button
            onClick={() => setSelectedType("cPanel")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedType === "cPanel" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
          >
            cPanel/WHM
          </button>
          <button
            onClick={() => setSelectedType("Proxmox VE")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedType === "Proxmox VE" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
          >
            Proxmox VE
          </button>
          <button
            onClick={() => setSelectedType("Proxmox Cluster")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedType === "Proxmox Cluster" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
          >
            Clusters Proxmox
          </button>
          <button
            onClick={() => setSelectedType("CEPH Cluster")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${selectedType === "CEPH Cluster" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
          >
            CEPH Clusters
          </button>
        </div>

        {/* Reactor Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedReactor("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedReactor === "all" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Todos ({hosts.length})
          </button>
          <button
            onClick={() => setSelectedReactor("1")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedReactor === "1" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Reactor 1: CEPH ({hosts.filter((h) => h.reactor === 1).length})
          </button>
          <button
            onClick={() => setSelectedReactor("2")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedReactor === "2" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Reactor 2: SPAM ({hosts.filter((h) => h.reactor === 2).length})
          </button>
          <button
            onClick={() => setSelectedReactor("3")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedReactor === "3" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Reactor 3: VPS ({hosts.filter((h) => h.reactor === 3).length})
          </button>
          <button
            onClick={() => setSelectedReactor("4")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedReactor === "4" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Reactor 4: Bare Metal ({hosts.filter((h) => h.reactor === 4).length})
          </button>
          <button
            onClick={() => setSelectedReactor("5")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedReactor === "5" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Reactor 5: Infrastructure ({hosts.filter((h) => h.reactor === 5).length})
          </button>
        </div>

        {/* Hosts Table */}
        {/* Tabla de hosts con datos de monitoreo */}
        <Card className="bg-slate-900 border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left p-4 text-slate-400 font-medium">Host</th>
                  <th className="text-left p-4 text-slate-400 font-medium">IP</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Tipo</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Reactor</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Estado</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Specs</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Uptime</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Última Conexión SNMP</th>
                  <th className="text-left p-4 text-slate-400 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedHosts.map((host) => (
                  <tr key={host.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-white font-medium">
                      <Link href={`/dashboard/host-monitor/${host.id}`} className="text-cyan-400 hover:underline">
                        {host.name}
                      </Link>
                    </td>
                    <td className="p-4 text-slate-300 font-mono text-sm">{host.ip}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-cyan-600 text-cyan-400">
                        {host.type}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-300">Reactor {host.reactor}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            host.status === "online"
                              ? "bg-green-500"
                              : host.status === "offline"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            host.status === "online"
                              ? "text-green-400"
                              : host.status === "offline"
                                ? "text-red-400"
                                : "text-yellow-400"
                          }`}
                        >
                          {host.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">{host.specs || "-"}</td>
                    <td className="p-4 text-slate-300">{host.uptime?.toFixed(1) || "N/A"}%</td>
                    <td className="p-4 text-slate-300 text-sm">{host.lastSNMPConnection || "N/A"}</td>
                    <td className="p-4">
                      <Button size="sm" variant="outline" className="border-slate-700 bg-transparent">
                        Ver Detalles
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex items-center justify-between mt-6">
          <div className="text-slate-400 text-sm">
            Mostrando {startIndex + 1} - {Math.min(endIndex, filteredHosts.length)} de {filteredHosts.length} hosts
            filtrados ({stats.total} totales)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-slate-700 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
            <div className="text-slate-400 text-sm">
              Página {currentPage} de {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-slate-700 bg-transparent"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
