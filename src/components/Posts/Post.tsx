import React from 'react'
// import { type Post } from '@prisma/client'
import { prisma } from '@utils/prisma'
import Link from 'next/link'
import Pill from '@components/common/Pill'
import type { Post } from 'contentlayer/generated'
import Image from 'next/image'

const BlogPost: React.FC<Partial<Post>> = ({ title, date, tags, url, description }) => {

    
    
    return (
        <div className=''>
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
            <div className='group relative'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-red-550'>
                    <Link href={url!}>
                        <span className='absolute inset-0' />
                        {title}
                    </Link>
                </h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>{description}</p>
            </div>
            <div className='relative mt-8 flex items-center gap-x-4'>
                {/* <Image src={} /> */}
                <div className='text-sm leading-6'>
                    <p className='font-semibold text-gray-800'>
                        <span></span>
                    </p>
                </div>
            </div>
        </div>
    )

}

export default BlogPost