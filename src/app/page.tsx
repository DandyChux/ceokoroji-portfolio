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
            <h1 className="text-3xl mb-2 w-full text-center md:m-0 md:text-[5rem] leading-normal font-extrabold text-gray-900">
                Chukwuma Okoroji
            </h1>
            <h2 className='text-xl mb-2 w-full text-center md:m-0 md:text-[2rem] leading-normal font-semibold text-gray-800'>Your Friendly Neighborhood Software Developer</h2>
            <p className='w-2/3 mb-4 md:m-0 md:w-full md:px-32 text-center text-xl md:text-[1.2rem] leading-normal font-medium text-gray-700'>
                Got an idea? Let&apos;s bring it to life together! I&apos;ve got the full-stack expertise to transform your concept into a highly functional digital solution.

                With a toolkit comprising languages like Python, C#, and Typescript(Javascript), and experience with frameworks like Angular, Next.js, and ASP.NET, I&apos;m your one stop shop for all things web development.
            </p>
            
            <div className="flex">
                <Button size={'lg'} variant={'regular'} onClick={() => setShowModal(true)}>
                    Contact Me
                </Button>
                <Button size="lg" variant={'regular'}>
                    <Link href="https://www.icloud.com/iclouddrive/01eLKZZdNlzIHTcMJ8NmpYsGw#CEOkoroji%5FResume" target='_blank'>View My Resume</Link>
                </Button>
            </div>

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