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

const REGION_COLORS = {
  com: {
    border: "rgba(34, 197, 94, 0.9)", // Verde suave
    bg: "rgba(34, 197, 94, 0.12)",
    label: "Global (.com)",
  },
  mx: {
    border: "rgba(59, 130, 246, 0.9)", // Azul suave
    bg: "rgba(59, 130, 246, 0.12)",
    label: "México (.mx)",
  },
  pe: {
    border: "rgba(168, 85, 247, 0.9)", // Púrpura suave
    bg: "rgba(168, 85, 247, 0.12)",
    label: "Perú (.pe)",
  },
  ca: {
    border: "rgba(251, 191, 36, 0.9)", // Amarillo dorado
    bg: "rgba(251, 191, 36, 0.12)",
    label: "Canadá (.ca)",
  },
  "com.co": {
    border: "rgba(236, 72, 153, 0.9)", // Rosa suave
    bg: "rgba(236, 72, 153, 0.12)",
    label: "Colombia (.co)",
  },
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

        const datasets = keys.map((key) => {
          const domain = key.split("_").slice(1).join("_").replace("downdetector.", "")
          const points = history[key].slice(-60) // Últimos 60 puntos

          const regionKey = domain as keyof typeof REGION_COLORS
          const colors = REGION_COLORS[regionKey] || {
            border: "rgba(148, 163, 184, 0.9)",
            bg: "rgba(148, 163, 184, 0.12)",
            label: domain.toUpperCase(),
          }

          return {
            label: colors.label,
            data: points.map((p) => p.reports),
            borderColor: colors.border,
            backgroundColor: colors.bg,
            tension: 0.4, // Líneas más suaves y curvas
            fill: false, // Sin relleno debajo para líneas más limpias
            pointRadius: 0, // Sin puntos para líneas delicadas
            pointHoverRadius: 6, // Puntos visibles al hacer hover
            pointHoverBackgroundColor: colors.border,
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
            borderWidth: 2.5, // Líneas más definidas pero delicadas
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
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          color: "#cbd5e1",
          font: {
            size: 12,
            weight: "500",
            family: "'Inter', sans-serif",
          },
          padding: 15,
          usePointStyle: true, // Usar puntos en lugar de rectángulos
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#fff",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(6, 182, 212, 0.4)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 13,
          weight: "600",
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue} reportes`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#64748b",
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(148, 163, 184, 0.08)", // Grid más sutil
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#64748b",
          font: {
            size: 11,
          },
          padding: 8,
        },
        grid: {
          color: "rgba(148, 163, 184, 0.08)", // Grid más sutil
          drawTicks: false,
        },
        border: {
          display: false,
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
      <div className="h-[240px] flex items-center justify-center text-slate-500">
        <p className="text-sm">Cargando histórico...</p>
      </div>
    )
  }

  return (
    <div className="h-[240px]">
      <Line data={chartData} options={options} />
    </div>
  )
}
