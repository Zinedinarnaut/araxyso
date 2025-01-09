import { sign } from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'h3o2iu4h2343ui4h23iuh423iulh4h3ui2l'

export function generateSignedUrl(cheatId: string): string {
    const token = sign({ cheatId }, SECRET_KEY, { expiresIn: '1h' })
    return `/api/download?token=${token}`
}

