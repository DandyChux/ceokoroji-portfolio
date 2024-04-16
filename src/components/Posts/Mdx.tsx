import clsx from 'clsx'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CustomTabs as Tabs } from '~components/common/custom-tabs'
import Pill from '~components/common/Pill'
import { Button } from '~components/ui/button'

const components = {
    Image,
    Button,
    Link,
    Tabs,
    Pill,
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 
            className={clsx(
                'mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 
            className={clsx(
                'mt-10 scroll-m-20 pb-1 text-2xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 
            className={clsx(
                'mt-10 scroll-m-20 pb-1 text-xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p 
            className={clsx(
                'mt-6 text-lg leading-relaxed',
                className
            )}
            {...props}
        />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol 
            className={clsx(
                'mt-6 text-lg leading-relaxed',
                className
            )}
            {...props}
        />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul 
            className={clsx(
                'mt-6 text-lg leading-relaxed',
                className
            )}
            {...props}
        />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
        <li 
            className={clsx(
                'mt-2',
                className
            )}
            {...props}
        />
    ),
}

interface MdxProps {
    code: string;
}

export function Mdx({ code }: MdxProps) {
    const MDXComponent = useMDXComponent(code)

    return (
        <div className='mt-6 flex flex-col justify-between'>
            <MDXComponent components={components} />
        </div>
    )
}