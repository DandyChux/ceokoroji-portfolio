import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import React, { Suspense, type PropsWithChildren } from 'react'
import Alert from '~components/Alert'
import Loading from '~components/common/Loading'
import { Logo } from '~components/logo'
import Header from '~components/Navbar/Header'
import { Sidebar } from '~components/Navbar/Sidebar'
import { Providers } from '~lib/providers'
import LogoImg from '~public/Logo.png'
import "~styles/globals.css"

export const metadata: Metadata = {
    title: {
        default: 'Chukwuma Okoroji',
        template: '%s | Chukwuma Okoroji'
    },
    viewport: {
        width: 'device-width',
        initialScale: 1
    },
    description: 'Chukwuma Okoroji is a software developer based in Tampa, FL. He specializes in building web applications with JavaScript and Python.',
    keywords: ['Next.js', 'Tailwind', 'React', 'TypeScript', 'JavaScript'],
    icons: { icon: LogoImg.src }
}

const Layout: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <html>
            <body className='flex flex-col xl:flex-row relative h-[100dvh]'>
                <Providers>
                    <Header />
                    <Sidebar />  
                    <Suspense 
                        fallback={<div className='relative flex flex-[1_1_70%] 3xl:flex-[1_1_80%] p-12 items-center justify-center lg:overflow-y-auto lg:h-[100dvh]'><Loading /></div>}
                    >
                        <main id="modal-container" className='relative flex flex-[1_1_70%] 3xl:flex-[1_1_80%] p-12 items-center justify-center lg:overflow-y-auto lg:h-[100dvh]'>
                            {children}
                            <Alert /> 
                            <Logo />
                        </main>
                    </Suspense>
                </Providers>
                <Analytics />
            </body>
        </html>
    )

}

export default Layout