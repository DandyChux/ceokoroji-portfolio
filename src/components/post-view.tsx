"use client"

import { allPosts, type Post } from 'contentlayer/generated';
import { useState } from 'react';
import InfiniteScroll from '~/components/common/infinite-scroll';
import Filter from '~/components/filter';
import BlogCard from '~/components/Posts/blog-card';
import Search from '~/components/ui/search';

interface PostViewProps {
    searchQuery: string
}

export function PostView({ searchQuery }: PostViewProps) {
    if (!searchQuery) searchQuery = ''
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
    
    const posts = allPosts
        .filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return (
        <div className='flex flex-col w-full md:px-40'>
            <div className='relative flex items-center mb-4'>
                <Search />

                <Filter 
                    posts={allPosts} 
                    categories={categories} 
                    onFilter={handleFilter} 
                    className='absolute right-2 top-10'
                />
            </div>

            <InfiniteScroll 
                data={posts}
                fetchMore={fetchMore}
                hasMore={hasMore}
                loading={false}
                renderItem={(post) => <BlogCard {...post} />}
            />
        </div>
    )

}