import type { NextPage } from "next";
import ProjectCard from '@modules/Projects/ProjectCard';
import Head from "next/head";
import React from 'react';

const Projects: NextPage = () => {

    return (
        <>
            <Head>
                <title>CEOkoroji | Projects</title>
            </Head>

            <main className="container flex flex-col mx-auto h-screen p-4 justify-center items-center">
                <h1 className="text-2xl md:text-[5rem] leading-normal font-extrabold text-gray-900">
                    My Projects
                </h1>
                <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-3 lg:w-2/3">
                    <ProjectCard 
                        name="React to-do list"
                        description="A simple to-do list in React"
                        documentation="https://github.com/DandyChux/task-app"
                        deployment="https://dandychux-react-task-app.netlify.app/"
                    />
                    <ProjectCard 
                        name="Fancy Carpet Calculator"
                        description="Taking height and width as inputs, site generates a simple graphic representation"
                        documentation="https://github.com/DandyChux/Fancy-carpet-calculator"
                        deployment="https://fancy-carpet-calculator.netlify.app/"
                    />
                    <ProjectCard 
                        name="Madlib Madness"
                        description="An HTML form using user input to generate a funny story!"
                        documentation="https://github.com/DandyChux/Mad-Lib-Madness"
                        deployment="https://mad-lib-madness.netlify.app/"
                    />
                    <ProjectCard 
                        name="API Photo Library"
                        description="A simple photo grid layout using Picsum photos"
                        documentation="https://github.com/DandyChux/Photography-Website"
                        deployment="https://ceokoroji-photo-grid.netlify.app/"
                    />
                    <ProjectCard 
                        name="Magic 8 Ball"
                        description="A magic 8 ball made using HTML, CSS, & JS"
                        documentation="https://github.com/DandyChux/Magic-8-Ball"
                        deployment="https://dandychux-magic8ball.netlify.app/"
                    />
                </div>
            </main>
        </>
    )
}

export default Projects;