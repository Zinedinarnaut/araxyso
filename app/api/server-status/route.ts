import { NextResponse } from 'next/server'

// This would typically be in a separate file or environment variable
const SERVICES = [
    {
        category: 'Websites',
        services: [
            { name: 'Personal Website', url: 'https://araxyso.nanod.cloud' },
            { name: 'Shiroko', url: 'https://shiroko.co' },
        ]
    },
    {
        category: 'VPS',
        services: [
            { name: 'Host Panel', url: 'https://v4sq52.easypanel.host' },
            { name: 'Game Panel', url: 'https://nanite-panel.v4sq52.easypanel.host' },
        ]
    },
    {
        category: 'Services',
        services: [
            { name: 'CDN (Coming Soon)', url: 'https://v4sq52.easypanel.host' },
            { name: 'Image Proxy', url: 'https://v4sq52.easypanel.host' },
            { name: 'N:ZA', url: 'https://v4sq52.easypanel.host' },
        ]
    }
]

async function checkServiceStatus(url: string) {
    try {
        const startTime = Date.now()
        const response = await fetch(url, { method: 'HEAD' })
        const endTime = Date.now()
        const latency = endTime - startTime

        return {
            status: response.ok ? 'online' : 'offline',
            statusCode: response.status,
            latency: `${latency}ms`,
        }
    } catch (error) {
        console.error(error)
        return {
            status: 'offline',
            statusCode: 0,
            latency: 'N/A',
        }
    }
}

export async function GET() {
    const results = await Promise.all(
        SERVICES.map(async (category) => ({
            category: category.category,
            services: await Promise.all(
                category.services.map(async (service) => {
                    const status = await checkServiceStatus(service.url)
                    return {
                        ...service,
                        ...status,
                    }
                })
            )
        }))
    )

    return NextResponse.json(results)
}
