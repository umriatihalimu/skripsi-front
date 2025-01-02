import { itAspek, itDomain } from "@/typeData/itIndikator";
import { MdOutlineDelete } from "react-icons/md";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { url } from "@/util/env";

const Aspek = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [dataAspek, setDataAspek] = useState<itAspek[]>([]);
  const [dataAspek2, setDataAspek2] = useState<itAspek[]>([]);
  const [dataDomain, setDataDomain] = useState<itDomain[]>([]);
  const [idDomain, setIdDomain] = useState<string>("");
  const [aspek, setAspek] = useState<string>("");
  const [filter, setFilter] = useState<number>(0);

  const loadAspek = () => {
    axios.get(`${url}aspek/`).then((res: AxiosResponse<any, any>) => {
      setDataAspek(res.data);
      setDataAspek2(res.data);
    });
    axios.get(`${url}domain/`).then((res: AxiosResponse<any, any>) => {
      setDataDomain(res.data);
    });
  };
  useEffect(() => {
    loadAspek();
  }, []);

  const _simpan = () => {
    axios
      .post(`${url}aspek/`, {
        id_domain: idDomain,
        aspek: aspek,
      })
      .then((res: AxiosResponse<any, any>) => {
        // console.log(res.data.data);
        if (res.data.status === "ok") {
          loadAspek();
          setModalOpen(false);
        }
      });
  };

  const hapus = (id: number) => {
    if (confirm("Apakah anda ingin menghapus data ini?")) {
    }
    axios.delete(`${url}aspek/${id}`).then((res: AxiosResponse<any, any>) => {
      if (res.data.status === "ok") {
        loadAspek();
      }
    });
  };

  return (
    <>
      <div>
        <div className="flex justify-between pb-3">
          <h1>Aspek SPBE</h1>
          <button className="btnTambah" onClick={() => setModalOpen(true)}>
            <p>Tambah data</p> <IoAdd size={24} />
          </button>
        </div>
        <button
          onClick={() => setFilter(0)}
          className={`${
            filter === 0 ? "bg-red-300" : "bg-gray-200"
          }   p-1 m-1 px-2 rounded-md`}
        >
          Semua domain
        </button>
        {dataDomain.map((data, i) => (
          <button
            onClick={() => setFilter(data.id_domain)}
            className={`${
              data.id_domain === filter ? "bg-red-300" : "bg-gray-200"
            }   p-1 m-1 px-2 rounded-md`}
            key={i}
          >
            {data.domain}
          </button>
        ))}

        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Aspek</th>
              <th>Domain</th>
            </tr>
          </thead>

          <tbody>
            {isModalOpen && (
              <tr>
                <td>*</td>
                <td>
                  <input
                    onChange={(e) => setAspek(e.target.value)}
                    placeholder="Masukkan aspek..."
                    autoFocus
                    type="text"
                    className="p-1 border border-gray-300 rounded"
                  />
                </td>

                <td>
                  <select
                    className="p-1"
                    onChange={(e) => setIdDomain(e.target.value)}
                  >
                    <option value="">Pilih Domain</option>
                    {dataDomain.map((data, i) => (
                      <option value={data.id_domain} key={i}>
                        {data.domain}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="flex justify-end">
                  <button className="btnSimpan" onClick={_simpan}>
                    Simpan
                  </button>
                </td>
              </tr>
            )}
            {dataAspek.map((data, i) =>
              filter == 0 ? (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data.aspek}</td>
                  <td>{data.tb_domain.domain}</td>
                  <td className="flex justify-end">
                    <button
                      onClick={() => hapus(data.id_aspek)}
                      className="flex items-center bg-red-500 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-red-400"
                    >
                      <MdOutlineDelete size={20} /> Hapus
                    </button>
                  </td>
                </tr>
              ) : (
                filter == data.tb_domain.id_domain && (
                  <>
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data.aspek}</td>
                      <td>{data.tb_domain.domain}</td>
                      <td className="flex justify-end">
                        <button
                          onClick={() => hapus(data.id_aspek)}
                          className="flex items-center bg-red-500 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-red-400"
                        >
                          <MdOutlineDelete size={20} /> Hapus
                        </button>
                      </td>
                    </tr>
                  </>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Aspek;
