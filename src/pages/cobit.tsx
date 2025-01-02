import { useRouter } from "next/router";
import React from "react";
import { FaRocket } from "react-icons/fa6";

const Cobit = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex gap-y-2 flex-col items-center justify-center pt-8">
        <h3 className="text-xl font-semibold text-center whitespace-pre-line">
          {`HITUNG KEMATANGAN SISTEM PEMERINTAHAN BERBASIS ELEKTRONIK
            MENGGUNAKAN COBIT 5`}
        </h3>
        <img src="/img.jpg" alt="" style={{ width: "280px" }} />
        <p>Mulai hitung kematangan SPBE</p>
        <button
          onClick={() => router.push("/pilih-domain")}
          className="flex items-center gap-2 p-2 bg-red-500 hover:bg-red-400 font-semibold text-white rounded-md px-2 mt-1 "
        >
          Mulai sekarang <FaRocket size={16} />
        </button>
      </div>
      <div></div>
    </>
  );
};

export default Cobit;
