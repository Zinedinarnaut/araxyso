import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="py-12">
      <div className="mb-8">
        <Skeleton className="h-8 w-48 bg-purple-900/20" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 bg-black/50 border border-purple-900/20">
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3 bg-purple-900/20" />
              <Skeleton className="h-4 w-2/3 bg-purple-900/20" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-16 bg-purple-900/20" />
                <Skeleton className="h-4 w-16 bg-purple-900/20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

