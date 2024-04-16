"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useState, type PropsWithChildren } from 'react'
import { AlertProvider } from '~/contexts/alert-context'
import { AppProvider } from '~/contexts/app-context'
import { ModalProvider } from '~/contexts/modal-context'
import { ViewportProvider } from '~hooks/useViewport'

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