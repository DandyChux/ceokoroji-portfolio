import React from 'react'
// import { prisma } from '@utils/prisma'
import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next';
import BlogCard from '@components/Posts/Post';

export const metadata: Metadata = {
    title: 'Blog',
}

export default async function Blog() {
    
    // const posts = await prisma.post.findMany();
    const posts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <>
            <h1 className='text-3xl w-full text-center md:text-[5rem] leading-normal font-extrabold text-gray-900'>
                Blog
            </h1>
            
            <ul>
                {posts.map((post, index) => (
                    <BlogCard 
                        key={index} 
                        {...post}
                    />
                ))}
            </ul>
        </>
    )

}