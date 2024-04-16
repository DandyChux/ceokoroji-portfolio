"use client"

import { StarIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface GithubBageProps {
    repo: string;
}

export const GithubBadge: React.FC<GithubBageProps> = ({ repo }) => {
    const { data } = useQuery({
        queryKey: ['repo-stats', repo],
        queryFn: () => fetch(`https://api.github.com/repos/DandyChux/${repo}`).then(res => res.json())
    })

    return (
        <Tooltip>
            <TooltipTrigger>
                <Badge variant={'outline'} className='hover:text-accent hover:border-accent transition-all duration-300'>
                    <StarIcon className="w-4 h-4 mr-1" />
                    <span className="font-bold text-sm">{data?.stargazers_count ?? 0}</span>
                </Badge>
            </TooltipTrigger>
            <TooltipContent>
                <p className='text-sm'>Stars: {data?.stargazers_count ?? 0}</p>
                <p className='text-sm'>Forks: {data?.forks_count ?? 0}</p>
                <p className='text-sm'>Watchers: {data?.watchers_count ?? 0}</p>

                <a href={data?.html_url} target="_blank" rel="noreferrer" className='text-sm hover:text-accent underline'>View on Github</a>
            </TooltipContent>
        </Tooltip>
    )
}