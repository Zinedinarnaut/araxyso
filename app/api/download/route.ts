import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import { cheatDownloads } from '@/data/downloads'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token')

    if (!token) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const decoded = verify(token, SECRET_KEY) as { cheatId: string }
        const download = cheatDownloads.find(d => d.cheatId === decoded.cheatId)

        if (!download) {
            return new NextResponse('Download not found', { status: 404 })
        }

        // Redirect to the actual file URL
        return NextResponse.redirect(download.downloadUrl)
    } catch (error) {
        console.error('Token verification failed:', error)
        return new NextResponse('Invalid token', { status: 401 })
    }
}

