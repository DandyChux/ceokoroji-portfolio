import React from 'react'
// import { type Post } from '@prisma/client'
import { prisma } from '@utils/prisma'
import Link from 'next/link'
import Pill from '@components/common/Pill'
import type { Post } from 'contentlayer/generated'

const BlogPost: React.FC<Partial<Post>> = ({ title, date, tags, url, description }) => {

    
    
    return (
        <div>
            <div className='flex flex-col items-center gap-y-4 text-xs md:text-sm'>
                <time dateTime={date}>
                    {date}
                </time>
                {tags?.map((tag, index) => (
                    <Pill key={index} label={tag} />
                ))}
            </div>
            <div className='group relative'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                    <Link href={url!}>
                        <span className='absolute inset-0' />
                        {title}
                    </Link>
                </h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>{description}</p>
            </div>
        </div>
    )

}

export default BlogPost