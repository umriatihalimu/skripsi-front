import axiosCostume from "@/axiosCostume";
import { itDomain, itIndikator } from "@/typeData/itIndikator";
import { url } from "@/util/env";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

const Indikator = () => {
  const [add, setAdd] = useState<boolean>(false);
  const [dataIndikator, setDataIndikator] = useState<itIndikator[]>([]);
  const [indikator, setIndikator] = useState<string>();
  const [namaIndikator, setNamaIndikator] = useState<string>();
  const [domain, setDomain] = useState<itDomain[]>([]);
  const [filter, setFilter] = useState<number>(0);

  const loadData = () => {
    axiosCostume
      .get(`${url}indikator/`)
      .then((res: AxiosResponse<any, any>) => {
        setDataIndikator(res.data);
      });
    axiosCostume.get(`${url}domain/`).then((res: AxiosResponse<any, any>) => {
      setDomain(res.data);
    });
  };

  const _simpan = () => {
    axiosCostume
      .post(`${url}indikator/`, {
        indikator: indikator,
        nama_indikator: namaIndikator,
      })
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.status === "ok") {
          loadData();
          setAdd(false);
        }
      });
  };

  const hapus = (id: number) => {
    axios
      .delete(`${url}indikator/${id}`)
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.status === "ok") {
          loadData();
        }
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between pb-3">
        <h1>Indikator SPBE</h1>
        <div className="justify-end flex">
          <button className="btnTambah" onClick={() => setAdd(!add)}>
            Tambah data <IoAdd size={24} />
          </button>
        </div>
        <div>
          <button
            onClick={() => setFilter(0)}
            className={`${
              filter == 0 ? "bg-red-300" : "bg-gray-200"
            } p-1 m-1 px-2 rounded-md`}
          >
            Semua Domain
          </button>
          {domain.map((data, i) => (
            <button
              key={i}
              onClick={() => {
                setFilter(data.id_domain);
              }}
              className={`${
                filter == data.id_domain ? "bg-red-300" : "bg-gray-200"
              } p-1 m-1 px-2 rounded-md`}
            >
              {data.domain}
            </button>
          ))}
        </div>
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>Indikator</th>
              <th>Nama Indikator</th>
              <th>Aspek</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {add && (
              <tr>
                <td>
                  <input
                    onChange={(e) => setIndikator(e.target.value)}
                    placeholder="Indikator..."
                    autoFocus
                    type="text"
                    className="p-1 w-[90px] border border-gray-300 rounded"
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => setNamaIndikator(e.target.value)}
                    placeholder="Masukkan nama indikator..."
                    autoFocus
                    type="text"
                    className="p-1 border border-gray-300 rounded"
                  />
                </td>
                <td>
                  <select className="p-1">
                    {domain.map((data, i) => (
                      <option key={i}>{data.domain}</option>
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
            {dataIndikator.map((data, i) =>
              filter == 0 ? (
                <tr key={i}>
                  <td>{data.indikator}</td>
                  <td> {data.nama_indikator}</td>
                  <td>{data.tb_aspek.aspek}</td>
                  <td className="flex justify-end  ">
                    <button
                      onClick={() => hapus(data.id_indikator)}
                      className="flex items-center bg-red-500 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-red-400"
                    >
                      <MdOutlineDelete size={20} /> Hapus
                    </button>
                  </td>
                </tr>
              ) : (
                filter == data.tb_aspek.tb_domain.id_domain && (
                  <tr key={i}>
                    <td>{data.indikator}</td>
                    <td> {data.nama_indikator}</td>
                    <td>{data.tb_aspek.aspek}</td>
                    <td className="flex justify-end  ">
                      <button
                        onClick={() => hapus(data.id_indikator)}
                        className="flex items-center bg-red-500 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-red-400"
                      >
                        <MdOutlineDelete size={20} /> Hapus
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Indikator;
