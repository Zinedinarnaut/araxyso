import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="py-12">
            <div className="mb-8">
                <Skeleton className="h-8 w-48 bg-purple-900/20" />
            </div>
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-6 bg-black/50 border border-purple-900/20">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Skeleton className="h-6 w-1/3 bg-purple-900/20" />
                                <Skeleton className="h-6 w-24 bg-purple-900/20" />
                            </div>
                            <Skeleton className="h-4 w-2/3 bg-purple-900/20" />
                            <div className="grid grid-cols-2 gap-2">
                                {[1, 2, 3, 4].map((j) => (
                                    <Skeleton key={j} className="h-4 w-28 bg-purple-900/20" />
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

