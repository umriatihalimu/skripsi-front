import "@/styles/globals.css";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";

import Layout from "@/components/layouts/Appshell/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
