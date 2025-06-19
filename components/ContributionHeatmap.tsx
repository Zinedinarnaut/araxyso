"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { ContributionCalendar } from "@/types/contributions"

interface ContributionHeatmapProps {
    data: ContributionCalendar
}

export function ContributionHeatmap({ data }: ContributionHeatmapProps) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <Card className="p-6 bg-black/40 border border-purple-900/30 backdrop-blur-sm">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-purple-200 mb-2">Contribution Activity</h2>
                <p className="text-purple-200/70">
                    <span className="font-semibold text-purple-100">{data.totalContributions.toLocaleString()}</span>{" "}
                    contributions in the last year
                </p>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* Month labels */}
                    <div className="flex mb-2 ml-8">
                        {months.map((month, index) => (
                            <div key={month} className="flex-1 text-xs text-purple-200/60 text-center">
                                {index % 2 === 0 ? month : ""}
                            </div>
                        ))}
                    </div>

                    {/* Contribution grid */}
                    <div className="flex">
                        {/* Weekday labels */}
                        <div className="flex flex-col justify-between mr-2 py-1">
                            {weekdays.map((day, index) => (
                                <div key={day} className="h-3 flex items-center">
                                    <span className="text-xs text-purple-200/60 w-6">{index % 2 === 1 ? day : ""}</span>
                                </div>
                            ))}
                        </div>

                        {/* Contribution squares */}
                        <TooltipProvider>
                            <div className="flex gap-1">
                                {data.weeks.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-col gap-1">
                                        {week.contributionDays.map((day, dayIndex) => (
                                            <Tooltip key={`${weekIndex}-${dayIndex}`}>
                                                <TooltipTrigger asChild>
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                                                        className="w-3 h-3 rounded-sm cursor-pointer hover:ring-2 hover:ring-purple-400 hover:ring-opacity-50 transition-all duration-200"
                                                        style={{
                                                            backgroundColor: day.contributionCount > 0 ? "#8b5cf6" : "#1f2937",
                                                            opacity: day.contributionCount === 0 ? 0.3 : Math.min(day.contributionCount / 4, 1),
                                                        }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-zinc-900 border-purple-500/30">
                                                    <p className="text-purple-200">
                                                        <span className="font-semibold">{day.contributionCount}</span> contributions on{" "}
                                                        <span className="font-medium">{new Date(day.date).toLocaleDateString()}</span>
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </TooltipProvider>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-between mt-4 text-xs text-purple-200/60">
                        <span>Less</span>
                        <div className="flex items-center gap-1">
                            {[0, 1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className="w-3 h-3 rounded-sm"
                                    style={{
                                        backgroundColor: level === 0 ? "#1f2937" : "#8b5cf6",
                                        opacity: level === 0 ? 0.3 : level / 4,
                                    }}
                                />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}
