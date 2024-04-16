'use client'

import React, { useEffect } from 'react';
import useAlert from '~hooks/useAlert';

const Alert: React.FC = () => {
    const { alert, setAlert } = useAlert();

    const bgColor = alert.type === 'success' ? 'bg-green-200' : alert.type === 'error' ? 'bg-red-200' : alert.type === 'warning' ? 'bg-yellow-200' : 'bg-blue-200';
    const textColor = alert.type === 'success' ? 'text-green-700' : alert.type === 'error' ? 'text-red-700' : alert.type === 'warning' ? 'text-yellow-700' : 'text-blue-700';
    const borderColor = alert.type === 'success' ? 'border-green-700' : alert.type === 'error' ? 'border-red-700' : alert.type === 'warning' ? 'border-yellow-700' : 'border-blue-700';

    useEffect(() => {

        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert(prev => ({ ...prev, show: false }))
            }, 2500); // the alert will disappear after 2.5 seconds

            return () => clearTimeout(timer);
        }

    }, [alert, setAlert])

    if (!alert.show) return null;

    return (
        <div className={`z-50 w-[25%] fixed top-0 right-0 p-4 rounded border-l-4 ${bgColor} ${textColor} ${borderColor}`}>
            <p className='font-bold capitalize'>{alert.type}</p>
            <p className='font-semibold'>{alert.message}</p>
        </div>
    )
}

export default Alert