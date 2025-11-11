"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Mail, Shield, Server, Globe, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface Host {
  id: string
  name: string
  ip: string
  status: "online" | "warning" | "offline"
  reactor: number
  uptime?: string
  lastCheck?: string
  type?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [hosts, setHosts] = useState<Host[]>([
    // Reactor 1 - Clusters (Ceph, Storage)
    {
      id: "483431",
      name: "CEPH-IBG-SCA3-G2-BAY-01",
      ip: "72.251.3.93",
      status: "online",
      reactor: 1,
      type: "Ceph - IBG",
      uptime: "99.9%",
    },
    {
      id: "501691",
      name: "CEPH-IBG-SCA3-G2-BAY-02",
      ip: "72.251.3.238",
      status: "online",
      reactor: 1,
      type: "Ceph - IBG",
      uptime: "99.8%",
    },
    {
      id: "493196",
      name: "CEPH-IBG-SCA3-G2-BAY-03",
      ip: "72.251.3.212",
      status: "online",
      reactor: 1,
      type: "Ceph - IBG",
      uptime: "99.7%",
    },
    {
      id: "469453",
      name: "CEPH-SCA1-BAY-01",
      ip: "15.235.67.86",
      status: "online",
      reactor: 1,
      type: "Ceph - COOTRARIS",
      uptime: "99.9%",
    },
    {
      id: "469864",
      name: "CEPH-SCA1-BAY-02",
      ip: "15.235.67.180",
      status: "online",
      reactor: 1,
      type: "Ceph - COOTRARIS",
      uptime: "99.7%",
    },
    {
      id: "469855",
      name: "CEPH-SCA1-BAY-03",
      ip: "15.235.43.103",
      status: "online",
      reactor: 1,
      type: "Ceph - COOTRARIS",
      uptime: "99.8%",
    },
    {
      id: "408163",
      name: "CEPH-IC-HGR3-01",
      ip: "51.222.152.249",
      status: "online",
      reactor: 1,
      type: "Ceph - ICONET",
      uptime: "99.9%",
    },
    {
      id: "422255",
      name: "CEPH-IC-HGR3-02",
      ip: "15.235.43.68",
      status: "online",
      reactor: 1,
      type: "Ceph - ICONET",
      uptime: "99.6%",
    },
    {
      id: "449125",
      name: "CEPH-IC-HGR3-03",
      ip: "15.235.67.40",
      status: "online",
      reactor: 1,
      type: "Ceph - ICONET",
      uptime: "99.5%",
    },
    {
      id: "482770",
      name: "CEPH-BT-HGR4-G2-BAY-01",
      ip: "51.222.152.212",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.9%",
    },
    {
      id: "490629",
      name: "CEPH-BT-HGR4-G2-BAY-02",
      ip: "148.113.193.172",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.8%",
    },
    {
      id: "482769",
      name: "CEPH-BT-HGR4-G2-BAY-03",
      ip: "148.113.199.14",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.7%",
    },
    {
      id: "499053",
      name: "CEPH-BT-HGR4-G2-BAY-05",
      ip: "148.113.211.68",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.9%",
    },
    {
      id: "499056",
      name: "CEPH-BT-HGR4-G2-BAY-06",
      ip: "148.113.211.71",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.8%",
    },
    {
      id: "499054",
      name: "CEPH-BT-HGR4-G2-BAY-07",
      ip: "148.113.211.67",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.7%",
    },
    {
      id: "499059",
      name: "CEPH-BT-HGR4-G2-BAY-08",
      ip: "148.113.211.70",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.9%",
    },
    {
      id: "499055",
      name: "CEPH-BT-HGR4-G2-BAY-09",
      ip: "148.113.211.87",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.8%",
    },
    {
      id: "499057",
      name: "CEPH-BT-HGR4-G2-BAY-10",
      ip: "148.113.211.69",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.7%",
    },
    {
      id: "499058",
      name: "CEPH-BT-HGR4-G2-BAY-11",
      ip: "148.113.211.83",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.9%",
    },
    {
      id: "505062",
      name: "CEPH-BT-HGR4-G2-BAY-12",
      ip: "148.113.215.29",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.8%",
    },
    {
      id: "510531",
      name: "CEPH-BT-HGR4-G2-BAY-13",
      ip: "51.222.249.56",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.7%",
    },
    {
      id: "510532",
      name: "CEPH-BT-HGR4-G2-BAY-14",
      ip: "148.113.219.12",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.9%",
    },
    {
      id: "510533",
      name: "CEPH-BT-HGR4-G2-BAY-15",
      ip: "148.113.224.50",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.8%",
    },
    {
      id: "510534",
      name: "CEPH-BT-HGR4-G2-BAY-16",
      ip: "15.235.67.107",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.7%",
    },
    {
      id: "510535",
      name: "CEPH-BT-HGR4-G2-BAY-17",
      ip: "148.113.224.22",
      status: "online",
      reactor: 1,
      type: "Ceph - BET",
      uptime: "99.9%",
    },
    {
      id: "484063",
      name: "CEPH-HBTC-HGR3-G2-BAY-01",
      ip: "148.113.187.44",
      status: "online",
      reactor: 1,
      type: "Ceph - HBTC",
      uptime: "99.9%",
    },
    {
      id: "490630",
      name: "CEPH-HBTC-HGR3-G2-BAY-02",
      ip: "148.113.193.173",
      status: "online",
      reactor: 1,
      type: "Ceph - HBTC",
      uptime: "99.8%",
    },
    {
      id: "484062",
      name: "CEPH-HBTC-HGR3-G2-BAY-03",
      ip: "148.113.187.43",
      status: "online",
      reactor: 1,
      type: "Ceph - HBTC",
      uptime: "99.7%",
    },
    {
      id: "476771",
      name: "CEPH-PO-SCAI3-01",
      ip: "72.251.3.67",
      status: "online",
      reactor: 1,
      type: "Ceph - PROCOM",
      uptime: "99.9%",
    },
    {
      id: "476772",
      name: "CEPH-PO-SCAI3-02",
      ip: "72.251.3.72",
      status: "online",
      reactor: 1,
      type: "Ceph - PROCOM",
      uptime: "99.8%",
    },
    {
      id: "476784",
      name: "CEPH-PO-SCAI3-03",
      ip: "72.251.3.45",
      status: "online",
      reactor: 1,
      type: "Ceph - PROCOM",
      uptime: "99.7%",
    },
    {
      id: "491554",
      name: "CEPH-PC-SCA1-G2-BAY-1",
      ip: "148.113.199.58",
      status: "online",
      reactor: 1,
      type: "Ceph - PCCORP",
      uptime: "99.9%",
    },
    {
      id: "491555",
      name: "CEPH-PC-SCA1-G2-BAY-2",
      ip: "148.113.199.29",
      status: "online",
      reactor: 1,
      type: "Ceph - PCCORP",
      uptime: "99.8%",
    },
    {
      id: "491553",
      name: "CEPH-PC-SCA1-G2-BAY-3",
      ip: "148.113.199.59",
      status: "online",
      reactor: 1,
      type: "Ceph - PCCORP",
      uptime: "99.7%",
    },
    {
      id: "483445",
      name: "CEPH-RYN-SCA3-G2-BAY-01",
      ip: "72.251.3.103",
      status: "online",
      reactor: 1,
      type: "Ceph - RYNDEM",
      uptime: "99.9%",
    },
    {
      id: "483442",
      name: "CEPH-RYN-SCA3-G2-BAY-02",
      ip: "72.251.3.96",
      status: "online",
      reactor: 1,
      type: "Ceph - RYNDEM",
      uptime: "99.8%",
    },
    {
      id: "486095",
      name: "CEPH-RYN-SCA3-G2-BAY-03",
      ip: "72.251.3.139",
      status: "online",
      reactor: 1,
      type: "Ceph - RYNDEM",
      uptime: "99.7%",
    },
    {
      id: "482995",
      name: "CEPH-IN-HGR3-G2-01",
      ip: "72.251.3.100",
      status: "online",
      reactor: 1,
      type: "Ceph - IINUBE",
      uptime: "99.9%",
    },
    {
      id: "498611",
      name: "CEPH-IN-HGR3-G2-02",
      ip: "72.251.3.229",
      status: "online",
      reactor: 1,
      type: "Ceph - IINUBE",
      uptime: "99.8%",
    },
    {
      id: "503809",
      name: "CEPH-IN-HGR3-G2-03",
      ip: "72.251.3.242",
      status: "online",
      reactor: 1,
      type: "Ceph - IINUBE",
      uptime: "99.7%",
    },
    {
      id: "510878",
      name: "CEPH-IN-HGR3-G2-04",
      ip: "72.251.11.57",
      status: "online",
      reactor: 1,
      type: "Ceph - IINUBE",
      uptime: "99.9%",
    },
    {
      id: "511678",
      name: "CEPH-STK-HGR-I1-G3-BAY-01",
      ip: "148.113.220.141",
      status: "online",
      reactor: 1,
      type: "Ceph - SERVERPY",
      uptime: "99.9%",
    },
    {
      id: "500759",
      name: "CEPH-STK-HGR-I1-G3-BAY-02",
      ip: "148.113.212.220",
      status: "online",
      reactor: 1,
      type: "Ceph - SERVERPY",
      uptime: "99.8%",
    },
    {
      id: "506218",
      name: "CEPH-STK-HGR-I1-G3-BAY-03",
      ip: "148.113.222.33",
      status: "online",
      reactor: 1,
      type: "Ceph - SERVERPY",
      uptime: "99.7%",
    },
    {
      id: "469461",
      name: "CEPH-scale-i1-01",
      ip: "15.235.67.115",
      status: "online",
      reactor: 1,
      type: "Ceph - CENTRALTEL",
      uptime: "99.9%",
    },
    {
      id: "469870",
      name: "CEPH-scale-i1-02",
      ip: "15.235.67.186",
      status: "online",
      reactor: 1,
      type: "Ceph - CENTRALTEL",
      uptime: "99.8%",
    },
    {
      id: "466298",
      name: "CEPH-scale-i1-03",
      ip: "51.222.249.37",
      status: "online",
      reactor: 1,
      type: "Ceph - CENTRALTEL",
      uptime: "99.7%",
    },
    {
      id: "475799",
      name: "CEPH-A-HGR3-BAY-01",
      ip: "15.235.117.106",
      status: "online",
      reactor: 1,
      type: "Ceph - AVANTIKA",
      uptime: "99.9%",
    },
    {
      id: "475798",
      name: "CEPH-A-HGR3-BAY-02",
      ip: "15.235.117.104",
      status: "online",
      reactor: 1,
      type: "Ceph - AVANTIKA",
      uptime: "99.8%",
    },
    {
      id: "475797",
      name: "CEPH-A-HGR3-BAY-03",
      ip: "15.235.117.105",
      status: "online",
      reactor: 1,
      type: "Ceph - AVANTIKA",
      uptime: "99.7%",
    },
    {
      id: "444276",
      name: "CEPH-X-HGR3-01",
      ip: "15.235.117.37",
      status: "online",
      reactor: 1,
      type: "Ceph - HPSERVIDOR",
      uptime: "99.9%",
    },
    {
      id: "447438",
      name: "CEPH-X-HGR3-02",
      ip: "15.235.117.53",
      status: "online",
      reactor: 1,
      type: "Ceph - HPSERVIDOR",
      uptime: "99.8%",
    },
    {
      id: "447437",
      name: "CEPH-X-HGR3-03",
      ip: "15.235.117.52",
      status: "online",
      reactor: 1,
      type: "Ceph - HPSERVIDOR",
      uptime: "99.7%",
    },
    {
      id: "494339",
      name: "CEPH-AG-SCAI1-G2-BAY-01",
      ip: "148.113.208.166",
      status: "online",
      reactor: 1,
      type: "Ceph - AGSAMERICAS",
      uptime: "99.9%",
    },
    {
      id: "494350",
      name: "CEPH-AG-SCAI1-G2-BAY-02",
      ip: "15.235.43.42",
      status: "online",
      reactor: 1,
      type: "Ceph - AGSAMERICAS",
      uptime: "99.8%",
    },
    {
      id: "494351",
      name: "CEPH-AG-SCAI1-G2-BAY-03",
      ip: "15.235.43.115",
      status: "online",
      reactor: 1,
      type: "Ceph - AGSAMERICAS",
      uptime: "99.7%",
    },
    {
      id: "483332",
      name: "CEPH-EX-HGR3-3",
      ip: "15.235.43.231",
      status: "online",
      reactor: 1,
      type: "Ceph - XPERSOFT",
      uptime: "99.9%",
    },
    {
      id: "483333",
      name: "CEPH-EX-HGR3-1",
      ip: "15.235.43.230",
      status: "online",
      reactor: 1,
      type: "Ceph - XPERSOFT",
      uptime: "99.8%",
    },
    {
      id: "483334",
      name: "CEPH-EX-HGR3-2",
      ip: "15.235.43.237",
      status: "online",
      reactor: 1,
      type: "Ceph - XPERSOFT",
      uptime: "99.7%",
    },
    {
      id: "496225",
      name: "CEPH-CSH-SCA-I3-G2-BAY-01",
      ip: "72.251.3.203",
      status: "online",
      reactor: 1,
      type: "Ceph - CEIBA",
      uptime: "99.9%",
    },
    {
      id: "493198",
      name: "CEPH-CSH-SCA-I3-G2-BAY-03",
      ip: "72.251.3.216",
      status: "online",
      reactor: 1,
      type: "Ceph - CEIBA",
      uptime: "99.8%",
    },
    {
      id: "493199",
      name: "CEPH-CSH-SCA-I3-G2-BAY-02",
      ip: "72.251.3.215",
      status: "online",
      reactor: 1,
      type: "Ceph - CEIBA",
      uptime: "99.7%",
    },
    {
      id: "486569",
      name: "CEPH-TAB-SCA3-BAY-01",
      ip: "148.113.187.110",
      status: "online",
      reactor: 1,
      type: "Ceph - ABPROSYSTEMS",
      uptime: "99.9%",
    },
    {
      id: "486568",
      name: "CEPH-TAB-SCA3-BAY-02",
      ip: "148.113.187.109",
      status: "online",
      reactor: 1,
      type: "Ceph - ABPROSYSTEMS",
      uptime: "99.8%",
    },
    {
      id: "483529",
      name: "CEPH-TAB-SCA3-BAY-03",
      ip: "148.113.187.35",
      status: "online",
      reactor: 1,
      type: "Ceph - ABPROSYSTEMS",
      uptime: "99.7%",
    },
    {
      id: "501686",
      name: "CEPH-MRK-HGR4-G2-01",
      ip: "15.235.43.16",
      status: "online",
      reactor: 1,
      type: "Ceph - KDUCEO",
      uptime: "99.9%",
    },
    {
      id: "501685",
      name: "CEPH-MRK-HGR4-G2-02",
      ip: "148.113.213.79",
      status: "online",
      reactor: 1,
      type: "Ceph - KDUCEO",
      uptime: "99.8%",
    },
    {
      id: "501684",
      name: "CEPH-MRK-HGR4-G2-03",
      ip: "15.235.43.97",
      status: "online",
      reactor: 1,
      type: "Ceph - KDUCEO",
      uptime: "99.7%",
    },
    {
      id: "501683",
      name: "CEPH-MRK-HGR4-G2-04",
      ip: "15.235.43.104",
      status: "online",
      reactor: 1,
      type: "Ceph - KDUCEO",
      uptime: "99.9%",
    },
    {
      id: "9002640",
      name: "CEPH-DG-HGR4-BAY-01",
      ip: "15.235.117.114",
      status: "online",
      reactor: 1,
      type: "Ceph - DG",
      uptime: "99.9%",
    },
    {
      id: "9002641",
      name: "CEPH-DG-HGR4-BAY-02",
      ip: "148.113.199.165",
      status: "online",
      reactor: 1,
      type: "Ceph - DG",
      uptime: "99.8%",
    },
    {
      id: "9002642",
      name: "CEPH-DG-HGR4-BAY-03",
      ip: "15.235.117.181",
      status: "online",
      reactor: 1,
      type: "Ceph - DG",
      uptime: "99.7%",
    },
    {
      id: "9002643",
      name: "CEPH-DG-HGR4-BAY-04",
      ip: "148.113.215.11",
      status: "online",
      reactor: 1,
      type: "Ceph - DG",
      uptime: "99.9%",
    },
    {
      id: "9002644",
      name: "CEPH-DG-HGR4-BAY-05",
      ip: "148.113.212.203",
      status: "online",
      reactor: 1,
      type: "Ceph - DG",
      uptime: "99.8%",
    },
    {
      id: "9002645",
      name: "CEPH-DG-HGR4-BAY-05-B",
      ip: "148.113.215.5",
      status: "online",
      reactor: 1,
      type: "Ceph - DG",
      uptime: "99.7%",
    },
    {
      id: "9002647",
      name: "CEPH-GP-HGR4-G2-01",
      ip: "148.113.218.177",
      status: "online",
      reactor: 1,
      type: "Ceph - GP",
      uptime: "99.9%",
    },
    {
      id: "9002648",
      name: "CEPH-GP-HGR4-G2-02",
      ip: "148.113.218.168",
      status: "online",
      reactor: 1,
      type: "Ceph - GP",
      uptime: "99.8%",
    },
    {
      id: "9002649",
      name: "CEPH-GP-HGR4-G2-03",
      ip: "148.113.218.176",
      status: "online",
      reactor: 1,
      type: "Ceph - GP",
      uptime: "99.7%",
    },
    {
      id: "300001",
      name: "CEPH-OAK-HGR3-G3-BAY-01",
      ip: "72.251.11.68",
      status: "online",
      reactor: 1,
      type: "Ceph - OAKSYSTEM",
      uptime: "99.9%",
    },
    {
      id: "300002",
      name: "CEPH-OAK-HGR3-G3-BAY-02",
      ip: "72.251.11.73",
      status: "online",
      reactor: 1,
      type: "Ceph - OAKSYSTEM",
      uptime: "99.8%",
    },
    {
      id: "300003",
      name: "CEPH-OAK-HGR3-G3-BAY-03",
      ip: "72.251.11.201",
      status: "online",
      reactor: 1,
      type: "Ceph - OAKSYSTEM",
      uptime: "99.7%",
    },
    {
      id: "600001",
      name: "CEPH-SKY-HGR-I4-G3-BAY-01",
      ip: "148.113.220.120",
      status: "online",
      reactor: 1,
      type: "Ceph - SKY",
      uptime: "99.9%",
    },
    {
      id: "600002",
      name: "CEPH-SKY-HGR-I4-G3-BAY-02",
      ip: "148.113.220.253",
      status: "online",
      reactor: 1,
      type: "Ceph - SKY",
      uptime: "99.8%",
    },
    {
      id: "600003",
      name: "CEPH-SKY-HGR-I4-G3-BAY-03",
      ip: "148.113.222.35",
      status: "online",
      reactor: 1,
      type: "Ceph - SKY",
      uptime: "99.7%",
    },
    {
      id: "600004",
      name: "CEPH-SKY-HGR-I4-G3-BAY-04",
      ip: "148.113.220.246",
      status: "online",
      reactor: 1,
      type: "Ceph - SKY",
      uptime: "99.9%",
    },
    {
      id: "600005",
      name: "CEPH-SKY-HGR-I4-G3-BAY-05",
      ip: "148.113.222.37",
      status: "online",
      reactor: 1,
      type: "Ceph - SKY",
      uptime: "99.8%",
    },
    {
      id: "378012",
      name: "HBTC-INFRA-1-ZIMBRA-CORZO",
      ip: "51.222.47.74",
      status: "online",
      reactor: 2,
      type: "Zimbra Mail",
      uptime: "99.9%",
    },
    {
      id: "482760",
      name: "BT-HGR1-G1-MONGO-GATEWAY",
      ip: "51.222.152.216",
      status: "online",
      reactor: 2,
      type: "Mail Gateway",
      uptime: "99.7%",
    },
    {
      id: "484061",
      name: "BT-HGR3-G1-MONGO-GATEWAY",
      ip: "148.113.187.42",
      status: "online",
      reactor: 2,
      type: "Mail Gateway",
      uptime: "99.6%",
    },
    {
      id: "100001",
      name: "SPAM-HBTC-VM-2001",
      ip: "54.39.125.239",
      status: "online",
      reactor: 3,
      type: "Spam Filter",
      uptime: "99.9%",
    },
    {
      id: "100002",
      name: "SPAM-HBTC-VM-2002",
      ip: "54.39.46.9",
      status: "online",
      reactor: 3,
      type: "Spam Filter",
      uptime: "99.8%",
    },
    {
      id: "100003",
      name: "SPAM-HBTC-VM-2003",
      ip: "144.217.195.234",
      status: "online",
      reactor: 3,
      type: "Spam Filter",
      uptime: "99.7%",
    },
    {
      id: "200001",
      name: "VPS-CTRLONLINE-MinSalud",
      ip: "20.246.48.58",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "200002",
      name: "VPS-CTRLONLINE-Universidad-Militar",
      ip: "20.49.8.45",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "200003",
      name: "VPS-CTRLONLINE-Bomberos-Bogota",
      ip: "172.206.18.16",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "200004",
      name: "VPS-CTRLONLINE-Grupo-SUMMA",
      ip: "40.67.136.56",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "200005",
      name: "VPS-CTRLONLINE-ARGOS",
      ip: "20.96.177.143",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "200006",
      name: "VPS-CTRLONLINE-DESUR",
      ip: "158.69.43.204",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "200007",
      name: "VPS-CTRLONLINE-FORPO",
      ip: "167.114.48.85",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "200008",
      name: "VPS-CTRLONLINE-INS",
      ip: "167.114.48.86",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "200009",
      name: "VPS-CTRLONLINE-CANCILLERIA",
      ip: "192.99.238.252",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "400001",
      name: "VPS-OAK-ip144",
      ip: "142.44.185.144",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "400002",
      name: "VPS-OAK-ip145",
      ip: "142.44.185.145",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "400003",
      name: "VPS-OAK-ip146",
      ip: "142.44.185.146",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "400004",
      name: "VPS-OAK-ip147",
      ip: "142.44.185.147",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "400005",
      name: "VPS-OAK-ip148",
      ip: "142.44.185.148",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "400006",
      name: "VPS-OAK-ip149",
      ip: "142.44.185.149",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "400007",
      name: "VPS-OAK-ip150",
      ip: "142.44.185.150",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "400008",
      name: "VPS-OAK-ip151",
      ip: "142.44.185.151",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "400009",
      name: "VPS-OAK-SVRCONTAB1-LNX-PPR-V01",
      ip: "192.99.193.229",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "400010",
      name: "VPS-OAK-SRVENCODER1-LNX-1GB",
      ip: "192.99.193.227",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "400011",
      name: "VPS-OAK-SRVENCODER2-LNX-1GB",
      ip: "192.99.193.226",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "400012",
      name: "VPS-OAK-SVR-APPPAGOS-LNX-PPR-V01",
      ip: "142.44.185.149",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "400013",
      name: "VPS-OAK-SVRPANEL-LNX-PPR-V01",
      ip: "142.44.185.146",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "400014",
      name: "VPS-OAK-SVRSTADISTICAS-LNX-PPR-V01",
      ip: "54.39.46.112",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "400015",
      name: "VPS-OAK-ubuntu24-LNX-PPR-V01",
      ip: "142.44.185.148",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "400016",
      name: "VPS-OAK-MAIN1-LNX-PPR-V01",
      ip: "72.251.12.245",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "400017",
      name: "VPS-OAK-TV1-PPR-LNX-PPR-V01",
      ip: "72.251.12.246",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "400018",
      name: "VPS-OAK-VLP1-PPR-LNX-PPR-V01",
      ip: "72.251.12.247",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "400019",
      name: "VPS-OAK-MAIN2-LNX-PPR-V01",
      ip: "72.251.12.248",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "400020",
      name: "VPS-OAK-TV2-PPR-LNX-PPR-V01",
      ip: "72.251.12.249",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "400021",
      name: "VPS-OAK-VLP2-PPR-LNX-PPR-V01",
      ip: "72.251.12.250",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "400022",
      name: "VPS-OAK-MAIN3-LNX-PPR-V01",
      ip: "72.251.12.252",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "400023",
      name: "VPS-OAK-TV3-PPR-LNX-PPR-V01",
      ip: "72.251.12.253",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.8%",
    },
    {
      id: "400024",
      name: "VPS-OAK-TV4-PPR-LNX-PPR-V01",
      ip: "51.222.150.2",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.7%",
    },
    {
      id: "400029",
      name: "VPS-OAK-META-LNX-PPR-V01",
      ip: "51.222.150.1",
      status: "online",
      reactor: 4,
      type: "VPS",
      uptime: "99.9%",
    },
    {
      id: "506748",
      name: "BARE-IBG-ADVSTO-G2-PBS-01",
      ip: "148.113.216.7",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.9%",
    },
    {
      id: "472841",
      name: "BARE-ADVSTORE-G2-PBS-01",
      ip: "148.113.169.29",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.8%",
    },
    {
      id: "489836",
      name: "BARE-IC-ADVSTOR-STOR-NG3-PBS-01",
      ip: "148.113.193.2",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.7%",
    },
    {
      id: "9002651",
      name: "BARE-HBTC-ADV-G2-PBS-01",
      ip: "158.69.168.64",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.9%",
    },
    {
      id: "446396",
      name: "BARE-SYS-SYS-1-SAT-32-PBS-BAY-1",
      ip: "192.99.36.34",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.8%",
    },
    {
      id: "414182",
      name: "BARE-PR-PBS-BAY-01",
      ip: "15.235.10.221",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.7%",
    },
    {
      id: "506757",
      name: "BARE-IN-ADVST1-G3-PBS-01",
      ip: "148.113.216.8",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.9%",
    },
    {
      id: "502741",
      name: "BARE-STK-ADVSTOR-G1-PBS-BAY-01",
      ip: "148.113.214.35",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.8%",
    },
    {
      id: "415417",
      name: "BARE-ADVSTORE-G2-PBS-01",
      ip: "15.235.12.57",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.7%",
    },
    {
      id: "9002646",
      name: "BARE-DG-HGRSTO-G2-PBS-01",
      ip: "192.99.84.56",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.9%",
    },
    {
      id: "9002650",
      name: "BARE-GP-ADVSTO-G2-PBS-01",
      ip: "72.251.5.50",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.8%",
    },
    {
      id: "481396",
      name: "BARE-EX-ADVG2-G2-PBS-01",
      ip: "148.113.170.146",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.7%",
    },
    {
      id: "506750",
      name: "BARE-CSH-ADVSTO-G3-PBS-BAY-01",
      ip: "148.113.216.4",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.9%",
    },
    {
      id: "422858",
      name: "BARE-T-ADVSTOR1-G2-PBS-01",
      ip: "15.235.12.231",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.8%",
    },
    {
      id: "437541",
      name: "BARE-ADVS1-PBS-01",
      ip: "15.235.83.54",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.7%",
    },
    {
      id: "472844",
      name: "BARE-ADVS1-PBS-02",
      ip: "148.113.169.32",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.9%",
    },
    {
      id: "490047",
      name: "BARE-PC-ADVSTOR2-G2-PBS-01",
      ip: "148.113.193.211",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.8%",
    },
    {
      id: "494697",
      name: "BARE-AG-ADVSTOR1-G2-PBS-01",
      ip: "148.113.208.27",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.7%",
    },
    {
      id: "600006",
      name: "BARE-SKY-RISESTRO-G3-BAY-01-GMR",
      ip: "141.95.85.145",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.9%",
    },
    {
      id: "473203",
      name: "BARE-HBTC-ADVSTO-G2-PBS-01",
      ip: "148.113.169.39",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.8%",
    },
    {
      id: "496833",
      name: "BARE-BT-HGR-STOR-1-PBS-01",
      ip: "148.113.208.168",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.7%",
    },
    {
      id: "494422",
      name: "BARE-RYN-ADVSTO-G2-PBS-01",
      ip: "148.113.206.140",
      status: "online",
      reactor: 4,
      type: "Proxmox Backup",
      uptime: "99.9%",
    },
    {
      id: "236186",
      name: "BARE-panel",
      ip: "192.99.33.217",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.9%",
    },
    {
      id: "493203",
      name: "BARE-SYS-SCA-I3-G3-BAY-1",
      ip: "148.113.199.219",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.8%",
    },
    {
      id: "401453",
      name: "BARE-PR-HGR3-BAY-01",
      ip: "51.222.249.84",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.7%",
    },
    {
      id: "453090",
      name: "BARE-ADV5-G2-1",
      ip: "15.235.115.179",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.9%",
    },
    {
      id: "451816",
      name: "BARE-ZE-RISE1-G2-PVE",
      ip: "148.113.159.120",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.8%",
    },
    {
      id: "422719",
      name: "BARE-S-ADVST1-G2",
      ip: "15.235.12.222",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.7%",
    },
    {
      id: "462754",
      name: "BARE-Delta",
      ip: "148.113.168.51",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.9%",
    },
    {
      id: "497296",
      name: "BARE-PRS-ADV5-G3-BAY-01",
      ip: "148.113.208.200",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.8%",
    },
    {
      id: "412703",
      name: "BARE-ADV-4-CLU",
      ip: "51.222.248.167",
      status: "online",
      reactor: 4,
      type: "Proxmox VE",
      uptime: "99.7%",
    },
    {
      id: "500013",
      name: "BARE-OAK-SRVLP-4-LNX-10GB-ip25",
      ip: "192.95.19.25",
      status: "online",
      reactor: 4,
      type: "Bare Metal",
      uptime: "99.9%",
    },
    {
      id: "425017",
      name: "BARE-OAK-TM-ADV2-G2",
      ip: "15.235.42.45",
      status: "online",
      reactor: 4,
      type: "Bare Metal",
      uptime: "99.8%",
    },
    {
      id: "453197",
      name: "BARE-OAK-TM-ADVSTOR1-G2",
      ip: "148.113.152.145",
      status: "online",
      reactor: 4,
      type: "Bare Metal",
      uptime: "99.7%",
    },
    {
      id: "314722",
      name: "BARE-HBTC-RISE1-LABHACK-HACKACADEMY",
      ip: "54.39.105.106",
      status: "online",
      reactor: 4,
      type: "Bare Metal",
      uptime: "99.9%",
    },
    {
      id: "web-titanocloud",
      name: "Titanocloud.com",
      ip: "Detectando...",
      status: "online",
      reactor: 5,
      type: "Website",
      uptime: "99.9%",
    },
    {
      id: "web-vimaferltda",
      name: "Vimaferltda.com",
      ip: "Detectando...",
      status: "online",
      reactor: 5,
      type: "Website",
      uptime: "99.8%",
    },
    {
      id: "web-controlonline",
      name: "controlonlineinternational.com",
      ip: "Detectando...",
      status: "online",
      reactor: 5,
      type: "Website",
      uptime: "99.9%",
    },
    {
      id: "web-gamechagers",
      name: "gamechagers.com.co",
      ip: "Detectando...",
      status: "online",
      reactor: 5,
      type: "Website",
      uptime: "99.7%",
    },
  ])

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (auth !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }

    const interval = setInterval(() => {
      checkHostsStatus()
    }, 60000) // 60 segundos = 1 minuto

    checkHostsStatus()

    return () => clearInterval(interval)
  }, [router])

  const checkHostsStatus = async () => {
    setHosts((prev) =>
      prev.map((host) => {
        // Simulación de ping - En producción esto debería llamar a un API endpoint
        const random = Math.random()
        let status: Host["status"]
        let uptime: string

        if (random > 0.95) {
          status = "offline"
          uptime = "0%"
        } else if (random > 0.85) {
          status = "warning"
          uptime = `${(85 + Math.random() * 10).toFixed(1)}%`
        } else {
          status = "online"
          uptime = `${(95 + Math.random() * 5).toFixed(1)}%`
        }

        return {
          ...host,
          status,
          uptime,
          lastCheck: new Date().toLocaleTimeString(),
        }
      }),
    )
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await checkHostsStatus()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleHostClick = (host: Host) => {
    router.push(`/dashboard/host-monitor/${host.id}`)
  }

  if (!isAuthenticated) {
    return null
  }

  const getStatusColor = (status: Host["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
    }
  }

  const getReactorHosts = (reactor: number) => hosts.filter((h) => h.reactor === reactor)

  const ReactorCore = ({ reactorNumber }: { reactorNumber: number }) => {
    const reactorHosts = getReactorHosts(reactorNumber)

    // Calcular anillos necesarios basado en cantidad de hosts
    const calculateRings = (hostCount: number) => {
      if (hostCount <= 1) return 1
      if (hostCount <= 7) return 2
      if (hostCount <= 19) return 3
      if (hostCount <= 37) return 4
      if (hostCount <= 61) return 5
      return 6
    }

    const rings = calculateRings(reactorHosts.length)

    // Generar posiciones dinámicamente
    const generatePositions = () => {
      const positions = [{ ring: 0, angle: 0, distance: 0 }] // Centro

      const slotsPerRing = [0, 6, 12, 18, 24, 30] // Slots por cada anillo
      const distances = [0, 50, 100, 150, 200, 250] // Distancias de cada anillo

      for (let ring = 1; ring <= rings; ring++) {
        const slots = slotsPerRing[ring]
        const distance = distances[ring]

        for (let i = 0; i < slots; i++) {
          positions.push({
            ring,
            angle: (i * (360 / slots) * Math.PI) / 180,
            distance,
          })
        }
      }

      return positions
    }

    const positions = generatePositions()
    const maxSlots = positions.length

    return (
      <div className="relative w-full aspect-square max-w-2xl mx-auto">
        {/* Círculos de fondo del reactor - dinámicos según anillos */}
        <div className="absolute inset-0 rounded-full border-4 border-purple-900/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        {rings >= 2 && (
          <div className="absolute inset-[10%] rounded-full border-4 border-green-900/20 bg-slate-800/50" />
        )}
        {rings >= 3 && (
          <div className="absolute inset-[25%] rounded-full border-4 border-blue-900/20 bg-slate-800/50" />
        )}
        {rings >= 4 && (
          <div className="absolute inset-[40%] rounded-full border-2 border-slate-700/30 bg-slate-800/50" />
        )}
        {rings >= 5 && (
          <div className="absolute inset-[50%] rounded-full border-2 border-slate-700/20 bg-slate-800/50" />
        )}
        {rings >= 6 && (
          <div className="absolute inset-[60%] rounded-full border-2 border-slate-700/10 bg-slate-800/50" />
        )}

        {/* Slots del reactor */}
        <TooltipProvider>
          {positions.map((pos, index) => {
            const host = reactorHosts[index]
            const x = 50 + (pos.distance / 300) * 40 * Math.cos(pos.angle)
            const y = 50 + (pos.distance / 300) * 40 * Math.sin(pos.angle)

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-125"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      backgroundColor: host
                        ? host.status === "online"
                          ? "#22c55e"
                          : host.status === "warning"
                            ? "#eab308"
                            : "#ef4444"
                        : "#1e293b",
                      borderColor: host
                        ? host.status === "online"
                          ? "#16a34a"
                          : host.status === "warning"
                            ? "#ca8a04"
                            : "#dc2626"
                        : "#334155",
                      boxShadow: host
                        ? `0 0 10px ${
                            host.status === "online" ? "#22c55e" : host.status === "warning" ? "#eab308" : "#ef4444"
                          }`
                        : "none",
                    }}
                    onClick={() => host && handleHostClick(host)}
                  />
                </TooltipTrigger>
                {host && (
                  <TooltipContent className="bg-slate-900 border-slate-700">
                    <div className="text-sm">
                      <p className="font-semibold text-white">{host.name}</p>
                      <p className="text-slate-400">IP: {host.ip}</p>
                      <p className="text-slate-400">Tipo: {host.type}</p>
                      <p className="text-slate-400">Uptime: {host.uptime}</p>
                      {host.lastCheck && <p className="text-slate-500 text-xs">Último check: {host.lastCheck}</p>}
                      <p
                        className={`font-semibold mt-1 ${
                          host.status === "online"
                            ? "text-green-500"
                            : host.status === "warning"
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      >
                        {host.status === "online"
                          ? "En Línea"
                          : host.status === "warning"
                            ? "Advertencia"
                            : "Fuera de Línea"}
                      </p>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            )
          })}
        </TooltipProvider>

        {/* Etiquetas del reactor */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm text-slate-400 font-semibold">
          REACTOR {reactorNumber}
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-500">
          {reactorHosts.length} / {maxSlots} slots activos
        </div>
      </div>
    )
  }

  const getReactorDescription = (reactor: number) => {
    switch (reactor) {
      case 1:
        return "El Reactor 1 muestra los clusteres de bases de datos y almacenamiento distribuido (Ceph, Storage Clusters)"
      case 2:
        return "El Reactor 2 (SOD) muestra los servidores de correo electrónico y sistemas de mensajería (Zimbra, Mail Gateways)"
      case 3:
        return "El Reactor 3 muestra los servidores de spam y gateways de seguridad anti-spam"
      case 4:
        return "El Reactor 4 muestra los servidores virtuales, VPS y sistemas de virtualización (Proxmox VE, PBS)"
      case 5:
        return "El Reactor 5 muestra las páginas web, servidores de hosting y sistemas de control (cPanel, Web Panels)"
      default:
        return ""
    }
  }

  const totalHosts = hosts.length
  const onlineHosts = hosts.filter((h) => h.status === "online").length
  const warningHosts = hosts.filter((h) => h.status === "warning").length
  const offlineHosts = hosts.filter((h) => h.status === "offline").length

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Bienvenido al Reactor</h1>
          <p className="text-slate-400">
            Sistema de monitoreo en tiempo real de infraestructura - Visualización tipo núcleo de reactor nuclear
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} className="bg-cyan-600 hover:bg-cyan-700">
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Actualizar Estado
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{totalHosts}</div>
            <div className="text-sm text-slate-400">Total Hosts</div>
          </CardContent>
        </Card>
        <Card className="bg-green-900/20 border-green-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">{onlineHosts}</div>
            <div className="text-sm text-green-300">En Línea</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-900/20 border-yellow-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">{warningHosts}</div>
            <div className="text-sm text-yellow-300">Advertencias</div>
          </CardContent>
        </Card>
        <Card className="bg-red-900/20 border-red-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-400">{offlineHosts}</div>
            <div className="text-sm text-red-300">Fuera de Línea</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reactor1" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800 mb-8">
          <TabsTrigger value="reactor1" className="data-[state=active]:bg-slate-700">
            <Database className="w-4 h-4 mr-2" />
            Reactor 1
          </TabsTrigger>
          <TabsTrigger value="reactor2" className="data-[state=active]:bg-slate-700">
            <Mail className="w-4 h-4 mr-2" />
            Reactor 2 (SOD)
          </TabsTrigger>
          <TabsTrigger value="reactor3" className="data-[state=active]:bg-slate-700">
            <Shield className="w-4 h-4 mr-2" />
            Reactor 3
          </TabsTrigger>
          <TabsTrigger value="reactor4" className="data-[state=active]:bg-slate-700">
            <Server className="w-4 h-4 mr-2" />
            Reactor 4
          </TabsTrigger>
          <TabsTrigger value="reactor5" className="data-[state=active]:bg-slate-700">
            <Globe className="w-4 h-4 mr-2" />
            Reactor 5
          </TabsTrigger>
        </TabsList>

        {[1, 2, 3, 4, 5].map((reactorNum) => (
          <TabsContent key={reactorNum} value={`reactor${reactorNum}`} className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  Reactor {reactorNum}
                  {reactorNum === 2 && " (SOD)"} - Núcleo de Monitoreo
                </CardTitle>
                <CardDescription className="text-slate-400 text-center">
                  {getReactorDescription(reactorNum)}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12">
                <ReactorCore reactorNumber={reactorNum} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
