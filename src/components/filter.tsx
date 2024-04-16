"use client"

import { FunnelIcon } from '@heroicons/react/24/outline'
import type { Post } from 'contentlayer/generated'
import React, { useState } from 'react'
import { cn } from '~/lib/utils'
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuRadioGroup,
    DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger
} from './ui/dropdown-menu'

interface FilterProps {
    posts: Post[];
    categories: string[];
    onFilter: (filteredPosts: Post[]) => void;
    className?: string;
}

const Filter: React.FC<FilterProps> = ({ posts, categories, onFilter, className }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const handleFilterChange = (value: string) => {
        setSelectedCategory(value);

        if (value === 'All') {
            onFilter(posts);
        } else {
            const filteredPosts = posts.filter(post => post.category === value);
            onFilter(filteredPosts);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={cn('hover:cursor-pointer', className)}>
                <FunnelIcon className='w-5 h-5 mr-2 hover:cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedCategory} onValueChange={(value: string) => handleFilterChange(value)}>
                    <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                    {categories.map((category, index) => (
                        <DropdownMenuRadioItem key={index} value={category}>{category}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Filter