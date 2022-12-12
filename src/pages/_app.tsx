import { type AppType } from "next/app";
import "../styles/globals.css";
import { Layout } from "@modules/common/Layout";
import React from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;