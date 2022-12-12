import * as React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
    name: string;
    description: string;
    documentation: string;
    deployment: string;
}

const ProjectCard = ({ name, description, documentation, deployment }: ProjectCardProps) => {
    return (
        <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-900 rounded shadow-xl motion-safe:hover:scale-105">
            <h2 className="text-lg text-red-550">{name}</h2>
            <p className="text-sm text-gray-600">{description}</p>
            <a 
                className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
                href={documentation}
                target="_blank"
                rel="noreferrer"
            >
                See Code
            </a>
            <a 
                className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
                href={deployment}
                target="_blank"
                rel="noreferrer"
            >
                Live Demo
            </a>
        </section>
    );
};

export default ProjectCard;