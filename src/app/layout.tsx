import React, { type PropsWithChildren, Suspense } from 'react'
import { Sidebar } from '@components/Navbar/Sidebar'
import { ViewportProvider } from '@hooks/useViewport'
import { AlertProvider } from '@contexts/AlertContext'
import { AppProvider } from '@contexts/AppContext'
import Alert from '@components/Alert'
import Header from '@components/Navbar/Header'
import type { Metadata } from 'next'
import "@styles/globals.css"
import Logo from '@public/Logo.png'

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
                <Suspense fallback={<div className='flex flex-col h-screen items-center justify-center mx-auto my-0'>Loading...</div>}>
                    <AppProvider>
                        <ViewportProvider>
                            <AlertProvider>
                                <main className='flex flex-col md:flex-nowrap relative h-screen'>
                                    <Header />
                                    <Sidebar />  
                                    <div className='relative flex flex-wrap z-10 md:w-[calc(100vw-8rem)] md:left-[8rem] p-4 items-center justify-center  md:overflow-y-auto md:h-screen'>
                                        {children}
                                        <Alert /> 
                                    </div>
                                </main>
                            </AlertProvider>
                        </ViewportProvider>
                    </AppProvider>
                </Suspense>
            </body>
        </html>
    )

}

export default Layout