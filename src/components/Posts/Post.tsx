import React from 'react'
// import { type Post } from '@prisma/client'
// import { prisma } from '@utils/prisma'
import Link from 'next/link'
import Pill from '@components/common/Pill'
import type { Post } from 'contentlayer/generated'
// import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import readingTime from '@utils/reading-time'

const BlogCard: React.FC<Partial<Post>> = ({ title, date, tags, url, description, body }) => {

    
    return (
        <div className='mx-auto my-4 p-4 border-b-2 max-w-[31.25rem] rounded-lg motion-safe:hover:scale-105 motion-safe:hover:bg-gray-100 duration-500'>
            <div className='group relative mb-4'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-red-650'>
                    <Link href={url!}>
                        <span className='absolute inset-0' />
                        {title}
                    </Link>
                </h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>{description}</p>
            </div>
            <div className='flex flex-col items-center gap-x-4 text-xs md:text-sm'>
                <time dateTime={date} className='font-medium mb-2 text-red-650'>
                    {format(parseISO(date!), 'LLLL d, yyyy')}
                </time>
                <div className='flex flex-wrap'>
                    {tags?.map((tag, index) => (
                        <Pill key={index} label={tag} />
                    ))}
                </div>
            </div>
            <div className='relative mt-8 flex items-center gap-x-4'>
                <div className='text-sm leading-6'>
                    <span className='inline-flex items-center font-semibold text-red-650'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {readingTime(body!.raw)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default BlogCard