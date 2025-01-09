'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ServerStatusRefresh() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleRefresh = async () => {
        setLoading(true)
        router.refresh()
        setTimeout(() => setLoading(false), 1000) // Simulate a delay
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className="bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-500/50 text-purple-200"
            onClick={handleRefresh}
            disabled={loading}
        >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
        </Button>
    )
}

