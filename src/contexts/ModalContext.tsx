"use client"

import React, { 
    createContext, 
    type ReactNode, 
    useContext, 
    useState, 
    useCallback,
    useEffect
} from 'react';
import ReactDOM from 'react-dom'
import { 
    Modal,
    ModalBody,
    ModalFooter,
    ModalDescription,
    ModalHeader,
    ModalTitle
} from '@components/ui/modal';
import { Button } from '@components/ui/button';

export interface ModalOptions {
    title: string;
    content: ReactNode;
    description?: string;
    footer?: ReactNode;
    className?: string;
}

export interface ModalContextType {
    isOpen: boolean;
    openModal: (options: ModalOptions) => void;
    closeModal: () => void;
    modalOptions: ModalOptions;
}

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

/**
 * Custom hook that provides access to the ModalContext.
 * @returns The ModalContext object.
 * @throws {Error} If used outside of a ModalProvider.
 */
export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
}

/**
 * Custom hook that provides access to the modal context. For use in components that need to open a modal.
 * @returns {ModalContextType} An object containing the following properties and functions:
 * - isOpen: A boolean indicating whether the modal is currently open.
 * - openModal: A function to open the modal.
 * - closeModal: A function to close the modal.
 * - modalOptions: Additional options for the modal.
 *
 * @example
 * const { isOpen, openModal, closeModal, modalOptions } = useModal();
 * // Example usage:
 * if (isOpen) {
 *   closeModal();
 * }
 */
export const useModal = (): ModalContextType => {
    const { isOpen, openModal, closeModal, modalOptions } = useModalContext();
    return { isOpen, openModal, closeModal, modalOptions };
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState<ModalOptions>({} as ModalOptions);
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
    
    useEffect(() => {
        setModalRoot(document.getElementById('modal-container'));
    }, []);

    const openModal = useCallback((options: ModalOptions) => {
        setModalOptions(options);
        setIsOpen(true);
    }, [])

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setModalOptions({} as ModalOptions);
    }, [])

    const contextValue = {
        isOpen,
        openModal,
        closeModal,
        modalOptions
    }

    return (
        <ModalContext.Provider value={contextValue}>
            {isOpen && modalRoot && ReactDOM.createPortal(
                <Modal className={modalOptions.className}>
                        <ModalHeader>
                            <ModalTitle>
                                {modalOptions.title}
                            </ModalTitle>
                            {modalOptions.description && (
                                <ModalDescription>
                                    {modalOptions.description}
                                </ModalDescription>
                            )}
                        </ModalHeader>
                    <ModalBody>
                        {modalOptions.content}
                    </ModalBody>
                    {modalOptions.footer && (
                        <ModalFooter>
                            {modalOptions.footer}
                            <Button variant={'destructive'} onClick={closeModal}>Close</Button>
                        </ModalFooter>
                    )}
                </Modal>,
                modalRoot
            )}
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContext;
