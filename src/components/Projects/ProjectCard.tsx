import React from 'react';
import Pill from '@components/common/Pill';
import type { Project } from '@typings/project';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { GithubBadge } from '@components/github-badge';

const ProjectCard: React.FC<Project> = ({ image, name, description, documentation, deployment, skills }) => {

    return (
        <section className="relative flex flex-col group w-full max-w-[50rem] text-center justify-between p-4 duration-500 border-2 border-primary rounded-lg shadow-xl motion-safe:hover:scale-105">
            {image ? (
                <div className='relative w-full h-48 mb-4'>
                    <Image src={image} alt={name} fill className='object-cover' />
                </div>
            ) : null}
            {deployment ? (
                <>
                    <ArrowUpRightIcon className='w-4 h-4 self-end group-hover:text-accent transition-all duration-500' />
                    <Link
                        className="text-sm underline decoration-dotted underline-offset-2"
                        href={deployment}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span className="absolute inset-0"></span>
                    </Link>
                </>
            ) : null}

            <h2 className="text-lg text-accent">{name}</h2>
            <p className="text-sm text-muted">{description}</p>

            <div>
                <Link
                    className="relative text-sm underline decoration-dotted underline-offset-2"
                    href={documentation}
                    target="_blank"
                    rel="noreferrer"
                >
                    <GithubBadge
                        repo={documentation.split('/').pop() as string}
                    />
                </Link>
                <menu>
                    {skills?.map((skill, index) => (
                        <Pill key={index} label={skill} />
                    ))}
                </menu>
            </div>
        </section>
    );
};

export default ProjectCard;