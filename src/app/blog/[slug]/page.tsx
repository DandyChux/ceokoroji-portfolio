import React from 'react'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Button from '@components/common/Button';
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs';

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

export const generateMetadata = ({ params }: PageProps): Metadata => {
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
                <Button size='lg' variant={'ghost'}>
                    <BsArrowLeft size={25} />
                    Go back
                </Button>
            </Link>
            <article className='w-full py-8 px-4 mx-auto self-start'>
                {/* Link to go back */}

                {/* Display markdown content */}
                <div className='mb-8 text-center'>
                    <h1>{title}</h1>
                    <time dateTime={post.date}>{post.date}</time>
                </div>

                {JSON.stringify(post.body.raw)}
            </article>
        </>
    )

}

export default Page