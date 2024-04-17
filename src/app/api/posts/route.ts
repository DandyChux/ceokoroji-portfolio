import { NextResponse, type NextRequest } from 'next/server'
import { drizzleDB } from '~/db'

export async function GET(req: NextRequest) {
    
    // const { searchParams } = new URL(req.url)
    // const id = searchParams.get('id') as string;
    const res = await drizzleDB.query.posts.findMany()

    return NextResponse.json({ data : res })
    
}

export async function POST(req: NextRequest) {
    const { title, description, content } = await req.json()
}