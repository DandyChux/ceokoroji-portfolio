'use client'

import React, { createContext, useState, type PropsWithChildren } from "react"

export type AppContextType = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    }

    return (
        <AppContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </AppContext.Provider>
    )
}