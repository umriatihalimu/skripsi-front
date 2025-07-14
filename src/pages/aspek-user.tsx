import { itAspek, itDomain } from "@/typeData/itIndikator";
import { MdOutlineDelete } from "react-icons/md";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { url } from "@/util/env";
import axiosCostume from "@/axiosCostume";

const AspekUser = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [dataAspek, setDataAspek] = useState<itAspek[]>([]);
  const [dataAspek2, setDataAspek2] = useState<itAspek[]>([]);
  const [dataDomain, setDataDomain] = useState<itDomain[]>([]);
  const [idDomain, setIdDomain] = useState<string>("");
  const [aspek, setAspek] = useState<string>("");
  const [filter, setFilter] = useState<number>(0);

  const loadAspek = () => {
    axiosCostume.get(`${url}aspek/`).then((res: AxiosResponse<any, any>) => {
      setDataAspek(res.data);
      setDataAspek2(res.data);
    });
    axiosCostume.get(`${url}domain/`).then((res: AxiosResponse<any, any>) => {
      setDataDomain(res.data);
    });
  };
  useEffect(() => {
    loadAspek();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between pb-3">
          <h1>Aspek SPBE</h1>
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
            {dataAspek.map((data, i) =>
              filter == 0 ? (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data.aspek}</td>
                  <td>{data.tb_domain.domain}</td>
                </tr>
              ) : (
                filter == data.tb_domain.id_domain && (
                  <>
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data.aspek}</td>
                      <td>{data.tb_domain.domain}</td>
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

export default AspekUser;
