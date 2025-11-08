"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface HistoryPoint {
  ts: number
  reports: number
  status: string
}

interface CloudMonitorChartProps {
  slug: string
}

export function CloudMonitorChart({ slug }: CloudMonitorChartProps) {
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/cloud-history?slug=${slug}`)
        const history: Record<string, HistoryPoint[]> = await response.json()

        // Obtener todas las claves que corresponden a este slug
        const keys = Object.keys(history).filter((key) => key.startsWith(`${slug}_`))

        if (keys.length === 0) {
          setChartData(null)
          return
        }

        // Crear datasets para cada región
        const datasets = keys.map((key, index) => {
          const region = key.split("_").slice(1).join(".").replace("downdetector.", "")
          const points = history[key].slice(-60) // Últimos 60 puntos

          const colors = [
            "rgba(0, 180, 255, 1)",
            "rgba(255, 107, 107, 1)",
            "rgba(46, 230, 163, 1)",
            "rgba(255, 190, 66, 1)",
            "rgba(138, 99, 210, 1)",
          ]

          const color = colors[index % colors.length]

          return {
            label: region.toUpperCase(),
            data: points.map((p) => p.reports),
            borderColor: color,
            backgroundColor: color.replace("1)", "0.1)"),
            tension: 0.3,
            fill: true,
            pointRadius: 0,
            borderWidth: 2,
          }
        })

        // Usar timestamps del primer dataset para labels
        const labels = history[keys[0]]
          .slice(-60)
          .map((p) => new Date(p.ts).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }))

        setChartData({
          labels,
          datasets,
        })
      } catch (error) {
        console.error("Error fetching history:", error)
      }
    }

    fetchHistory()
    const interval = setInterval(fetchHistory, 60000) // Actualizar cada minuto

    return () => clearInterval(interval)
  }, [slug])

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#cbd5e1",
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#fff",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(6, 182, 212, 0.5)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#64748b",
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#64748b",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  }

  if (!chartData) {
    return (
      <div className="h-[200px] flex items-center justify-center text-slate-500">
        <p>Cargando histórico...</p>
      </div>
    )
  }

  return (
    <div className="h-[200px]">
      <Line data={chartData} options={options} />
    </div>
  )
}
