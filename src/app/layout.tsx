"use client"

import React, { type PropsWithChildren, Suspense } from 'react'
import { Navbar } from '@modules/Navbar/Navbar'
import { ViewportProvider } from '@utils/hooks/useViewport'
import "@styles/globals.css"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <html>
            <body>
                <Suspense fallback={<div className='flex flex-col h-screen items-center justify-center mx-auto my-0'>Loading...</div>}>
                    <ViewportProvider>
                        <main className='flex relative'>
                            <div className='flex-auto'>
                                <Navbar />  
                            </div>
                            <div className=' flex flex-col w-full p-4 justify-center items-center'>
                                {children}  
                            </div>
                        </main>
                    </ViewportProvider>
                </Suspense>
            </body>
        </html>
    )

}

export default Layout