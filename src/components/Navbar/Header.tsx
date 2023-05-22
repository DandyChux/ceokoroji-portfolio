'use client'

import React from 'react'
import useAppContext from '@utils/hooks/useAppContext'
import Logo from '@public/Logo.png'
import Image from 'next/image'
import { BsChatSquareText, BsGithub, BsInstagram, BsLinkedin, BsPerson } from 'react-icons/bs'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { RiHome3Line } from 'react-icons/ri'
import type { IconType } from 'react-icons'
import Link from 'next/link'

type MenuLink = {
    text: string;
    href: string;
    icon: IconType;
}

const Header: React.FC = () => {
    const { toggleSidebar, isSidebarOpen } = useAppContext();

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
        <header className='sticky top-0 flex flex-wrap w-full items-center justify-between p-4 bg-gray-800 bg-opacity-100 z-50 md:hidden'>
            <button onClick={toggleSidebar} className='md:hidden top-0 left-0 mt-2.5 ml-2.5 mb-2.5 z-10'>
                <svg
                    className={`fill-white h-5 w-5 ${isSidebarOpen ? "hidden" : "block"}`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
                <svg
                    className={`fill-white h-5 w-5 ${isSidebarOpen ? "block" : "hidden"}`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
            </button>

            <Image src={Logo} alt={'Logo'} height={60} width={60} className='mx-auto my-0' />

            <div className={`${isSidebarOpen ? 'flex' : 'hidden'} flex-col w-full`}>
                <menu className="flex flex-col items-center my-8 text-white">
                    {menu_links.map((link, index) => (
                        <Link key={index} href={link.href} onClick={toggleSidebar} className='text-lg'>{link.text}</Link>
                    ))}
                </menu>

                <hr className='mb-4' />

                <menu className='flex justify-center my-2 gap-4'>
                    {social_links.map((link, index) => (
                        <Link key={index} target='_blank' href={link.href} passHref>
                            <link.icon size={30} color='#d90429' />
                        </Link>
                    ))}
                </menu>
            </div>
        </header>
    )
}

export default Header