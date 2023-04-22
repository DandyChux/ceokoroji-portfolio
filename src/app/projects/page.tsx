import { type NextPage } from 'next'
import ProjectCard from '@modules/Projects/ProjectCard'
import React from 'react'

interface Project {
    name: string;
    description: string;
    documentaton: string;
    deployment: string;
}

const Projects: NextPage = () => {

    const portfolioProjects: Project[] = [
        {
            name: 'React to-do list',
            description: 'A simple to-do list in React',
            documentaton: 'https://github.com/DandyChux/task-app',
            deployment: 'https://dandychux-react-task-app.netlify.app/',
        },
        {
            name: 'Fancy Carpet Calculator',
            description: 'An interactive carpet area calculator built on HTML + CSS',
            documentaton: 'https://github.com/DandyChux/Fancy-carpet-calculator',
            deployment: 'https://fancy-carpet-calculator.netlify.app/',
        },
        {
            name: 'Madlib Madness',
            description: 'An HTML form using user input to generate a funny story!',
            documentaton: 'https://github.com/DandyChux/Mad-Lib-Madness',
            deployment: 'https://mad-lib-madness.netlify.app/',
        },
        {
            name: 'API Photo Gallery',
            description: 'A photo gallery that uses the Unsplash API to fetch images in a grid layout',
            documentaton: 'https://github.com/DandyChux/Photography-Website',
            deployment: 'https://ceokoroji-photo-grid.netlify.app/',
        },
        {
            name: 'Magic 8 Ball',
            description: 'A magic 8 ball made using HTML, CSS, & JS',
            documentaton: 'https://github.com/DandyChux/Magic-8-Ball',
            deployment: 'https://dandychux-magic8ball.netlify.app/',
        },
        {
            name: 'On Point Charter',
            description: 'A website for a boat chartering company. Built with Next.js + React Bootstrap',
            documentaton: 'https://charter-site.vercel.app',
            deployment: 'https://charter-site.vercel.app/',
        },
        {
            name: 'CyberBridge Initiative',
            description: 'A website for a fictional non-profit organization. Built with Vite + React for a class project.',
            documentaton: 'https://github.com/DandyChux/LIS-4365-charity-project',
            deployment: 'https://cyberbridgeinitiative.netlify.app',
        }
    ]

    return (
        <>
            <h1 className='text-2xl md:text-[5rem] leading-normal font-extrabold text-gray-900'>
                My Projects
            </h1>
            <div className='grid gap-3 pt-3 mt-3 text-center md:grid-cols-3 lg:w-2/3'>
                {portfolioProjects.map((project, index) => (
                    <ProjectCard 
                        key={index}
                        name={project.name}
                        description={project.description}
                        documentation={project.documentaton}
                        deployment={project.deployment}
                    />
                ))}
            </div>
        </>
    )

}

export default Projects