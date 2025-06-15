"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { cn } from "@/lib/utils"

interface ChartData {
    type: "pie" | "bar" | "line" | "doughnut"
    title: string
    data: {
        labels: string[]
        datasets: {
            label?: string
            data: number[]
            backgroundColor: string | string[]
            borderColor?: string | string[]
            borderWidth?: number
        }[]
    }
}

interface ChartWidgetProps {
    chartData: ChartData
    className?: string
}

export function ChartWidget({ chartData, className }: ChartWidgetProps) {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)

    useEffect(() => {
        if (!chartRef.current) return

        // Destroy previous chart if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy()
        }

        const ctx = chartRef.current.getContext("2d")
        if (!ctx) return

        // Create chart with cyberpunk theme
        chartInstance.current = new Chart(ctx, {
            type: chartData.type,
            data: chartData.data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: "rgba(216, 180, 254, 0.9)", // purple-200/90
                            font: {
                                family: "'Inter', sans-serif",
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: chartData.title,
                        color: "rgba(216, 180, 254, 0.9)", // purple-200/90
                        font: {
                            family: "'Inter', sans-serif",
                            size: 16,
                            weight: "bold",
                        },
                    },
                },
                scales:
                    chartData.type === "bar" || chartData.type === "line"
                        ? {
                            x: {
                                ticks: {
                                    color: "rgba(216, 180, 254, 0.7)",
                                },
                                grid: {
                                    color: "rgba(168, 85, 247, 0.1)", // purple-500/10
                                },
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: "rgba(216, 180, 254, 0.7)",
                                },
                                grid: {
                                    color: "rgba(168, 85, 247, 0.1)", // purple-500/10
                                },
                            },
                        }
                        : undefined,
            },
        })

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, [chartData])

    return (
        <div className={cn("rounded-lg overflow-hidden bg-zinc-900/50 border border-purple-500/30", className)}>
            <div className="p-4 bg-zinc-800/50 border-b border-purple-500/20">
                <h4 className="text-sm font-medium text-purple-300">{chartData.title}</h4>
            </div>
            <div className="p-4 h-[300px]">
                <canvas ref={chartRef} />
            </div>
        </div>
    )
}
