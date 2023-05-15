import { type NextPage } from "next"
import React from 'react'
import Headshot from '@public/headshot.jpeg'
import Image from 'next/image'
import Link from 'next/link'

const About: NextPage = () => {

    return (
        <>
            <h1 className="text-2xl md:text-[5rem] leading-normal text-center font-extrabold text-gray-900 mb-8">
                About Me
            </h1>
            <div className="flex justify-center">
                {/* <Image src={Headshot} alt="My headshot" className="float-left" width={350} height={250} /> */}
                <article className="text-center p-4 float-right w-1/3">
                    <p className='my-4 text-gray-700 text-base font-medium'>
                        Currently, I work as a Financial Systems Developer at Jabil, where I support the financial systems used by the company&apos;s global finance team. I recently completed my B.S. in Information Science from the University of South Florida.
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
        </>
    )

}

export default About