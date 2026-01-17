import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://www.freetogame.com/api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Build API URL with query parameters
    let apiUrl = `${BASE_URL}/filter`
    const params = new URLSearchParams()
    
    // Forward all query parameters
    searchParams.forEach((value, key) => {
      params.append(key, value)
    })
    
    if (params.toString()) {
      apiUrl += `?${params.toString()}`
    }

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'GameDiscoveryPlatform/1.0',
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to filter games' },
      { status: 500 }
    )
  }
}