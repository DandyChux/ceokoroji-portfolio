import React, { forwardRef } from 'react'
import clsx from 'clsx'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <select
                className={clsx(
                    "w-28 text-center font-medium rounded-md drop-shadow-md bg-gray-600 duration-300 hover:bg-gray-600 focus:bg-gray-600 focus:ring-0 text-white",
                    className
                )}
                ref={ref} 
                {...props}
            >
                {children}
            </select>
        )
    }
)
Select.displayName = 'Select'