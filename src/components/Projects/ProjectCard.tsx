import React from 'react';
import Pill from '@components/common/Pill';
import type { Project } from '@typings/project';
import Link from 'next/link';
import Image from 'next/image';

const ProjectCard: React.FC<Project> = ({ image, name, description, documentation, deployment, skills }) => {

    return (
        <section className="flex flex-col text-center justify-center p-6 duration-500 border-2 border-gray-900 rounded-lg shadow-xl motion-safe:hover:scale-105">
            {image ? (
                <div className='relative w-full h-48 mb-4'>
                    <Image src={image} alt={name} fill className='object-cover' />
                </div>
            ) : null}
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