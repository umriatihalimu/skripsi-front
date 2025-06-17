import axiosCostume from "@/axiosCostume";
import { itAspek, itDomain, itIndikator } from "@/typeData/itIndikator";
import { url } from "@/util/env";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

const Indikator = () => {
  const router = useRouter();

  const [add, setAdd] = useState<boolean>(false);
  const [dataIndikator, setDataIndikator] = useState<itIndikator[]>([]);
  const [indikator, setIndikator] = useState<string>();
  const [namaIndikator, setNamaIndikator] = useState<string>();
  const [idDomain, setIdDomain] = useState<string>("");
  const [idAspek, setIdAspek] = useState<string>("");
  const [domain, setDomain] = useState<itDomain[]>([]);
  const [aspek, setAspek] = useState<itAspek[]>([]);
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
    axiosCostume.get(`${url}aspek/`).then((res: AxiosResponse<any, any>) => {
      setAspek(res.data);
      // console.log(res.data);
    });
  };

  const _simpan = () => {
    axiosCostume
      .post(`${url}indikator/`, {
        id_domain: Number(idDomain),
        id_aspek: Number(idAspek),
        indikator: indikator,
        nama_indikator: namaIndikator,
      })
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.status === "ok") {
          loadData();
          setAdd(false);
          alert("Data berhasil disimpan di localhost");
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
      });
  };

  const hapus = (id: number) => {
    axiosCostume
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
      <div className="flex flex-col justify-between pb-3 w-full">
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
        <table className="table w-full min-w-[800px]">
          {/* head */}
          <thead>
            <tr>
              <th>Indikator</th>
              <th>Nama Indikator</th>
              <th>Aspek</th>
              <th>Domain</th>
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
                    className="p-1  border border-gray-300 rounded"
                  />
                </td>
                <td>
                  <select
                    className="p-1 max-w-[200px] "
                    onChange={(e) => setIdAspek(e.target.value)}
                  >
                    {aspek.map((data, i) => (
                      <option value={data.id_aspek} key={i}>
                        {data.aspek}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="p-1 max-w-[200px] "
                    onChange={(e) => setIdDomain(e.target.value)}
                  >
                    {domain.map((data, i) => (
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
            {dataIndikator.map((data, i: any) => {
              //console.log("data", data);
              // if (!data.tb_aspek) {
              //   console.warn("tb_aspek null untuk data:", data);
              // }
              // console.log(data);

              // console.log({ idAspek, idDomain, indikator, namaIndikator });

              return filter == 0 ? (
                <tr key={i}>
                  <td>
                    <button
                      onClick={() =>
                        router.push(
                          "/" + data.id_indikator + "/tambah-kuisioner"
                        )
                      }
                      className="flex items-center bg-blue-400 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-blue-300"
                    >
                      <IoIosAdd size={20} /> Tambah
                    </button>
                  </td>
                  <td>{data.indikator}</td>
                  <td> {data.nama_indikator}</td>
                  <td>{data.tb_aspek?.aspek}</td>
                  <td>{data.tb_aspek?.tb_domain?.domain}</td>
                  <td className="flex justify-end  ">
                    <button
                      onClick={() => hapus(data.id_indikator)}
                      className="flex items-center bg-red-500 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-red-400"
                    >
                      <MdOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ) : (
                filter == data.tb_aspek.tb_domain.id_domain && (
                  <tr key={i}>
                    <td>
                      <button
                        onClick={() =>
                          router.push(
                            "/" + data.id_indikator + "/tambah-kuisioner"
                          )
                        }
                        className="flex items-center bg-blue-400 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-blue-300"
                      >
                        <IoIosAdd size={20} /> Tambah
                      </button>
                    </td>
                    <td>{data.indikator}</td>
                    <td> {data.nama_indikator}</td>
                    <td>{data.tb_aspek?.aspek}</td>
                    <td>{data.tb_aspek?.tb_domain?.domain}</td>
                    <td className="flex justify-end">
                      <button
                        onClick={() => hapus(data.id_indikator)}
                        className="flex items-center bg-red-500 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-red-400"
                      >
                        <MdOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Indikator;
