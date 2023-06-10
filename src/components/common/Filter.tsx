"use client"

import React, { useState } from 'react'
import type { Post } from 'contentlayer/generated'
import { Select } from './Select'

interface FilterProps {
    posts: Post[];
    categories: string[];
    onFilter: (filteredPosts: Post[]) => void;
}

const Filter: React.FC<FilterProps> = ({ posts, categories, onFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target

        setSelectedCategory(value);

        if (value === 'All') {
            onFilter(posts);
        } else {
            const filteredPosts = posts.filter(post => post.category === value);
            onFilter(filteredPosts);
        }
    }

    return (
        <div className='flex justify-center md:justify-start'>
            <label htmlFor="filter" className='mr-2 font-medium text-gray-800'>Category: </label>
            <Select id="filter" value={selectedCategory} onChange={handleFilterChange}>
                <option value="All">All</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </Select>
        </div>
    )
}

export default Filter