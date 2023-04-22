import React from 'react'
import { prisma } from '@server/db'

export default async function Blog() {
    const posts = await prisma.post.findMany();

    return (
        <>
            <h1 className='text-2xl md:text-[5rem] leading-normal font-extrabold text-gray-900'>
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