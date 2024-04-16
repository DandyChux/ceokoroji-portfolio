"use client"

import { StarIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Badge } from "./ui/badge";

interface GithubBageProps {
    repo: string;
}

export const GithubBadge: React.FC<GithubBageProps> = ({ repo }) => {
    const { data } = useQuery({
        queryKey: ['repo-stars', repo],
        queryFn: () => fetch(`https://api.github.com/repos/DandyChux/${repo}`).then(res => res.json())
    })

    return (
        <Badge variant={'outline'} className='hover:text-accent hover:border-accent transition-all duration-300'>
            <StarIcon className="w-4 h-4 mr-1" />
            <span className="font-bold text-sm">{data?.stargazers_count ?? 0}</span>
        </Badge>
    )
}