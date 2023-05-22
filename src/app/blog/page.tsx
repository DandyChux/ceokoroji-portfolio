import React from 'react'
import { prisma } from '@utils/prisma'
import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next';
import BlogPost from '@components/Posts/Post';

export const metadata: Metadata = {
    title: 'Blog',
}

export default async function Blog() {
    
    // const posts = await prisma.post.findMany();
    const posts = allPosts

    return (
        <>
            <h1 className='text-3xl w-full text-center md:text-[5rem] leading-normal font-extrabold text-gray-900'>
                Blog
            </h1>
            <ul>
                {posts.map((post, index) => (
                    <BlogPost 
                        key={index} 
                        title={post.title} 
                        date={post.date} 
                        tags={post.tags} 
                        url={post.url} 
                        description={post.description} 
                    />
                ))}
            </ul>
        </>
    )

}