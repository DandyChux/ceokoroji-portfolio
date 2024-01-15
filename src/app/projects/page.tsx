import { type Metadata, type NextPage } from 'next'
import ProjectCard from '@components/Projects/ProjectCard'
import React from 'react'
import type { Project } from '@typings/project'

export const metadata: Metadata = {
    title: 'Projects',
}

const Projects: NextPage = () => {

    const portfolioProjects: Project[] = [
        {
            name: 'Portfolio',
            description: 'This website! My most ambitious project to date, I wanted to build a portfolio that was both visually appealing and functional. I also wanted to use this project as an opportunity to build a full-stack type-safe application with Next.js and TypeScript. Next, I plan to add a blog to this site.',
            documentation: 'https://github.com/DandyChux/ceokoroji-portfolio',
            skills: ['Next.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL'],
        },
        {
            name: 'BlackStack Software Solutions',
            description: 'A website for my freelance software development LLC. Built with Next.js + TailwindCSS. I wanted to build a website that was simple and easy to navigate. Currently still in development.',
            documentation: 'https://github.com/blackstack-software-solutions/blackstack-site',
            deployment: 'https://blackstacksolutions.com',
            skills: ['Next.js', 'TRPC', 'TailwindCSS', 'TypeScript', 'AWS S3', 'PostgreSQL', 'Supabase']
        },
        {
            name: 'Silvi',
            description: 'Silvi is an open-source web-app with the purpose of enabling tree stewards to easily track and report on their reforestation projects as well as sharing that progress with a broader community.',
            documentation: 'https://github.com/SilviProtocol/silvi-open',
            deployment: 'https://silvi.earth/',
            skills: ['Next.js', 'TypeScript', 'TailwindCSS', 'Django', 'Python']
        },
        {
            name: "Feedback App",
            description: "A simple feedback app built with Yew + Rust on the frontend and Actix + PostgreSQL on the backend. I built this project to deepen my understanding of Rust and to learn more about its web development capabilities. I also wanted to experiment with WASM in a production environment.",
            documentation: 'https://github.com/DandyChux/rust-fullstack-feedback',
            deployment: 'https://rust-feedback-app.onrender.com',
            skills: ['Rust', 'Yew', 'Actix', 'PostgreSQL', 'WASM', 'Docker']
        },
        {
            name: "Todo List API",
            description: "A REST API for a todo list app. Built with Nest.js + MongoDB. Users can create an account, create todo lists, and add items to their lists. I built this project to learn more about Nest.js and MongoDB. I also wanted to deploy a Nest.js app to a Docker container.",
            documentation: 'https://github.com/Dandychux/todo-list-api',
            skills: ['Nest.js', 'MongoDB', 'TypeScript', 'Docker']
        },
        {
            name: "CLI Calculator",
            description: "A simple calculator built with Rust. This was my first Rust project and I wanted to build something that would allow me to learn the basics of the language. I also wanted to experiment with building a CLI app.",
            documentation: "https://github.com/DandyChux/cli_calculator",
            // deployment: ''
            skills: ['Rust']
        },
        {
            name: "Number Guessing Game",
            description: "A simple number guessing game built with Rust. I wanted to build a project with Rust where I could experiment with some of the language's features.",
            documentation: 'https://github.com/DandyChux/guessing_game',
            // deployment: '',
            skills: ['Rust']
        },
        {
            name: "Bookstore API",
            description: "A REST API for a bookstore. It allows a user to create an account, add books to their cart, and checkout. I built this project with Express.js + PostgreSQL hosted on Supabase. This was a great opportunity to delve into severless environments and learn more about Supabase.",
            documentation: 'https://github.com/Dandychux/bookstore-api',
            // deployment: 'https://bookstore-api.vercel.app/',
            skills: ['Express.js', 'PostgreSQL', 'Supabase', 'TypeScript']
        },
        {
            name: 'On Point Charter',
            description: 'On Point Charter is a boating business that offers private charters. This website was built with Next.js + Tailwind. I wanted to build a website that was simple and easy to navigate. Currently still in development.',
            documentation: 'https://github.com/DandyChux/charter-site',
            deployment: 'https://charter-site.vercel.app/',
            skills: ['Next.js', 'TypeScript', 'TailwindCSS']
        },
        {
            name: 'CyberBridge Initiative',
            description: 'A website for a fictional non-profit organization. Built with Vite + React for a class project.',
            documentation: 'https://github.com/DandyChux/LIS-4365-charity-project',
            deployment: 'https://cyberbridgeinitiative.netlify.app',
            skills: ['React', 'Vite', 'TypeScript', 'TailwindCSS']
        },
        {
            name: 'React to-do list',
            description: 'My first React project! A simple to-do list app. The focus of this project was to learn the basics of React state management.',
            documentation: 'https://github.com/DandyChux/task-app',
            deployment: 'https://dandychux-react-task-app.netlify.app/',
            skills: ['React', 'JavaScript', 'CSS']
        },
        {
            name: 'Fancy Carpet Calculator',
            description: 'An early favorite of mine when I was initially learning DOM manipulation in JavaScript. This project is a simple calculator that calculates the area of the carpet based on user input.',
            documentation: 'https://github.com/DandyChux/Fancy-carpet-calculator',
            deployment: 'https://fancy-carpet-calculator.netlify.app/',
            skills: ['HTML', 'CSS', 'JS']
        },
        {
            name: 'Madlib Madness',
            description: 'An HTML form using user input to generate a funny story!',
            documentation: 'https://github.com/DandyChux/Mad-Lib-Madness',
            deployment: 'https://mad-lib-madness.netlify.app/',
            skills: ['HTML', 'CSS', 'JS']
        },
        {
            name: 'Magic 8 Ball',
            description: 'A simple Magic 8 Ball app. The user asks a question and the app generates a random answer. At the time it was a huge step in my learning journey with JavaScript and the DOM.',
            documentation: 'https://github.com/DandyChux/Magic-8-Ball',
            deployment: 'https://dandychux-magic8ball.netlify.app/',
            skills: ['HTML', 'CSS', 'JS']
        },
        {
            name: 'API Photo Gallery',
            description: 'This project was my first attempt at using an API. I used the Unsplash API to generate a photo gallery. I was learning CSS animations at the time so I added a few simple animations to the project.',
            documentation: 'https://github.com/DandyChux/Photography-Website',
            deployment: 'https://ceokoroji-photo-grid.netlify.app/',
            skills: ['HTML', 'CSS', 'JS']
        },
    ]

    return (
        <>
            <h1 className='text-3xl mt-3 md:text-[5rem] w-full text-center leading-normal font-extrabold'>
                My Projects
            </h1>
            
            <div className='grid gap-3 pt-3 mt-3 md:grid-cols-3 lg:w-2/3'>
                {portfolioProjects.map((project, index) => (
                    <ProjectCard 
                        key={index}
                        {...project}
                    />
                ))}
            </div>
        </>
    )

}

export default Projects