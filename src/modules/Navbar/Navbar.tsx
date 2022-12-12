import Image from 'next/image';
import Logo from '@public/logo.png';
import { NavItem } from './NavItem';
import type { IconType } from 'react-icons/lib';
import { BsMailbox, BsPerson, BsChatSquareText } from 'react-icons/bs';
import { RiHome3Line } from 'react-icons/ri';
import { HiOutlineLightBulb } from 'react-icons/hi';
import React from 'react';

export const Navbar: React.FC = () => {
    const menu_links: { text:string; href:string; icon:IconType }[] = [
        { text: "Home", href: "/", icon: RiHome3Line },
        { text: "About Me", href: "/about", icon: BsPerson },
        { text: "Projects", href: "/projects", icon: HiOutlineLightBulb },
        { text: "Contact", href: "/contact", icon: BsMailbox },
        { text: "Blog", href: "/blog", icon: BsChatSquareText }
    ];

    return (
        <nav className="absolute h-full md:h-screen md:w-32 flex flex-col justify-center bg-gray-800">
            <div className="absolute top-0 mt-2.5"> 
                <Image src={Logo} alt="My logo" />
            </div>
            <div className="flex flex-col justify-center">
                {menu_links.map((link) => (
                    <div key={link.text} className="w-full flex justify-center">
                        <NavItem {...link} />
                    </div>
                ))}
            </div>
        </nav>
    )
}