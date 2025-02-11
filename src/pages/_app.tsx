import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";

import Layout from "@/components/layouts/Appshell/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router.pathname);
  if (String(router.pathname).includes("/login")) {
    return <Component {...pageProps} />;
  } else
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
}
