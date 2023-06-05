"use client"

import React, { useRef } from 'react'
import clsx from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> & {
    Img: React.FC<CardProps>;
    Title: React.FC<CardProps>;
    Body: React.FC<CardProps>;
} = ({ children, className }) => {

    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={cardRef} className={clsx(
            'bg-white p-6 rounded-lg shadow-md w-full max-w-lg flex flex-col duration-500 motion-safe:hover:scale-105',
            className
        )}>
            {children}
        </div>
    )

}

const CardImg: React.FC<CardProps> = ({ children, className }) => (
    <div className={clsx(
        'flex justify-center mb-4 relative w-full max-h-[50%]',
        className
    )}>
        {children}
    </div>
)

const CardTitle: React.FC<CardProps> = ({ children, className }) => (
    <div className={clsx(
        'text-center text-lg text-red-650 font-semibold mb-4 w-full',
        className
    )}>
        {children}
    </div>
)

const CardBody: React.FC<CardProps> = ({ children, className }) => (
    <div className={clsx(
        'text-base font-medium mb-4 w-full',
        className
    )}>
        {children}
    </div>
)

Card.Img = CardImg;
Card.Title = CardTitle;
Card.Body = CardBody;

export default Card;