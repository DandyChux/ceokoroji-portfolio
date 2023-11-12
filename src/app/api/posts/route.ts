import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@utils/prisma'

export async function GET(req: NextRequest) {
    
    // const { searchParams } = new URL(req.url)
    // const id = searchParams.get('id') as string;
    const res = await prisma.post.findMany()

    return NextResponse.json({ data : res })
    
}

export async function POST(req: NextRequest) {
    const { title, description, content } = await req.json()
}