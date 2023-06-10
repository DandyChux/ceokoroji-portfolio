"use client"

import React, { useEffect, useState } from 'react'
// import { prisma } from '@utils/prisma'
import { allPosts, type Post } from 'contentlayer/generated'
// import type { Metadata } from 'next';
import Head from 'next/head';
import BlogCard from '@components/Posts/Post';
import Search from '@components/common/Search';
import InfiniteScroll from '@components/common/InfiniteScroll';
import Filter from '@components/common/Filter';

// export const metadata: Metadata = {
//     title: 'Blog',
// }

const Page = async ({ 
        searchParams
    }: { 
        searchParams: { search: string }
    }) => {
        const searchQuery = searchParams?.search ?? "";
        const [filteredPosts, setFilteredPosts] = useState(allPosts.slice(0, 10))
        const [hasMore, setHasMore] = useState<boolean>(allPosts.length > 10)

        const categories = Array.from(new Set(allPosts.map(post => post.category)))
        // categories.unshift('All')
        

        const fetchMore = () => {
            const currentLength = filteredPosts.length;
            const morePosts = allPosts.slice(currentLength, currentLength + 10);
            setFilteredPosts([...filteredPosts, ...morePosts]);
            
            if (filteredPosts.length >= allPosts.length) {
                setHasMore(false);
            }
        }

        const handleFilter = (posts: Post[]) => {
            setFilteredPosts(posts.slice(0, 10));
            setHasMore(posts.length > 10);
        }
        
        // const posts = await prisma.post.findMany();
        const posts = allPosts
            .filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


        return (
            <>
                <Head>
                    <title>Blog</title>
                </Head>
                <h1 className='text-3xl w-full text-center md:text-[5rem] leading-normal font-extrabold text-gray-900'>
                    Blog
                </h1>

                <div className='flex flex-col w-full md:px-40'>
                    <Search />
                    <Filter posts={allPosts} categories={categories} onFilter={handleFilter} />

                    <InfiniteScroll 
                        data={posts}
                        fetchMore={fetchMore}
                        hasMore={hasMore}
                        loading={false}
                        renderItem={(post) => <BlogCard {...post} />}
                    />

                    {/* <ul>
                        {posts.map((post, index) => (
                            <BlogCard 
                                key={index} 
                                {...post}
                            />
                        ))}
                    </ul> */}
                </div>
                
                
            </>
        )

}

export default Page