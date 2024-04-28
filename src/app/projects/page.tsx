import { type Metadata, type NextPage } from 'next'
import Image from 'next/image'
import ProjectCard from '~/components/Projects/project-card'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import type { Project } from '~typings/project'

export const metadata: Metadata = {
    title: 'Projects',
}

const Projects: NextPage = () => {

    const portfolioProjects: Project[] = [
        {
            name: 'BlackStack Software Solutions',
            description: 'A website for my freelance software development LLC. It was built for potential clients to learn more about the services I offer. For current clients, it serves as a hub for project management and communication with features like a client portal and a blog.',
            documentation: 'https://github.com/blackstack-software-solutions/blackstack-site',
            deployment: 'https://blackstacksolutions.com',
            skills: ['Next.js', 'TRPC', 'TypeScript', 'AWS S3', 'PostgreSQL', 'CSS'],
            image: '/blackstack.svg'
        },
        {
            name: 'Silvi',
            description: 'Silvi is an open-source web-app with the purpose of enabling tree stewards to easily track and report on their reforestation projects as well as sharing that progress with a broader community.',
            documentation: 'https://github.com/SilviProtocol/silvi-open',
            deployment: 'https://www.silvi.earth/about-us',
            skills: ['Next.js', 'TypeScript', 'Django', 'Python', 'CSS/SCSS'],
            image: '/silvi.svg'
        },
        {
            name: 'Sporta Go',
            description: 'Sporta Go is a platform built for athletes to connect with trainers and coaches. They are a client of BlackStack Software Solutions. MVP currently in development.',
            documentation: "https://github.com/SportaGo/sporta-go-web",
            deployment: 'https://thesportago.com',
            skills: ['Next.js', 'Typescript', 'PostgreSQL', 'AWS S3', 'CSS'],
            image: '/sporta-go.svg'
        },
        {
            name: 'Portfolio',
            description: 'This website! It has gone through a few iterations but I am happy with the current design. Built with Next.js + TailwindCSS. I wanted to build a website that showcased my skills and projects in a clean and organized way.',
            documentation: 'https://github.com/DandyChux/ceokoroji-portfolio',
            skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'CSS'],
            image: '/logo.png'
        },
        {
            name: 'Rusty Melody',
            description: 'A web app that leverages machine learning and neural networks to generate music recommendations based on user input. It is a WASM application built with Rust + Yew on the frontend and Axum + PostgreSQL on the backend. I built this project to experiment with machine learning in Rust and to learn more about neural networks.',
            documentation: 'https://github.com/DandyChux/rusty_melody',
            deployment: 'https://rusty-melody-client-blackstack-software-solutions.koyeb.app/',
            skills: ['Rust', 'Yew', 'Axum', 'PostgreSQL', 'WASM', 'Docker', 'CSS'],
            image: '/rust-icon.svg'
        },
        {
            name: "Feedback App",
            description: "A simple feedback app built with Yew + Rust on the frontend and Actix + PostgreSQL on the backend. I built this project to deepen my understanding of Rust and to learn more about its web development capabilities. I also wanted to experiment with WASM in a production environment.",
            documentation: 'https://github.com/DandyChux/rust-fullstack-feedback',
            deployment: 'https://rust-feedback-app.onrender.com',
            skills: ['Rust', 'Yew', 'Actix', 'PostgreSQL', 'WASM', 'Docker', 'CSS'],
            image: '/rust-icon.svg'
        },
        {
            name: "Todo List API",
            description: "A REST API for a todo list app. Built with Nest.js + MongoDB. Users can create an account, create todo lists, and add items to their lists. I built this project to learn more about Nest.js and MongoDB. I also wanted to deploy a Nest.js app to a Docker container.",
            documentation: 'https://github.com/Dandychux/todo-list-api',
            skills: ['Nest.js', 'MongoDB', 'TypeScript', 'Docker'],
            image: '/nest-js.svg'
        },
        {
            name: "CLI Calculator",
            description: "A simple calculator built with Rust. This was my first Rust project and I wanted to build something that would allow me to learn the basics of the language. I also wanted to experiment with building a CLI app.",
            documentation: "https://github.com/DandyChux/cli_calculator",
            // deployment: ''
            skills: ['Rust'],
            image: '/rust-icon.svg'
        },
        {
            name: "Number Guessing Game",
            description: "A simple number guessing game built with Rust. I wanted to build a project with Rust where I could experiment with some of the language's features.",
            documentation: 'https://github.com/DandyChux/guessing_game',
            // deployment: '',
            skills: ['Rust'],
            image: '/rust-icon.svg'
        },
        {
            name: "Bookstore API",
            description: "A REST API for a bookstore. It allows a user to create an account, add books to their cart, and checkout. I built this project with Express.js + PostgreSQL hosted on Supabase. This was a great opportunity to delve into severless environments and learn more about Supabase.",
            documentation: 'https://github.com/Dandychux/bookstore-api',
            // deployment: 'https://bookstore-api.vercel.app/',
            skills: ['Express.js', 'PostgreSQL', 'Supabase', 'TypeScript'],
            image: '/express-js.svg'
        },
        {
            name: 'On Point Charter',
            description: 'On Point Charter is a boating business that offers private charters. This website was built with Next.js + Tailwind. I wanted to build a website that was simple and easy to navigate. Currently still in development.',
            documentation: 'https://github.com/DandyChux/charter-site',
            deployment: 'https://charter-site.vercel.app/',
            skills: ['Next.js', 'TypeScript', 'CSS'],
            image: '/next-js.svg'
        },
        {
            name: 'CyberBridge Initiative',
            description: 'A website for a fictional non-profit organization. Built with Vite + React for a class project.',
            documentation: 'https://github.com/DandyChux/LIS-4365-charity-project',
            deployment: 'https://cyberbridgeinitiative.netlify.app',
            skills: ['React', 'Vite', 'TypeScript', 'CSS'],
            image: '/react.svg'
        },
        // {
        //     name: 'React to-do list',
        //     description: 'My first React project! A simple to-do list app. The focus of this project was to learn the basics of React state management.',
        //     documentation: 'https://github.com/DandyChux/task-app',
        //     deployment: 'https://dandychux-react-task-app.netlify.app/',
        //     skills: ['React', 'JavaScript', 'CSS'],
        //     image: '/react.svg'
        // },
        {
            name: 'Fancy Carpet Calculator',
            description: 'An early favorite of mine when I was initially learning DOM manipulation in JavaScript. This project is a simple calculator that calculates the area of the carpet based on user input.',
            documentation: 'https://github.com/DandyChux/Fancy-carpet-calculator',
            deployment: 'https://fancy-carpet-calculator.netlify.app/',
            skills: ['HTML', 'CSS', 'JS'],
            image: '/javascript.svg'
        },
        {
            name: 'Madlib Madness',
            description: 'An HTML form using user input to generate a funny story!',
            documentation: 'https://github.com/DandyChux/Mad-Lib-Madness',
            deployment: 'https://mad-lib-madness.netlify.app/',
            skills: ['HTML', 'CSS', 'JS'],
            image: '/javascript.svg'
        },
        {
            name: 'Magic 8 Ball',
            description: 'A simple Magic 8 Ball app. The user asks a question and the app generates a random answer. At the time it was a huge step in my learning journey with JavaScript and the DOM.',
            documentation: 'https://github.com/DandyChux/Magic-8-Ball',
            deployment: 'https://dandychux-magic8ball.netlify.app/',
            skills: ['HTML', 'CSS', 'JS'],
            image: '/javascript.svg'
        },
        {
            name: 'API Photo Gallery',
            description: 'This project was my first attempt at using an API. I used the Unsplash API to generate a photo gallery. I was learning CSS animations at the time so I added a few simple animations to the project.',
            documentation: 'https://github.com/DandyChux/Photography-Website',
            deployment: 'https://ceokoroji-photo-grid.netlify.app/',
            skills: ['HTML', 'CSS', 'JS'],
            image: '/javascript.svg'
        },
    ]

    return (
        <div className='relative flex flex-col h-full'>
            <h1 className='text-3xl mt-3 md:text-[5rem] w-full text-center leading-normal font-semibold'>
                Projects
            </h1>

            <span className='text-lg w-full text-center leading-normal font-medium mt-4'>Specializations</span>
            <div className='grid grid-cols-auto md:inline-flex items-center justify-center w-full 2xl:w-1/2 mx-auto py-4 gap-4'>
                <Card className='flex-1 rounded-none py-4'>
                    <CardHeader className='px-0'>
                        <Separator className='w-[40%]' />
                    </CardHeader>
                    <CardContent className='flex flex-col items-center gap-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
                            </svg>
                        </div>
                        <CardTitle>
                            Web Development
                        </CardTitle>
                    </CardContent>
                </Card>

                <Card className='flex-1 rounded-none py-4'>
                    <CardHeader className='px-0'>
                        <Separator className='w-[40%]' />
                    </CardHeader>
                    <CardContent className='flex flex-col items-center gap-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                            </svg>
                        </div>
                        <CardTitle>
                            API Development
                        </CardTitle>
                    </CardContent>
                </Card>

                <Card className='flex-1 rounded-none py-4'>
                    <CardHeader className='px-0'>
                        <Separator className='w-[40%]' />
                    </CardHeader>
                    <CardContent className='flex flex-col items-center gap-2'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                            </svg>
                        </div>
                        <CardTitle>
                            Mobile Development
                        </CardTitle>
                    </CardContent>
                </Card>
            </div>
            
            <div className='grid gap-3 pt-3 mt-3 md:grid-cols-2 3xl:grid-cols-3'>
                {portfolioProjects.map((project, index) => (
                    <ProjectCard 
                        key={index}
                        {...project}
                    />
                ))}
            </div>

            {/* Cricle vectors */}
            <div
                className='fixed left-0 -translate-x-14 2xl:translate-x-[25.5rem] bottom-24 w-24 h-24 bg-transparent rounded-full border-2 border-accent/80'
            />
            <div
                className='fixed right-0 translate-x-14 2xl:translate-x-12 top-24 2xl:top-52 w-24 h-24 bg-transparent rounded-full border-2 border-accent/80'
            />
        </div>
    )

}

export default Projects