'use server'

import { gamesCheats } from "@/data/cheats"
import { cheatDownloads } from "@/data/downloads"
import { generateSignedUrl } from "@/lib/download-utils"

export async function downloadCheat(id: string) {
    const cheat = gamesCheats.find(c => c.id === id)
    const download = cheatDownloads.find(d => d.cheatId === id)

    if (!cheat || !download) {
        throw new Error("Cheat not found")
    }

    const signedUrl = generateSignedUrl(cheat.id)

    return {
        url: signedUrl,
        name: cheat.name,
        fileName: download.fileName,
        fileSize: download.fileSize,
        version: download.version,
        checksum: download.checksum
    }
}

