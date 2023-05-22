import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@utils/prisma";
import { type Post } from "@prisma/client"

export async function GET(req: NextRequest) {

    const id = req.url.slice(req.url.lastIndexOf('/') + 1)
    console.log(id)

    const res = await prisma.post.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    return NextResponse.json({ data: res })

}

export async function PUT(req: NextRequest) {

    const body: Post = await req.json();
    const id = req.url.slice(req.url.lastIndexOf('/') + 1);

    const res = await prisma.post.update({
        where: {
            id: parseInt(id),
        },
        data: {
            updatedAt: new Date(),
            content: body.content
        }
    })

    return NextResponse.json({ data: res })
}