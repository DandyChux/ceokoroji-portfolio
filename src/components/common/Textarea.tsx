import React, { forwardRef } from 'react'
import clsx from 'clsx'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, rows, ...props }, ref) => {
        return (
            <textarea 
                className={clsx(
                    "flex w-full resize-none rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                rows={rows}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = 'Textarea'