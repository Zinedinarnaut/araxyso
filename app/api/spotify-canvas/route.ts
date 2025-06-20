import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const trackId = searchParams.get("trackId")

    console.log("🎬 Canvas API called with trackId:", trackId)

    if (!trackId) {
        console.log("🎬 No track ID provided")
        return NextResponse.json({ error: "Track ID is required" }, { status: 400 })
    }

    try {
        console.log("🎬 Fetching from self-hosted Canvas API...")
        const response = await fetch(`https://spotify-eight-gules.vercel.app/api/canvas?trackId=${trackId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        console.log("🎬 Self-hosted Canvas API response status:", response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.log("🎬 Self-hosted Canvas API error:", errorText)
            throw new Error(`Canvas API responded with status: ${response.status}`)
        }

        const data = await response.json()
        console.log("🎬 Raw Canvas data received:", data)

        // Fix: Your API returns { "canvasesList": [...] } directly, not nested under "data"
        if (data.canvasesList && data.canvasesList.length > 0) {
            const canvas = data.canvasesList[0]
            const transformedData = {
                canvas_url: canvas.canvasUrl,
                canvas_type: "video",
                artist: canvas.artist,
                trackUri: canvas.trackUri,
                canvasUri: canvas.canvasUri,
                id: canvas.id,
            }
            console.log("🎬 Transformed Canvas data:", transformedData)
            return NextResponse.json(transformedData)
        } else {
            console.log("🎬 No Canvas found for this track")
            return NextResponse.json({ error: "No Canvas found for this track" }, { status: 404 })
        }
    } catch (error) {
        console.error("🎬 Error fetching Canvas:", error)
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
        return NextResponse.json({ error: "Failed to fetch Canvas", details: errorMessage }, { status: 500 })
    }
}
