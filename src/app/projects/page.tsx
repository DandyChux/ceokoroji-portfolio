import { type NextPage } from 'next'
import ProjectCard from '@components/Projects/ProjectCard'
import React from 'react'
import type { Project } from '@utils/types/project'

const Projects: NextPage = () => {

    const portfolioProjects: Project[] = [
        {
            name: 'Silvi',
            description: 'Silvi is an open-source web-app with the purpose of enabling tree stewards to easily track and report on their reforestation projects as well as sharing that progress with a broader community.',
            documentation: 'https://github.com/SilviProtocol/silvi-core',
            // deployment: 'https://silvi.vercel.app/',
            skills: ['Next.js', 'TypeScript', 'React Bootstrap', 'Django']
        },
        {
            name: 'CyberBridge Initiative',
            description: 'A website for a fictional non-profit organization. Built with Vite + React for a class project.',
            documentation: 'https://github.com/DandyChux/LIS-4365-charity-project',
            deployment: 'https://cyberbridgeinitiative.netlify.app',
            skills: ['React', 'Vite', 'TypeScript', 'React Bootstrap']
        },
        {
            name: 'On Point Charter',
            description: 'A website for a boat chartering company. Built with Next.js + React Bootstrap',
            documentation: 'https://charter-site.vercel.app',
            deployment: 'https://charter-site.vercel.app/',
            skills: ['Next.js', 'TypeScript', 'React Bootstrap']
        },
        {
            name: 'Fancy Carpet Calculator',
            description: 'An interactive carpet area calculator built on HTML + CSS',
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
            description: 'A magic 8 ball made using HTML, CSS, & JS',
            documentation: 'https://github.com/DandyChux/Magic-8-Ball',
            deployment: 'https://dandychux-magic8ball.netlify.app/',
            skills: ['HTML', 'CSS', 'JS']
        },
        {
            name: 'React to-do list',
            description: 'A simple to-do list in React',
            documentation: 'https://github.com/DandyChux/task-app',
            deployment: 'https://dandychux-react-task-app.netlify.app/',
            skills: ['React']
        },
        {
            name: 'API Photo Gallery',
            description: 'A photo gallery that uses the Unsplash API to fetch images in a grid layout',
            documentation: 'https://github.com/DandyChux/Photography-Website',
            deployment: 'https://ceokoroji-photo-grid.netlify.app/',
            skills: ['HTML', 'CSS', 'JS']
        },
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
                        documentation={project.documentation}
                        deployment={project.deployment}
                        skills={project.skills}
                    />
                ))}
            </div>
        </>
    )

}

export default Projects