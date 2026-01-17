import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test connection to external API
    const response = await fetch('https://www.freetogame.com/api/games?platform=pc', {
      headers: {
        'User-Agent': 'GameDiscoveryPlatform/1.0',
      },
    })

    const isHealthy = response.ok
    
    return NextResponse.json({
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      api: {
        freetogame: isHealthy ? 'connected' : 'disconnected'
      }
    }, {
      status: isHealthy ? 200 : 503
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Failed to connect to external API',
      api: {
        freetogame: 'disconnected'
      }
    }, {
      status: 503
    })
  }
}