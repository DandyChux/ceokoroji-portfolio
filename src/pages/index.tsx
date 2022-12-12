import type { NextPage } from "next";
import React from 'react';
import Head from "next/head";

const Home: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>Chukwuma Okoroji</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-900">
          Chukwuma Okoroji
        </h1>
        
      </main>
    </>
  );
};

export default Home;