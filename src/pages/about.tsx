import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import Button from '@modules/common/Button';
import Headshot from '@public/headshot.jpeg';
import Image from 'next/image';
import Link from 'next/link';

const About: NextPage = () => {

    return (
        <>
            <Head>
                <title>CEOkoroji | About </title>
            </Head>

            <h1 className="text-xl md:text-[5rem] leading-normal text-center font-extrabold text-gray-900">
                About Me
            </h1>
            <main className="container flex mx-auto h-fit pl-4">
                <Image src={Headshot} alt="My headshot" className="float-left" />
                <article className="text-center p-4 float-right w-1/2">
                    <p>Hi there my name is Chukwuma Okoroji, or Chuck for short. I was born to Nigerian immigrants in Yonkers, NY, but was primarily raised in Tallahassee, FL. I currently reside in Tampa, FL where I attend the preeiment University of South Florida in pursuit of a Bachelors in Information Sciences.</p>
                    <p>From a young age, I was always drawn to technology, often messing around with whatever computer was in the house.I was a very enthusiastic member of the robotics club through my years of elementary as well. As a teenager, I built on that interest through computer science courses taught at my high school.</p>
                    <p>Professionally speaking, I am proficient with a variety of tools and languages. Just like every other engineer, I love my Javascript and over the past year have expanded that to Typescript. I have used frameworks such as Angular, React, and Next.js to build responsive or functional web applications. </p>
                    <p>Though I have far left to go, I am proud of my progress thus far, so please take a <Link href="https://www.icloud.com/iclouddrive/01eLKZZdNlzIHTcMJ8NmpYsGw#CEOkoroji%5FResume" download="CEOkoroji Resume" className="underline" target="_blank">look at my resume here</Link> and <Link href="https://www.linkedin.com/in/chukwuma-okoroji-a3a6931bb/" className="underline" target="_blank">my LinkedIn here</Link>.</p>
                </article>
            </main>
        </>
    )
}

export default About;