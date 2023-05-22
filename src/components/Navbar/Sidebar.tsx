'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '@public/Logo.png'
import { NavItem } from './NavItem';
import type { IconType } from 'react-icons/lib';
import { BsPerson, BsChatSquareText, BsGithub, BsLinkedin, BsInstagram } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi'
import { RiHome3Line } from 'react-icons/ri';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { useViewport } from '@utils/hooks/useViewport';
import useAppContext from '@utils/hooks/useAppContext';
import Link from 'next/link';

type MenuLink = {
    text: string;
    href: string;
    icon: IconType;
}

export const Sidebar: React.FC = () => {
    const { isSidebarOpen, toggleSidebar } = useAppContext();
    const { width } = useViewport();
    const router = useRouter();

    const menu_links: MenuLink[] = [
        { text: "Home", href: "/", icon: RiHome3Line },
        { text: "About", href: "/about", icon: BsPerson },
        { text: "Projects", href: "/projects", icon: HiOutlineLightBulb },
        { text: "Blog", href: "/blog", icon: BsChatSquareText }
    ];

    const social_links: MenuLink[] = [
        { text: 'LinkedIn', href: 'https://linkedin.com/in/chukwuma-okoroji/', icon: BsLinkedin },
        { text: '@DandyChux', href: 'https://github.com/dandychux/', icon: BsGithub },
        { text: '@the_ceokoroji', href: 'https://instagram.com/the_ceokoroji/', icon: BsInstagram },
    ];

    return (
        <>
            <div className="hidden flex-auto md:flex flex-col h-full fixed top-0 left-0 md:h-screen md:w-[8rem] justify-center bg-gray-800 z-50">
                <div className="hidden md:block absolute top-0 mt-2.5 w-20 h-20 self-center cursor-pointer" onClick={() => router.push('/')}> 
                    <Image src={Logo} alt="My logo" fill />
                </div>

                <nav className="flex flex-col justify-center">
                    {menu_links.map((link) => (
                        <div key={link.text} className="w-full flex justify-center">
                            <NavItem {...link} />
                        </div>
                    ))}
                </nav>

                <nav className='flex flex-col absolute bottom-8 self-center justify-center'>
                    {social_links.map((link) => (
                        <div key={link.text} className="w-full flex justify-center">
                            <NavItem {...link} />
                        </div>
                    ))}
                </nav>
            </div>
        </>
    )
}