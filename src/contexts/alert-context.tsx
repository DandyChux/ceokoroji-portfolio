'use client'

import React, { type SetStateAction, createContext, useState, type PropsWithChildren } from 'react'

export type AlertType = {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

export type AlertContextType = {
    alert: AlertType;
    setAlert: React.Dispatch<SetStateAction<AlertType>>;
}

export const AlertContext = createContext<AlertContextType>({} as AlertContextType);

export const AlertProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [alert, setAlert] = useState<AlertType>({
        show: false,
        message: '',
        type: 'success',
    });

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {children}
        </AlertContext.Provider>
    )
}