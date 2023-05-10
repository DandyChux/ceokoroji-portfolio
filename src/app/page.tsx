"use client"

import React, { useState } from 'react'
import Modal from '@modules/common/Modal'
import Button from '@modules/common/Button'
import Link from 'next/link'

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
                    <h2>Contact Form</h2>
                </Modal.Header>
                <Modal.Body>
                    <form>

                    </form>
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