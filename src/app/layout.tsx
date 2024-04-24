import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import React, { Suspense, type PropsWithChildren } from 'react'
import Alert from '~components/Alert'
import Loading from '~components/common/Loading'
import { Logo } from '~components/logo'
import Header from '~components/Navbar/Header'
import { Sidebar } from '~components/Navbar/Sidebar'
import { Providers } from '~lib/providers'
import LogoImg from '~public/Logo.png'
import "~styles/globals.css"
import { cn } from '~/lib/utils'
import { headers } from 'next/headers'

export const metadata: Metadata = {
    title: {
        default: 'Chukwuma Okoroji',
        template: '%s | Chukwuma Okoroji'
    },
    description: 'Chukwuma Okoroji is a software developer based in Tampa, FL. He specializes in building web applications with JavaScript and Python.',
    keywords: ['Next.js', 'Tailwind', 'React', 'TypeScript', 'JavaScript'],
    icons: { icon: LogoImg.src }
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1
}

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    const headersList = headers()
    const header_url = headersList.get('x-url') || ''

    return (
        <html lang='en' className='scroll-smooth' suppressHydrationWarning>
            <body className='flex flex-col xl:flex-row relative h-[100dvh]'>
                <Providers>
                    <Header />
                    <Sidebar />  
                    <Suspense 
                        fallback={<div className='relative flex flex-[1_1_70%] 3xl:flex-[1_1_80%] p-12 items-center justify-center lg:overflow-y-auto lg:h-[100dvh]'><Loading /></div>}
                    >
                        <main id="modal-container" className={cn('relative flex flex-[1_1_70%] 3xl:flex-[1_1_80%] p-12 items-center justify-center lg:overflow-y-auto lg:h-[100dvh]', {
                            'p-0': header_url.includes('contact')
                        })}>
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