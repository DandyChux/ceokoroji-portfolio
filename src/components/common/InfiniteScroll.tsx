"use client"

import React, { useEffect, useRef } from 'react'

interface InfiniteScrollProps {
    data: any[];
    fetchMore: () => void;
    hasMore: boolean;
    loading: boolean;
    renderItem: (item: any) => JSX.Element;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ data, fetchMore, hasMore, loading, renderItem }) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0]?.isIntersecting && hasMore) {
                fetchMore();
            }
        });

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current)
        }
    }, [loading, hasMore])

    return (
        <div className='flex flex-col space-y-4'>
            {data.map((item, index) => (
                <div key={index}>
                    {renderItem(item)}
                </div>
            ))}
            {loading && <div>Loading...</div>}
            <div ref={lastElementRef} />
        </div>
    )
}

export default InfiniteScroll