import React from 'react'
// import { type Post } from '@prisma/client'
// import { prisma } from '~lib/prisma'
import type { Post } from 'contentlayer/generated'
import Link from 'next/link'
import Pill from '~components/common/Pill'
// import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import readingTime from '~lib/reading-time'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

const BlogCard: React.FC<Partial<Post>> = ({ title, date, tags, url, description, body }) => {

    
    return (
        <Card className='relative mx-auto my-4 p-4 border-b-2 max-w-[31.25rem] rounded-lg bg-card motion-safe:hover:scale-105 motion-safe:hover:bg-secondary duration-500'>
            <CardHeader className='group mb-4'>
                <CardTitle className='mt-3 text-lg font-semibold leading-6 group-hover:text-accent'>
                    <Link href={url!}>
                        <span className='absolute inset-0' />
                        {title}
                    </Link>
                </CardTitle>
                <CardDescription className='mt-5 line-clamp-3 text-sm leading-6 text-muted'>{description}</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col items-center gap-x-4 text-xs md:text-sm'>
                <time dateTime={date} className='font-medium mb-2'>
                    {format(parseISO(date!), 'LLLL d, yyyy')}
                </time>
                <div className='flex flex-wrap'>
                    {tags?.map((tag, index) => (
                        <Pill key={index} label={tag} />
                    ))}
                </div>
            </CardContent>
            <CardFooter className='relative mt-8 flex items-center gap-x-4'>
                <div className='text-sm leading-6'>
                    <span className='inline-flex items-center font-semibold'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {readingTime(body!.raw)}
                    </span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default BlogCard