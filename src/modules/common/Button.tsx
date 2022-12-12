import React from 'react';

interface ButtonProps {
    border: string;
    color: string;
    children?: React.ReactNode;
    height: string;
    width: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({border, color, children, onClick, height, width}: ButtonProps) => {
    return (
        <button onClick={onClick} style={{ 
            backgroundColor: color, 
            border: border,
            height: height,
            width: width
        }}>
            {children}
        </button>
    )
}

export default Button;