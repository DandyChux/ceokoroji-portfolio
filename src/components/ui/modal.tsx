"use client"

import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import { useModalContext } from '~/contexts/modal-context'

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> & {
    Header: React.FC<ModalChildProps>;
    Title: React.FC<ModalChildProps>;
    Description: React.FC<ModalChildProps>;
    Body: React.FC<ModalChildProps>;
    Footer: React.FC<ModalChildProps>;
} = ({ children, className }) => {

    const modalRef = useRef<HTMLDialogElement>(null);
    const { closeModal, isOpen } = useModalContext();

    useEffect(() => {
        const dialog = modalRef.current;

        if (isOpen && dialog && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog && dialog.open) {
            dialog.close();
        }

        return () => {
            if (dialog) {
                dialog.close();
            }
        }
    }, [isOpen])

    useEffect(() => {
        const dialog = modalRef.current;

        if (dialog) {
            dialog.addEventListener('cancel', closeModal);
        }

        return () => {
            if (dialog) {
                dialog.removeEventListener('cancel', closeModal);
            }
        }
    }, [closeModal])

    return (
        <dialog ref={modalRef} className={clsx('bg-card block rounded-lg shadow-xl w-full max-w-lg border', className)}>
            {children}
        </dialog>
    )

}

interface ModalChildProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const ModalHeader: React.FC<ModalChildProps> = ({ children, className }) => {
    const { closeModal } = useModalContext();

    return (
        <div className={clsx('flex flex-col justify-between items-center border-b mb-3 p-2', className)}>
            <XMarkIcon className='self-end w-6 h-6 cursor-pointer hover:text-destructive' onClick={closeModal} />
            {children}
        </div>
    )
};

export const ModalTitle: React.FC<ModalChildProps> = ({ children, className }) => (
    <h2 className={clsx('text-xl font-semibold mb-2', className)}>{children}</h2>
)

export const ModalDescription: React.FC<ModalChildProps> = ({ children, className }) => (
    <p className={clsx('text-sm font-medium text-muted-foreground', className)}>{children}</p>
)

export const ModalBody: React.FC<ModalChildProps> = ({ children, className }) => (
    <div className={clsx('flex flex-col mb-4 overflow-y-auto p-4', className)}>
        {children}
    </div>
)

export const ModalFooter: React.FC<ModalChildProps> = ({ children, className }) => (
    <div className={clsx('flex border-t p-4 mt-3 justify-end space-x-4', className)}>
        {children}
    </div>
)

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;