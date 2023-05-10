"use client"

import React, { type PropsWithChildren, useEffect, useRef } from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> & {
    Header: React.FC<PropsWithChildren>;
    Body: React.FC<PropsWithChildren>;
    Footer: React.FC<PropsWithChildren>;
} = ({ isOpen, onClose, children }) => {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                {children}
            </div>
        </div>
    )

}

const ModalHeader: React.FC<PropsWithChildren> = ({ children }) => (
    <div className='border-b pb-3 mb-3'>
        <h2 className='text-2xl font-semibold'>{children}</h2>
    </div>
);

const ModalBody: React.FC<PropsWithChildren> = ({ children }) => (
    <div className='mb-4'>{children}</div>
)

const ModalFooter: React.FC<PropsWithChildren> = ({ children }) => (
    <div className='flex border-t pt-3 mt-3 justify-end space-x-4'>{children}</div>
)

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal