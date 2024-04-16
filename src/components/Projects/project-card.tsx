import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '~/lib/utils';
import Pill from '~components/common/Pill';
import { GithubBadge } from '~components/github-badge';
import type { Project } from '~typings/project';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '../ui/card';
import { Skeleton } from '../ui/skeleton';

type ProjectCardProps = React.HTMLAttributes<HTMLDivElement> & Project;

const ProjectCard: React.FC<ProjectCardProps> = ({ image, name, description, documentation, deployment, skills, className }) => {

    return (
        <Card className={cn("relative flex flex-col group w-full max-w-[50rem] text-center justify-between p-4 duration-500 border-2 border-secondary rounded-lg shadow-xl motion-safe:hover:scale-105", className)}>
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

            <CardHeader>
                <div className='relative w-full mx-auto mb-4 h-[10rem]'>
                    {image ? (
                        <Image src={image} alt={name} fill className='aspect-square' />
                    ) : <Skeleton className='w-full h-full' />}
                </div>

                <CardTitle className="font-normal text-lg 2xl:text-xl">{name}</CardTitle>
                <CardDescription className='font-light text-sm text-muted'>{description}</CardDescription>
            </CardHeader>

            <CardContent>
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
            </CardContent>
        </Card>
    );
};

export default ProjectCard;