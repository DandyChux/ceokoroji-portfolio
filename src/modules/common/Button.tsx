import React from 'react';
import clsx from 'clsx';

type buttonVariant = 'regular' | 'outline' | 'ghost' | 'link';
type buttonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    variant?: buttonVariant;
    size?: buttonSize;
    children: React.ReactNode;
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

const Button: React.FC<ButtonProps> = ({ size='md', variant='regular', children, className, ...props }) => {
    return (
        <button className={clsx(
            'h-fit w-fit rounded-lg text-xs font-medium transition-all m-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
            sizeClasses[size],
            variantClasses[variant],
        )}
        {...props}>
            {children}
        </button>
    )
}

export default Button;