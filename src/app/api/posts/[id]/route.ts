import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@server/db";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {

    const slug = params.slug;

    const res = await prisma.post.findUnique({
        where: {
            id: parseInt(slug)
        }
    })

    return NextResponse.json({ data: res })

}