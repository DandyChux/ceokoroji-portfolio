import type { Metadata, NextPage } from "next"
import React from 'react'
import Headshot from '@public/ceokoroji_headshot.png'
import Image from 'next/image'
import Link from 'next/link'
import type { Tab } from "@typings/tabs"
import Tabs from "@components/common/Tabs"
import Button from "@components/common/Button"

export const metadata: Metadata = {
    title: 'About'
}

const About: NextPage = () => {

    const skills = [
        {
            category: 'Languages',
            list: ['JavaScript', 'TypeScript', 'Python', 'C#']
        },
        {
            category: 'Frontend',
            list: ['HTML', 'CSS', 'Angular', 'Solid.js', 'React', 'Next.js', 'TailwindCSS', 'Bootstrap']
        },
        {
            category: 'Backend',
            list: ['Node.js', 'Express', 'Nest.js', 'ASP.NET Core', 'Django', 'MySQL', 'PostgreSQL', 'MongoDB']
        },
        {
            category: 'Tools',
            list: ['Docker', 'VS Code', 'Git', 'Postman', 'Figma']
        }
    ]

    const tabs: Tab[] = [
        {
            label: 'Languages',
            content: (
                <>
                    <div className='grid gird-cols-2 md:grid-cols-4 gap-4 mb-6'>
                        {skills[0]?.list.map((skill, index) => (
                            <div key={index} className='flex items-center justidy-center py-2 px-4 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-300'>
                                {skill}
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            label: 'Frontend',
            content: (
                <>
                    <div className='grid gird-cols-2 md:grid-cols-4 gap-4 mb-6'>
                        {skills[1]?.list.map((skill, index) => (
                            <div key={index} className='flex items-center justidy-center py-2 px-4 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-300'>
                                {skill}
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            label: 'Backend',
            content: (
                <>
                    <div className='grid gird-cols-2 md:grid-cols-4 gap-4 mb-6'>
                        {skills[2]?.list.map((skill, index) => (
                            <div key={index} className='flex items-center justidy-center py-2 px-4 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-300'>
                                {skill}
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            label: 'Tools',
            content: (
                <>
                    <div className='grid gird-cols-2 md:grid-cols-4 gap-4 mb-6'>
                        {skills[3]?.list.map((skill, index) => (
                            <div key={index} className='flex items-center justidy-center py-2 px-4 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-300'>
                                {skill}
                            </div>
                        ))}
                    </div>
                </>
            ),
        }
    ]

    return (
        <>
            <h1 className="text-3xl md:text-[5rem] leading-normal text-center font-extrabold text-gray-900 mb-8">
                About Me
            </h1>
            
            <div className="flex flex-col items-center justify-center mb-4">
                <div className='flex flex-wrap justify-center mb-4'>
                    <Image src={Headshot} alt="My headshot" width={350} height={250} className='rounded-sm border border-gray-200 shadow-lg shadow-gray-400' />
                    <article className="text-center p-4 md:float-right md:w-1/3">
                        <p className='my-4 text-gray-700 text-base font-medium'>
                            I recently graduated from the University of South Florida with a B.S. in Information Science. I am currently working as a Financial Systems Developer at Jabil, where I support the financial systems used by the company&apos;s global finance team. I am also a freelance web developer, where I work with clients to build websites and web applications. I am passionate about using technology to solve problems and make a positive impact on the lives of others.
                        </p>

                        <hr />

                        <p className='my-4 text-gray-700 text-base font-medium'>
                            Inspiration for my career path came from my natural curiosity and desire to learn. I was always interested in how technology worked and how I could use it to solve problems. I fell in love with the idea of being able to create something from nothing.
                        </p>

                        <p className='my-4 text-gray-700 text-base font-medium'>
                            Blending a vibrant personality and an unwavering work ethic, I craft efficient digital solutions. As a full-stack developer, I strive each day to deliver cutting-edge, user-friendly applications that enhance and experience of users and empower businesses to achieve their goals. I&apos;m driven to work on projects that aim to make a real impact on the lives of their users.
                        </p>
                    </article>
                </div>

                <div className='flex'>
                    <Button variant={'outline'} size='lg'>
                        <Link href="https://www.icloud.com/iclouddrive/01eLKZZdNlzIHTcMJ8NmpYsGw#CEOkoroji%5FResume" target='_blank' rel='noopener'>View My Resume</Link>
                    </Button>
                </div>
            </div>

            <div className='flex flex-col md:w-1/2'>
                <h2 className='text-xl font-bold mb-5'>
                    My Skills
                </h2>
                <Tabs tabData={tabs} />
            </div>
        </>
    )

}

export default About