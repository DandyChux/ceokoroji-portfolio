"use client"

import React, { MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import type { IconType } from 'react-icons/lib';
import { IconContext } from 'react-icons';
import { useViewport } from '@hooks/useViewport';

export interface INavItem {
    text: string;
    href: string;
    icon: IconType;
    setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavItem: React.FC<INavItem> = ({ text, href, icon, setSidebarOpen }) => {
    const [isShown, setIsShown] = useState(false);
    const { width } = useViewport();
    const router = useRouter();
    const pathname = usePathname();
    const Icon = icon;

    const handleClick = (e: any) => {
        e.preventDefault();
        router.push(href);
        setSidebarOpen?.(false);
    };

    return (
        <IconContext.Provider value={{ style: {padding: '10px'} }}>
            <Link href={href} target='_blank' key={text} onClick={handleClick} className="cursor-pointer relative w-full flex justify-center" passHref>
                {isShown && (
                    <div className="absolute text-red-550">
                        {text}
                    </div>
                )}
                {width > 640 && (
                    <Icon onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} className={`w-10 h-10 md:w-12 md:h-12 hover:opacity-0 hover:ease-in duration-1500 ${pathname === href ? 'text-red-300' : 'text-red-550 hover:text-white'}`} />
                )}
            </Link>
        </IconContext.Provider>
    );
}