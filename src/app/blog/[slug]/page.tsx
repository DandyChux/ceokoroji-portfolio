import React from 'react'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation';

interface PageProps {
    params: {
        slug: string;
    }
}

async function getPostFromParams(slug: string) {
    const post = allPosts.find((post) => post.slugAsParams === slug)

    if (!post) notFound()
    
    return post
}

const Page = async ({ params }: PageProps) => {
    const post = await getPostFromParams(params.slug)

    return (
        <>
            <div>
                {JSON.stringify(post.body.raw)}
            </div>
        </>
    )

}

export default Page