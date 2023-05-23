import React from 'react'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Button from '@components/common/Button';
import Link from 'next/link'

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

export const generateStaticParams = () => {
    return allPosts.map((post) => ({
        slug: post.slugAsParams
    }))
}

export const generateMetadata = (props: PageProps): Metadata => {
    const { params } = props;

    const post = allPosts.find((post) => post.slugAsParams === params.slug)

    if (!post) notFound()

    return {
        title: post.title,
        description: post.description
    }
}

const Page = async ({ params }: PageProps) => {
    // const router = useRouter();
    const post = await getPostFromParams(params.slug)

    const { title, date } = post;

    return (
        <>
            <Link href={'/blog'} className='mr-auto self-start' passHref>
                <Button size='lg' variant={'ghost'}>Go back</Button>
            </Link>
            <article className='w-full text-center'>
                {/* Link to go back */}

                {/* Display markdown content */}
                <div>
                    <h1>{title}</h1>
                    <time dateTime={post.date}>{post.date}</time>
                </div>

                {JSON.stringify(post.body.raw)}
            </article>
        </>
    )

}

export default Page