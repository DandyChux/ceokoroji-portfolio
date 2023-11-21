"use client"

import React, { type PropsWithChildren, useState } from 'react'
import { ViewportProvider } from '@hooks/useViewport'
import { AlertProvider } from '@contexts/AlertContext'
import { AppProvider } from '@contexts/AppContext'
import { ModalProvider } from '@contexts/ModalContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient({}))

    return (
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                <ViewportProvider>
                    <AlertProvider>
                        <ModalProvider>
                            {children}
                        </ModalProvider>
                    </AlertProvider>
                </ViewportProvider>
            </AppProvider>
        </QueryClientProvider>
    )
}