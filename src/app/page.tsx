"use client"

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import ProjectCard from '~/components/Projects/project-card'
import { useModal } from '~/contexts/modal-context'
import ContactForm from '~components/Forms/ContactForm'
import { Button } from '~components/ui/button'
import HeroCode from '~public/home_hero-code.svg'
import type { Project } from '~typings/project'

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
            name: 'BlackStack Software Solutions',
            description: 'A website for my freelance software development LLC. It was built for potential clients to learn more about the services I offer. For current clients, it serves as a hub for project management and communication with features like a client portal and a blog.',
            documentation: 'https://github.com/blackstack-software-solutions/blackstack-site',
            deployment: 'https://blackstacksolutions.com',
            skills: ['Next.js', 'TRPC', 'TailwindCSS', 'TypeScript', 'AWS S3', 'PostgreSQL'],
            image: '/blackstack.svg'
        },
        {
            name: 'Silvi',
            description: 'Silvi is an open-source web-app with the purpose of enabling tree stewards to easily track and report on their reforestation projects as well as sharing that progress with a broader community.',
            documentation: 'https://github.com/SilviProtocol/silvi-open',
            deployment: 'https://www.silvi.earth/about-us',
            skills: ['Next.js', 'TypeScript', 'TailwindCSS', 'Django', 'Python'],
            image: '/silvi.svg'
        },
        {
            name: 'Sporta Go',
            description: 'Sporta Go is a platform built for athletes to connect with trainers and coaches. They are a client of BlackStack Software Solutions. MVP currently in development.',
            documentation: "https://github.com/SportaGo/sporta-go-web",
            deployment: 'https://thesportago.com',
            skills: ['Next.js', 'Typescript', 'TailwindCSS', 'PostgreSQL', 'AWS S3'],
            image: '/sporta-go.svg'
        },
    ]
    
    return (
        <div className='flex flex-col h-full'>
            {/* Hero Section */}
            <section className='flex flex-col lg:flex-row w-full items-start py-12 2xl:py-32'>
                <div className='space-y-6 flex-1'>
                    <h1 className="text-4xl lg:text-6xl mb-2 leading-normal font-semibold text-start">
                        Hello!
                    </h1>
                    <h2 className='text-xl lg:text-3xl mb-2 leading-normal font-medium'>Your Friendly Neighborhood Software Developer</h2>
                    <p className='lg:w-[60%] mb-4 text-lg lg:text-xl 2xl:text-2xl leading-normal font-normal'>
                        Got an idea? Let&apos;s bring it to life together! I&apos;ve got the full-stack expertise to transform your concept into a highly functional digital solution. 
                    </p>

                    <div className='flex flex-col gap-4 w-max pt-16 2xl:pt-52'>
                        <Button size='lg' className='mt-auto bg-accent text-accent-foreground hover:bg-accent/80' asChild>
                            <Link href="/Chukwuma_Okoroji.pdf" rel='noopener' target='_blank' download>
                                Download CV
                                <ArrowDownTrayIcon className='w-4 h-4 ml-2' />
                            </Link>
                        </Button>
                        
                        <span className='inline-flex space-x-4'>
                            {/* LinkedIn Logo */}
                            {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                            <Link href='https://linkedin.com/in/chukwuma-okoroji/' rel='noopener' target='_blank' className='cursor-pointer group'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-6 h-6 2xl:w-10 2xl:h-10 fill-accent group-hover:fill-accent/80'>
                                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/>
                                </svg>
                            </Link>

                            {/* Github Logo */}
                            {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                            <Link href='https://github.com/dandychux/' rel='noopener' target='_blank' className='cursor-pointer group'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className='w-6 h-6 2xl:w-10 2xl:h-10 fill-accent group-hover:fill-accent/80'>
                                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                                </svg>
                            </Link>

                            {/* Instagram Logo */}
                            <Link href='https://instagram.com/the_ceokoroji/' rel='noopener' target='_blank' className='cursor-pointer group'>
                                <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="1em" width="1em" className="w-6 h-6 2xl:w-10 2xl:h-10 fill-accent group-hover:fill-accent/80">
                                    <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z" />
                                </svg>
                            </Link>
                        </span>
                    </div>
                </div>

                <div className='flex-1 relative'>
                    <Image 
                        src={HeroCode}
                        alt='Hero Code'
                        className='absolute right-10 top-8 2xl:right-32 xl:scale-110 3xl:scale-[1.35]'
                        priority
                    />
                </div>
            </section>

            {/* Services Section */}
            {/* <section className='my-4 flex flex-col w-full'>
                <h1 className='text-3xl mb-2 text-center lg:m-0 lg:text-[3rem] leading-normal font-semibold'>My Specialities</h1>

                <div className='grid gap-3 pt-3 mt-3 justify-items-center lg:grid-cols-3'>
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
            </section> */}

            {/* <div className="flex space-x-4">
                <Button size={'lg'} onClick={handleModalOpen}>
                    Contact Me
                </Button>
                <Button size="lg">
                    <Link href='/about'>Learn More</Link>
                </Button>
            </div>

            <Separator className="my-4" /> */}

            {/* Featured Projects */}
            <section className='my-4 flex flex-col w-full py-12 2xl:py-32'>
                <h1 className='text-3xl mb-2 text-center lg:m-0 leading-normal font-normal'>Featured Projects</h1>

                <div className='grid gap-3 pt-3 mt-3 justify-items-center lg:gris-cols-2 2xl:grid-cols-3'>
                    {featuredProjects.map((project, index) => (
                        <ProjectCard 
                            key={index} 
                            {...project} 
                            className="rounded-3xl"
                        />
                    ))}
                </div>

                <Button size={'lg'} variant={'link'} className='self-end hover:text-accent'>
                    <Link href='/projects'>See All Projects {'->'}</Link>
                </Button>
            </section>
        </div>
    )

}