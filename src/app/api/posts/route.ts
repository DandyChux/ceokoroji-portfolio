import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@server/db'

export async function GET(req: NextRequest) {
    
    // const { searchParams } = new URL(req.url)
    // const id = searchParams.get('id') as string;
    const res = await prisma.post.findMany()

    return NextResponse.json({ data : res })
    
}