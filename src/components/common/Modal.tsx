"use client"

import React, { useContext, createContext, useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const ModalContext = createContext<{ onClose: () => void; } | undefined>(undefined)

const useModalContext = () => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider')
    }

    return context;
}

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> & {
    Header: React.FC<ModalChildProps>;
    Title: React.FC<ModalChildProps>;
    Body: React.FC<ModalChildProps>;
    Footer: React.FC<ModalChildProps>;
} = ({ isOpen, onClose, children, className }) => {

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
        
        if (isOpen && modalRef.current && !modalRef.current.open) {
            modalRef.current.showModal();
        } else if (!isOpen && modalRef.current && modalRef.current.open) {
            modalRef.current.close();
        }

    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <ModalContext.Provider value={{ onClose }}>    
            <dialog ref={modalRef} className={clsx('bg-white p-6 rounded-lg shadow-md w-full max-w-lg', className)}>
                {children}
            </dialog>
        </ModalContext.Provider>
    )

}

interface ModalChildProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const ModalHeader: React.FC<ModalChildProps> = ({ children, className }) => {
    const { onClose } = useModalContext();

    return (
        <div className={clsx('flex justify-between items-center border-b mb-3', className)}>
            {children}
            <XMarkIcon className='h-6 w-6' onClick={onClose} />
        </div>
    )
};

const ModalTitle: React.FC<ModalChildProps> = ({ children, className }) => (
    <h2 className={clsx('text-xl font-semibold', className)}>{children}</h2>
)

const ModalBody: React.FC<ModalChildProps> = ({ children, className }) => (
    <div className={clsx('mb-4 overflow-y-auto', className)}>
        {children}
    </div>
)

const ModalFooter: React.FC<ModalChildProps> = ({ children, className }) => (
    <div className={clsx('flex border-t pt-3 mt-3 justify-end space-x-4', className)}>
        {children}
    </div>
)

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal