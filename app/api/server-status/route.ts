import { NextResponse } from 'next/server'

// This would typically be in a separate file or environment variable
const SERVICES = [
    { name: 'Personal Website', url: 'https://araxyso.nanod.cloud' },
    { name: 'Host Panel', url: 'https://harc6r.easypanel.host' },
    { name: 'Shiroko', url: 'https://shiroko.co' },
    { name: 'CDN(Coming Soon)', url: 'https://harc6r.easypanel.host' },
    { name: 'Image Proxy', url: 'https://testing-img-proxy.harc6r.easypanel.host/' },
    { name: 'N:ZA', url: 'https://testing-n-za.harc6r.easypanel.host/' },
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
        SERVICES.map(async (service) => {
            const status = await checkServiceStatus(service.url)
            return {
                ...service,
                ...status,
            }
        })
    )

    return NextResponse.json(results)
}

