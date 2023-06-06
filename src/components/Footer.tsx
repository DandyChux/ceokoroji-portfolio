"use client"

import React, { useState } from 'react'
import Button from './common/Button'
import Modal from './common/Modal'
import ContactForm from './Forms/ContactForm'
import Link from 'next/link'

const Footer: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <footer className="w-full bg-gray-800 text-white py-6 px-4">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h3 className="text-xl text-center text-red-550 font-bold">Chukwuma Okoroji</h3>
                        <p className="mt-1 text-center">&copy; Copyright {new Date().getFullYear()}</p>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-lg text-center text-red-550 font-semibold">Contact me</h4>
                        <Button size={'lg'} variant={'link'} className='text-gray-300 hover:text-white' onClick={() => setShowModal(true)}>
                            Contact Me
                        </Button>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="text-lg text-center text-red-550 font-semibold">Follow me</h4>
                        <menu className="flex flex-col md:flex-row md:gap-4 justify-center md:justify-start mt-2">
                            <Link href="https://linkedin.com/in/chukwuma-okoroji/" target={'_blank'} className='text-gray-300 hover:text-white hover:underline'>
                                LinkedIn
                            </Link>
                            <Link href="https://github.com/dandychux/" target={'_blank'} className='text-gray-300 hover:text-white hover:underline'>
                                GitHub
                            </Link>
                            <Link href="https://instagram.com/the_ceokoroji/" target={'_blank'} className='text-gray-300 hover:text-white hover:underline'>
                                Instagram
                            </Link>
                        </menu>
                    </div>
                </div>
            </footer>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>
                    <h2>Leave a message</h2>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm onSuccess={() => setShowModal(false)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button size={'lg'} variant={'outline'} onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Footer