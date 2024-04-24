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
            <div className='flex flex-col h-full'>
                <h1 className='text-3xl w-full text-center md:text-[5rem] leading-normal font-extrabold'>
                    Blog
                </h1>

                <PostView searchQuery={searchQuery} />
            </div>
        )

}

export default BlogPage