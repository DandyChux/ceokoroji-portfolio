import React from 'react';
import Image from 'next/image';
import Logo from '@public/Logo.png'
import { NavItem } from './NavItem';
import type { IconType } from 'react-icons/lib';
import { BsMailbox, BsPerson, BsChatSquareText } from 'react-icons/bs';
import { RiHome3Line } from 'react-icons/ri';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
    const router = useRouter();

    const menu_links: { text:string; href:string; icon:IconType }[] = [
        { text: "Home", href: "/", icon: RiHome3Line },
        { text: "About Me", href: "/about", icon: BsPerson },
        { text: "Projects", href: "/projects", icon: HiOutlineLightBulb },

        { text: "Blog", href: "/blog", icon: BsChatSquareText }
    ];

    return (
        <nav className="h-full md:h-screen md:w-32 flex flex-col justify-center bg-gray-800 relative">
            <div className="absolute top-0 mt-2.5 w-20 h-20 self-center cursor-pointer" onClick={() => router.push('/')}> 
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image src={Logo} alt="My logo" fill />
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