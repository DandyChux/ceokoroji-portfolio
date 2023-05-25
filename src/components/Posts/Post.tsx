import React from 'react'
// import { type Post } from '@prisma/client'
// import { prisma } from '@utils/prisma'
import Link from 'next/link'
import Pill from '@components/common/Pill'
import type { Post } from 'contentlayer/generated'
// import Image from 'next/image'

const BlogCard: React.FC<Partial<Post>> = ({ title, date, tags, url, description }) => {

    
    return (
        <div className='mx-auto my-4 p-4 border-b-2 rounded-lg motion-safe:hover:scale-105 motion-safe:hover:bg-gray-100 duration-500'>
            <div className='group relative mb-4'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-red-550'>
                    <Link href={url!}>
                        <span className='absolute inset-0' />
                        {title}
                    </Link>
                </h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>{description}</p>
            </div>
            <div className='flex flex-col items-center gap-x-4 text-xs md:text-sm'>
                <time dateTime={date}>
                    {date}
                </time>
                <div className='flex'>
                    {tags?.map((tag, index) => (
                        <Pill key={index} label={tag} />
                    ))}
                </div>
            </div>
            {/* <div className='relative mt-8 flex items-center gap-x-4'>
                <div className='text-sm leading-6'>
                    <p className='font-semibold text-gray-800'>
                        <span></span>
                    </p>
                </div>
            </div> */}
        </div>
    )
}

export default BlogCard