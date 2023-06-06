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

    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = modalRef.current;

        if (dialog) {
            dialog.addEventListener('cancel', onClose);
        }

        return () => {
            if (dialog) {
                dialog.removeEventListener('cancel', onClose);
            }
        }
    }, [onClose])

    useEffect(() => {
        
        if (isOpen) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }

    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <dialog ref={modalRef} className='bg-white p-6 rounded-lg shadow-md w-full max-w-lg'>
            {children}
        </dialog>
    )

}

const ModalHeader: React.FC<PropsWithChildren> = ({ children }) => (
    <div className='border-b pb-3 mb-3'>
        <h2 className='text-3xl font-semibold'>{children}</h2>
    </div>
);

const ModalBody: React.FC<PropsWithChildren> = ({ children }) => (
    <div className='mb-4'>
        {children}
    </div>
)

const ModalFooter: React.FC<PropsWithChildren> = ({ children }) => (
    <div className='flex border-t pt-3 mt-3 justify-end space-x-4'>
        {children}
    </div>
)

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal