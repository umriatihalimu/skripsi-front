import { url } from "@/util/env";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React, { FormEvent, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const kirim = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${url}login/`, {
        username: username,
        password: password,
      })
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.status == "login_gagal") {
          alert("password/username salah");
        } else if (res.data.status == "login_berhasil") {
          Cookies.set("cobit_token", res.data.token, { expires: 23 / 24 });
          localStorage.setItem("token", res.data.token);
          alert("login berhasil");
          router.push("/dashboard");
        }
      });
  };
  return (
    <>
      {/*  */}
      <div className="grid grid-cols-2 h-screen">
        {/* kiri */}
        <div className="bg-gradient-to-b from-blue-600 to-blue-400  h-screen items-center justify-center flex">
          <div className="flex  bg-white border items-center justify-center rounded-md h-[400px] w-[300px] shadow-sm">
            <p className="text-4xl font-bold text-center">
              Sistem <br />
              Penilaian Kematangan SPBE
            </p>
          </div>
        </div>

        {/* kanan */}
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col p-3 gap-4 border items-center justify-center w-[500px]">
            <div className="flex gap-3">
              <img src="/kota.jpg" alt="Kota" width={90} height={90} />
              <img src="/univ.png" alt="Universitas" width={90} height={90} />
            </div>
            <form
              onSubmit={kirim}
              className="flex gap-y-2 flex-col items-center"
            >
              <h2 className=" font-extrabold text-2xl pb-3">Selamat Datang</h2>
              <input
                type="text"
                placeholder="Username"
                className="border p-2 rounded-sm w-[350px]"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded-sm w-[350px]"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="p-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold w-[350px]">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
