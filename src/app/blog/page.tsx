import type { Metadata } from 'next';
import { PostView } from '~/components/post-view';

export const metadata: Metadata = {
    title: 'Blog',
}

const BlogPage = async ({ 
        searchParams
    }: { 
        searchParams: { search: string }
    }) => {
        const searchQuery = searchParams?.search ?? "";

        return (
            <div className='relative flex flex-col h-full'>
                <h1 className='text-3xl w-full text-center md:text-[5rem] leading-normal font-extrabold'>
                    Blog
                </h1>

                <PostView searchQuery={searchQuery} />

                {/* Cricle vectors */}
                <div
                    className='fixed left-0 -translate-x-14 2xl:translate-x-[25.5rem] top-64 2xl:top-[45rem] w-24 h-24 bg-transparent rounded-full border-2 border-accent/80'
                />
                <div
                    className='fixed right-0 translate-x-14 2xl:translate-x-12 top-24 2xl:top-52 w-24 h-24 bg-transparent rounded-full border-2 border-accent/80'
                />
            </div>
        )

}

export default BlogPage