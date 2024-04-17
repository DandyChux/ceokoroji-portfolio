
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import { drizzleDB } from "~/db";
import { posts, type Post } from "~/db/schema";

export async function GET(req: NextRequest) {

    const id = req.url.slice(req.url.lastIndexOf('/') + 1)
    console.log(id)

    // const res = await drizzleDB.query.posts.findUnique({
    //     where: {
    //         id: parseInt(id)
    //     }
    // })
    const res = await drizzleDB.query.posts.findFirst({
        where: (posts, { eq }) => eq(posts.id, id)
    })

    return NextResponse.json({ data: res })

}

export async function PUT(req: NextRequest) {

    const body: Post = await req.json();
    const id = req.url.slice(req.url.lastIndexOf('/') + 1);

    const res = await drizzleDB
        .update(posts)
        .set({
            date: new Date(),
            content: body.content
        })
        .where(eq(posts.id, id))

    return NextResponse.json({ data: res })
}