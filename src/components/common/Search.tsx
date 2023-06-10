"use client"

import { useState, useEffect, useCallback, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Input } from './Input'
import { useDebounce } from '@utils/debounce'
import Loading from './Loading'

const Search = () => {
    const [searchText, setSearchText] = useState<string>('')
    const [mounted, setMounted] = useState<boolean>(false)
    const debouncedSearchText = useDebounce(searchText, 500);
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition()

    const handleSearch = useCallback((debouncedValue: string) => {
        const params = new URLSearchParams(window.location.search);
        if (debouncedValue.length > 0) {
            params.set('search', debouncedValue);
        } else {
            params.delete('search');
        }
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`)
        })
    }, [pathname, router])

    // EFFECT: Set initial params 
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get('search') ?? "";
        setSearchText(searchQuery);
    }, [])

    // EFFECT: Set mounted
    useEffect(() => {
        if (debouncedSearchText.length > 0 && !mounted) {
            setMounted(true);
        }
    }, [debouncedSearchText, mounted])

    // EFFECT: Search Params
    useEffect(() => {
        if (mounted) handleSearch(debouncedSearchText);
    }, [debouncedSearchText, handleSearch, mounted])

    return (
        <div className='relative mt-8 mb-5 flex-1'>
            <Input
                type='search'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder='Search...'
                className='text-base'
            />
            {isPending && (
                <div className='absolute top-2 right-2'>
                    <Loading />
                </div>  
            )}
        </div>
    )
}

export default Search