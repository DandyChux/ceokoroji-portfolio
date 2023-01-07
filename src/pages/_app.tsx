import { type AppType } from "next/app";
import "../styles/globals.css";
import { Layout } from "@modules/common/Layout";
import React from "react";
import { AnimatePresence, motion } from 'framer-motion'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AnimatePresence>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimatePresence>
  );
};

export default MyApp;