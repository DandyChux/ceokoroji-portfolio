import React, { useState } from 'react';
import { NavItem } from './NavItem';
import { FiX } from 'react-icons/fi';
import { BsChatSquareText, BsGithub, BsInstagram, BsLinkedin, BsPerson } from 'react-icons/bs';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { RiHome3Line } from 'react-icons/ri';
import type { IconType } from 'react-icons';

type MobileSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
}

type MenuLink = {
    text: string;
    href: string;
    icon: IconType;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

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
        <div className="fixed z-50 top-0 left-0 h-screen w-screen bg-gray-800 p-5">
            <button onClick={onClose} className="text-red-550 mb-5">
                <FiX size={30} />
            </button>

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
        </div>
    )
}

export default MobileSidebar;