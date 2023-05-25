import React from 'react'
import Image from 'next/image'
import Button from '@components/common/Button'
import Link from 'next/link'
import Tabs from '@components/common/Tabs'
import Pill from '@components/common/Pill'
import { useMDXComponent } from 'next-contentlayer/hooks'

const components = {
    Image,
    Button,
    Link,
    Tabs,
    Pill
}

interface MdxProps {
    code: string;
}

export function Mdx({ code }: MdxProps) {
    const MDXComponent = useMDXComponent(code)

    return (
        <div>
            <MDXComponent components={components} />
        </div>
    )
}