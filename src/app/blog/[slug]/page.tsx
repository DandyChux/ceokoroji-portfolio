import React from 'react'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Button } from '@components/ui/button';
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs';
import { format, parseISO } from 'date-fns'
import { Mdx } from '@components/Posts/Mdx';
import readingTime from '@lib/reading-time';

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

    const { title, date, body } = post;

    return (
        <>
            <Link href={'/blog'} className='mr-auto self-start' passHref>
                <Button size='lg' variant={'ghost'}>
                    <BsArrowLeft size={25} />
                    Go back
                </Button>
            </Link>
            <article className='flex flex-col items-center w-full py-8 px-4 md:px-32 mx-auto self-start'>
                {/* Display markdown content */}
                <div className='mb-8 text-center flex flex-col items-center'>
                    <time dateTime={date} className='font-medium text-red-650'>{format(parseISO(date), 'LLLL d, yyyy')}</time>
                    <h1 className='font-bold text-2xl md:text-3xl'>{title}</h1>
                    <small className='inline-flex items-center font-semibold text-red-650'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        {readingTime(body.raw)}
                    </small>
                </div>

                <div className='lg:max-w-[75%]'>
                    <Mdx code={post.body.code} />
                </div>
            </article>
        </>
    )

}

export default Page