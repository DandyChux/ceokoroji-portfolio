import React from 'react';
import Pill from '@components/common/Pill';
import type { Project } from '@utils/types/project';
import Link from 'next/link';
// import Image from 'next/image';

const ProjectCard: React.FC<Project> = ({ name, description, documentation, deployment, skills }) => {

    return (
        <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-900 rounded-lg shadow-xl motion-safe:hover:scale-105">
            <h2 className="text-lg text-red-550">{name}</h2>
            <p className="text-sm text-gray-600">{description}</p>
            <Link
                className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
                href={documentation}
                target="_blank"
                rel="noreferrer"
            >
                See Code
            </Link>
            {deployment && (
                <Link
                    className="mt-3 mb-2 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
                    href={deployment}
                    target="_blank"
                    rel="noreferrer"
                >
                    Live Demo
                </Link>
            )}
            <menu>
                {skills?.map((skill, index) => (
                    <Pill key={index} label={skill} />
                ))}
            </menu>
        </section>
    );
};

export default ProjectCard;