"use client"

import React from 'react'
import { Button } from '@components/ui/button'
import Link from 'next/link'
import ContactForm from '@components/Forms/ContactForm'
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@components/ui/card'
import ProjectCard from '@components/Projects/ProjectCard'
import type { Project } from '@typings/project'
import { useModal } from '@contexts/ModalContext'
import { Separator } from '@components/ui/separator'

export default function Home() {

    const { openModal, closeModal }  = useModal();

    const handleModalOpen = () => {
        openModal({
            content: <ContactForm onSuccess={() => closeModal()} />,
            title: 'Contact Me',
            description: 'Send me a message and I will get back to you as soon as possible.',
        })
    }

    const featuredProjects: Project[] = [
        {
            name: 'BlackStack Solutions',
            description: 'BlackStack Solutions is a website for my freelance software development LLC. Built with Next.js + TailwindCSS. I wanted to build a website with robust user functionality and a clean, design.',
            documentation: 'https://github.com/blackstack-software-solutions/blackstack-site',
            deployment: 'https://blackstacksolutions.com/',
            skills: ['Next.js', 'TypeScript', 'TailwindCSS']
        },
        {
            name: 'Silvi',
            description: 'Silvi is an open-source web-app with the purpose of enabling tree stewards to easily track and report on their reforestation projects as well as sharing that progress with a broader community.',
            documentation: 'https://github.com/SilviProtocol/silvi-core',
            deployment: 'https://silvi.earth/',
            skills: ['Next.js', 'TypeScript', 'TailwindCSS', 'Django']
        },
        {
            name: "Todo List API",
            description: "A REST API for a todo list app. Built with Nest.js + MongoDB. Users can create an account, create todo lists, and add items to their lists. I built this project to learn more about Nest.js and MongoDB. I also wanted to deploy a Nest.js app to a Docker container.",
            documentation: 'https://github.com/Dandychux/todo-list-api',
            skills: ['Nest.js', 'MongoDB', 'TypeScript', 'Docker']
        },
    ]
    
    return (
        <>
            <h1 className="text-3xl mb-2 w-full text-center md:m-0 md:text-[5rem] leading-normal font-extrabold">
                Chukwuma Okoroji
            </h1>
            <h2 className='text-xl text-red-650 mb-2 w-full text-center md:m-0 md:text-[2rem] leading-normal font-semibold'>Your Friendly Neighborhood Software Developer</h2>
            <p className='w-2/3 mb-4 md:m-0 md:w-full md:px-32 text-center text-xl md:text-[1.2rem] leading-normal font-medium'>
                Got an idea? Let&apos;s bring it to life together! I&apos;ve got the full-stack expertise to transform your concept into a highly functional digital solution.

                With a toolkit comprising languages like Python, C#, and Typescript(Javascript), and experience with frameworks like Angular, Next.js, and ASP.NET, I&apos;m your one stop shop for all things web development.
            </p>

            <Separator className="my-4" />

            {/* Services Section */}
            <section className='my-4 flex flex-col w-full'>
                <h1 className='text-3xl mb-2 text-center md:m-0 md:text-[3rem] leading-normal font-semibold'>My Specialities</h1>

                <div className='grid gap-3 pt-3 mt-3 justify-items-center md:grid-cols-3'>
                    <Card>
                        <CardHeader>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
                                </svg>
                            </div>
                            <CardTitle>
                                Web Development
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                I build robust, responsive, and visually appealing websites using modern technologies such as React and Angular. My extensive knowledge of HTML, CSS, and JavaScript, combined with my experience in UX/UI design, allows me to create intuitive and engaging user experiences. Whether you need a single-page application or a complex web platform, I can take your project from concept to completion.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                                </svg>
                            </div>
                            <CardTitle>
                                API Development
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                I create secure, efficient, and reliable RESTful APIs using server-side technologies like Node.js, Express, and Django. My APIs are designed with scalability in mind, ensuring they can handle increased load as your business grows. I also implement best practices for data management, including data validation, error handling, and proper use of HTTP methods.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                                </svg>
                            </div>
                            <CardTitle>
                                Full Stack Development
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                I offer full-stack development services, bringing together my skills in front-end and back-end development to build complete, end-to-end applications. I leverage modern technologies such as React, Next.js, and ASP.NET to create scalable, maintainable, and secure applications. From handling user interfaces to managing databases, I ensure every component of your application works seamlessly together for a smooth user experience.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <div className="flex space-x-4">
                <Button size={'lg'} onClick={handleModalOpen}>
                    Contact Me
                </Button>
                <Button size="lg">
                    <Link href='/about'>Learn More</Link>
                </Button>
            </div>

            <Separator className="my-4" />

            {/* Featured Projects */}
            <section className='my-4 flex flex-col w-full'>
                <h1 className='text-3xl mb-2 text-center md:m-0 md:text-[3rem] leading-normal font-semibold'>Featured Projects</h1>

                <div className='grid gap-3 pt-3 mt-3 justify-items-center md:grid-cols-3'>
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>

                <Button size={'lg'} variant={'link'} className='self-end hover:text-accent'>
                    <Link href='/projects'>See All Projects {'->'}</Link>
                </Button>
            </section>
        </>
    )

}