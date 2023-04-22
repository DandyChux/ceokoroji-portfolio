import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@server/db'

export async function GET(req: NextRequest) {
    const res = await prisma.post.findMany()

    return NextResponse.json({ data : res })
}