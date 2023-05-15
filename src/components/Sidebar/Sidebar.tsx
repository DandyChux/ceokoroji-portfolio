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
import MobileSidebar from './MobileSidebar';

type MenuLink = {
    text: string;
    href: string;
    icon: IconType;
}

export const Navbar: React.FC = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const router = useRouter();

    const menu_links: MenuLink[] = [
        { text: "About", href: "/", icon: RiHome3Line },
        { text: "About Me", href: "/about", icon: BsPerson },
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
            <nav className="hidden md:flex flex-col fixed top-0 left-0 h-full md:h-screen md:w-32 justify-center bg-gray-800">
                <div className="absolute top-0 mt-2.5 w-20 h-20 self-center cursor-pointer" onClick={() => router.push('/')}> 
                    <Image src={Logo} alt="My logo" fill />
                </div>

                <menu className="flex flex-col justify-center">
                    {menu_links.map((link) => (
                        <div key={link.text} className="w-full flex justify-center">
                            <NavItem {...link} />
                        </div>
                    ))}
                </menu>

                <menu className='flex flex-col absolute bottom-8 self-center justify-center'>
                    {social_links.map((link) => (
                        <div key={link.text} className="w-full flex justify-center">
                            <NavItem {...link} />
                        </div>
                    ))}
                </menu>
            </nav>

            <div className='relative mx-4 w-auto'>
                <button onClick={() => setIsMobileSidebarOpen(true)} className="md:hidden fixed top-0 left-0 mt-2.5 ml-2.5 z-50">
                    <FiMenu size={30} color="#1f2937" />
                </button>
            </div>

            <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
        </>
    )
}