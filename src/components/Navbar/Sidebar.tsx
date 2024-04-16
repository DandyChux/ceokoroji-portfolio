'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsEnvelopeAt, BsGithub, BsInstagram, BsLinkedin, BsPencil, BsPerson } from 'react-icons/bs';
import { HiOutlineLightBulb } from 'react-icons/hi';
import type { IconType } from 'react-icons/lib';
import { RiHome3Line } from 'react-icons/ri';
import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import { cn } from "~lib/utils";
import { NavItem } from './NavItem';

type MenuLink = {
    text: string;
    href: string;
    icon: IconType;
}

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    const router = useRouter();

    const menu_links: MenuLink[] = [
        { text: "Home", href: "/", icon: RiHome3Line },
        { text: "About Me", href: "/about", icon: BsPerson },
        { text: "Projects", href: "/projects", icon: HiOutlineLightBulb },
        { text: "Blog", href: "/blog", icon: BsPencil },
        { text: "Contact", href: "/contact", icon: BsEnvelopeAt}
    ];

    const social_links: MenuLink[] = [
        { text: 'LinkedIn', href: 'https://linkedin.com/in/chukwuma-okoroji/', icon: BsLinkedin },
        { text: '@DandyChux', href: 'https://github.com/dandychux/', icon: BsGithub },
        { text: '@the_ceokoroji', href: 'https://instagram.com/the_ceokoroji/', icon: BsInstagram },
    ];

    return (
        <aside className={cn("hidden xl:relative xl:flex flex-col flex-[1_1_30%] 3xl:flex-[1_1_20%] px-12 py-32 2xl:py-56 h-full fixed inset-y-0 left-0 xl:h-[100dvh] xl:w-[12rem] bg-secondary text-secondary-foreground", className)}>
            <div className="flex flex-col items-center absolute gap-4 top-32 self-center cursor-pointer" onClick={() => router.push('/')}> 
                <Avatar className="h-48 w-48">
                    <AvatarImage 
                        src="/ceokoroji_headshot.png" 
                        alt="Chukwuma Okoroji" 
                        className='scale-[3] origin-[50%_40%]' 
                        fetchPriority='high'
                    />
                    <AvatarFallback>
                        CO
                    </AvatarFallback>
                </Avatar>

                <span className="font-semibold text-xl xl:text-3xl">
                    Chukwuma Okoroji
                </span>

                <span className="tracking-wider px-10 text-center">
                    Javascript | Python | C# | Rust | React | Angular | ASP.NET | Django
                </span>
            </div>

            <nav className="flex flex-col justify-center px-10 xl:px-16 2xl:px-20 gap-8 mt-auto">
                {menu_links.map((link) => (
                    <NavItem 
                        key={link.text} 
                        {...link} 
                        className="tracking-widest"
                    />
                ))}
            </nav>
        </aside>
    )
}