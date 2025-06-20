import axiosCostume from "@/axiosCostume";
import { itUser } from "@/typeData/itTipeDomain";
import { url } from "@/util/env";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

const User = () => {
  const [data, setData] = useState<itUser[]>([]);
  const router = useRouter();
  const _getUser = () => {
    axiosCostume.get(url + "user").then((res: AxiosResponse<any, any>) => {
      setData(res.data);
    });
  };
  const hapusDomain = (id: number) => {
    if (confirm("Apakah anda ingin menghapus user ini?")) {
      axiosCostume
        .delete(url + "user/" + id)
        .then((response: AxiosResponse<any, any>) => {
          if (response.data.status == "ok") {
            _getUser();
          }
        });
    }
  };

  useEffect(() => {
    _getUser();
  }, []);

  return (
    <>
      <div className="flex justify-between pb-3">
        <h1>Halaman User</h1>
        <button
          className="btnTambah"
          onClick={() => router.push("/tambah-user")}
        >
          <p>Tambah data</p> <IoAdd size={24} />
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Username</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((dataUser, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{dataUser.nama_user}</td>
              <td>{dataUser.username}</td>
              <td>
                <button
                  onClick={() => hapusDomain(dataUser.id_username)}
                  className="flex items-center bg-red-500 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-red-400"
                >
                  <MdOutlineDelete size={20} /> Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default User;
