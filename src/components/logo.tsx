"use client"

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '~lib/utils';

export const Logo: React.FC = () => {
    const pathname = usePathname();

    return (
        <div className={cn('hidden xl:flex md:flex-col absolute top-4 right-4 items-center', {
            'hidden': pathname === '/contact'
        })}>
            <Image src='/Logo.png' alt='Logo' width={100} height={100} />
        </div>
    )
}