import axiosCostume from "@/axiosCostume";
import { url } from "@/util/env";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const TambahUser = () => {
  const [isNamaUser, setNamaUser] = useState<string>("");
  const [isUsername, setUsername] = useState<string>("");
  const [isPassword, setPassword] = useState<string>("");
  const [isTipeUser, setTipeUser] = useState<string>("user");
  const router = useRouter();

  const _kirim = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosCostume
      .post(url + "user/create-user", {
        nama_user: isNamaUser,
        username: isUsername,
        password: isPassword,
        tipe_user: isTipeUser,
      })
      .then((res) => {
        if (res.data.status == "ok") {
          alert("Data berhasil ditambahkan");
          router.back();
        } else {
          alert("Data gagal ditambahkan");
        }
      });
  };
  return (
    <>
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <h2>Tambah Data User</h2>
        <form onSubmit={_kirim} className="space-y-4 w-[400px] ">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setNamaUser(e.target.value)}
              placeholder="Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipe user
            </label>
            <select
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setTipeUser(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default TambahUser;
