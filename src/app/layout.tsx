import React, { type PropsWithChildren, Suspense } from 'react'
import { Sidebar } from '@components/Navbar/Sidebar'
import Alert from '@components/Alert'
import Header from '@components/Navbar/Header'
import type { Metadata } from 'next'
import "@styles/globals.css"
import Logo from '@public/Logo.png'
import { Analytics } from '@vercel/analytics/react'
import { Providers } from '@lib/providers'
import Loading from '@components/common/Loading'

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
    icons: { icon: Logo.src }
}

const Layout: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <html>
            <body>
                <Providers>
                    <main className='flex flex-col md:flex-nowrap relative h-screen'>
                        <Header />
                        <Sidebar />  
                        <Suspense fallback={<div className='flex flex-col h-screen items-center justify-center mx-auto my-0'><Loading /></div>}>
                            <div id="modal-container" className='relative flex flex-wrap z-10 md:w-[calc(100vw-8rem)] md:left-[8rem] p-4 items-center justify-center  md:overflow-y-auto md:h-screen'>
                                {children}
                                <Alert /> 
                            </div>
                        </Suspense>
                    </main>
                </Providers>
                <Analytics />
            </body>
        </html>
    )

}

export default Layout