import { NextResponse } from "next/server"

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refresh_token!,
        }),
    })

    return response.json()
}

const getNowPlaying = async () => {
    const { access_token } = await getAccessToken()

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

export async function GET() {
    try {
        const response = await getNowPlaying()

        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({ isPlaying: false })
        }

        const song = await response.json()

        if (!song.item) {
            return NextResponse.json({ isPlaying: false })
        }

        const isPlaying = song.is_playing
        const title = song.item.name
        const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ")
        const album = song.item.album.name
        const albumImageUrl = song.item.album.images[0]?.url
        const songUrl = song.item.external_urls.spotify

        // Extract track ID from the Spotify URI or external URL
        const trackId = song.item.id || song.item.uri?.split(":")[2] || songUrl?.split("/").pop()?.split("?")[0]

        // console.log("🎵 Spotify track data:", {
        //     title,
        //     artist,
        //     trackId,
        //     isPlaying,
        // })

        return NextResponse.json({
            album,
            albumImageUrl,
            artist,
            isPlaying,
            songUrl,
            title,
            trackId, // Now includes the track ID
        })
    } catch (error) {
        console.error("Error fetching Spotify data:", error)
        return NextResponse.json({ isPlaying: false })
    }
}
