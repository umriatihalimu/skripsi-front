import Head from "next/head";
import Image from "next/image";
import React from "react";

const errorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Head>
        <title>Error Page</title>
      </Head>
      <div className="flex flex-col items-center justify-center ">
        <Image src={"/404.png"} alt="404" width={350} height={350} />
        <p className="font-bold text-xl">404 | Halaman tidak ditemukan</p>
      </div>
    </div>
  );
};

export default errorPage;
