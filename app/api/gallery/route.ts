import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Return static paths for gallery images
    return NextResponse.json({
      zig: {
        images: [
          {
            src: '/gallary/zig/zig_hoodie_design.png',
            alt: 'ZIG Hoodie Design'
          },
          {
            src: '/gallary/zig/0009.png',
            alt: 'ZIG Design 1'
          }
        ]
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery data' }, { status: 500 })
  }
}
