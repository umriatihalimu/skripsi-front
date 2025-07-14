import axiosCostume from "@/axiosCostume";
import { itAspek, itDomain, itIndikator } from "@/typeData/itIndikator";
import { url } from "@/util/env";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";

const IndikatorUser = () => {
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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between pb-3 w-full">
        <h1 className="pb-2">Indikator SPBE</h1>

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
            {dataIndikator.map((data, i: any) => {
              return filter == 0 ? (
                <tr key={i}>
                  <td>{data.indikator}</td>
                  <td> {data.nama_indikator}</td>
                  <td>{data.tb_aspek?.aspek}</td>
                  <td>{data.tb_aspek?.tb_domain?.domain}</td>
                </tr>
              ) : (
                filter == data.tb_aspek.tb_domain.id_domain && (
                  <tr key={i}>
                    <td>{data.indikator}</td>
                    <td> {data.nama_indikator}</td>
                    <td>{data.tb_aspek?.aspek}</td>
                    <td>{data.tb_aspek?.tb_domain?.domain}</td>
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

export default IndikatorUser;
