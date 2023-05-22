import React, { forwardRef } from 'react';
import clsx from 'clsx';
import Loading from './Loading';

type buttonVariant = 'regular' | 'outline' | 'ghost' | 'link';
type buttonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: buttonVariant;
    size?: buttonSize;
    children: React.ReactNode;
    loading?: boolean;
}

const sizeClasses = {
    sm: 'px-2 py-1',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
}

const variantClasses = {
    regular: 'bg-gray-900 text-white hover:bg-gray-900 hover:opacity-80 transition-opacity',
    outline: 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white hover:opacity-80 transition-opacity',
    ghost: 'text-gray-900 hover:bg-gray-900 hover:text-white hover:opacity-80 transition-opacity',
    link: 'text-gray-900 hover:underline disabled:no-underline',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, size='md', variant='regular', children, loading, ...props }, ref) => {

    return (
        <button 
            ref={ref}
            className={clsx(
                'flex justify-center h-fit w-fit rounded-lg text-xs font-medium transition-all m-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className,
                sizeClasses[size],
                variantClasses[variant],
            )}
        {...props}>
            {loading && <Loading />}
            <span className={clsx('transition', {
                'opacity-0': loading,
                'opacity-100': !loading,
            })}>
                {children}
            </span>
        </button>
    )
})

Button.displayName = 'Button';

export default Button;