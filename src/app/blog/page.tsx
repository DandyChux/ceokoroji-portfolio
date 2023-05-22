import React from 'react'
import { prisma } from '@utils/prisma'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog',
}

export default async function Blog() {
    
    const posts = await prisma.post.findMany();

    return (
        <>
            <h1 className='text-3xl w-full text-center md:text-[5rem] leading-normal font-extrabold text-gray-900'>
                Blog
            </h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </>
    )

}