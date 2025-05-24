import { NextResponse } from 'next/server'

const GALLERY_CDN_URL = process.env.GALLERY_CDN_URL || 'https://your-cdn-url.com'

export async function GET() {
  try {
    // Return the CDN URLs for the gallery images
    return NextResponse.json({
      orange_gsm: `${GALLERY_CDN_URL}/orange_gsm`,
      zig: `${GALLERY_CDN_URL}/zig`
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery data' }, { status: 500 })
  }
}
