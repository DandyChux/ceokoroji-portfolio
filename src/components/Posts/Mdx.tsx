import React from 'react'
import Image from 'next/image'
import Button from '@components/common/Button'
import Link from 'next/link'
import Tabs from '@components/common/Tabs'
import Pill from '@components/common/Pill'
import { useMDXComponent } from 'next-contentlayer/hooks'
import clsx from 'clsx'

const components = {
    Image,
    Button,
    Link,
    Tabs,
    Pill,
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 
            className={clsx(
                'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        />
    )
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