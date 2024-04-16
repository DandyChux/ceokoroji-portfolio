"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { cn } from '~lib/utils';

export interface INavItem extends React.HTMLAttributes<HTMLAnchorElement> {
    text: string;
    href: string;
    setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavItem: React.FC<INavItem> = ({ text, href, setSidebarOpen, className }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (e: any) => {
        e.preventDefault();
        router.push(href);
        setSidebarOpen?.(false);
    };

    return (
        <Link href={href} target='_blank' rel='noopener' key={text} onClick={handleClick} className={cn("cursor-pointer relative flex justify-center uppercase py-2 border border-transparent hover:border-border hover:rounded-md", className, {
            'border-border rounded-md before:content-["•"] before:absolute before:text-accent before:text-lg before:-top-2 before:font-bold': pathname === href,
        })} passHref>
            {text}
        </Link>
    );
}