import axiosCostume from "@/axiosCostume";
import Chart from "@/components/chart";
import { itJawabKuisioner, itPenguji } from "@/typeData/itIndikator";
import { url } from "@/util/env";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Penilaian = () => {
  const [penguji, setPenguji] = useState<itPenguji[]>([]);

  const router = useRouter();

  const loadPenguji = () => {
    axiosCostume.get(`${url}penguji/`).then((res: AxiosResponse<any, any>) => {
      setPenguji(res.data.data);
    });
  };

  useEffect(() => {
    loadPenguji();
  }, []);

  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <Chart />
          <br />
          <br />
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Nama penguji</th>
                <th>Jabatan</th>
                <th>Tanggal Pengujian</th>
                <th>Hasil penilaian </th>
              </tr>
            </thead>
            <tbody>
              {penguji.map((data, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{data.nama_penguji}</td>
                  <td>{data.jabatan}</td>
                  <td>{data.tanggal_uji}</td>
                  <td>
                    <button
                      className="btnSimpan"
                      onClick={() => router.push(`/penguji/${data.id_penguji}`)}
                    >
                      Resume penilaian
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Penilaian;
