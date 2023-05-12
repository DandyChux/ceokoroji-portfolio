"use client"

import React, { useState } from 'react'
import Modal from '@components/common/Modal'
import Button from '@components/common/Button'
import Link from 'next/link'
import ContactForm from '@components/Forms/ContactForm'

export default function Home() {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-900">
                Chukwuma Okoroji
            </h1>
            <div className="flex">
                <Button size={'lg'} variant={'regular'} onClick={() => setShowModal(true)}>
                    Contact Me
                </Button>
                <Button size="lg" variant={'regular'}>
                    <Link href="/projects">See My Work</Link>
                </Button>
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>
                    <h2>Leave a message</h2>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm />
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