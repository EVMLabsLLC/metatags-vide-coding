import { NextRequest, NextResponse } from 'next/server'
import { fetchMetadata } from '@/lib/fetchMetadata'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    const metadata = await fetchMetadata(url)
    return NextResponse.json(metadata)
  } catch (error) {
    console.error('Metadata fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch metadata' },
      { status: 500 }
    )
  }
} 