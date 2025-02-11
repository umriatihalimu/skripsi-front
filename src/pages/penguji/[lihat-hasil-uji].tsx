import axiosCostume from "@/axiosCostume";
import { itJawabKuisioner, itPenguji } from "@/typeData/itIndikator";
import { itSkor } from "@/typeData/itPenilaian";
import { url } from "@/util/env";
import axios, { AxiosResponse } from "axios";
import { log } from "console";
import React, { useEffect, useState } from "react";

const LihatHasilUji = () => {
  const [skor, setSkor] = useState<itSkor[]>([]);
  const [penguji, setPenguji] = useState<itPenguji>();

  const id =
    typeof window != "undefined" ? window.location.pathname.split("/") : "";

  const loadKuisioner = () => {
    axiosCostume
      .get(`${url}penguji/skor/${id[2]}`)
      .then((res: AxiosResponse<any, any>) => {
        setSkor(res.data.data.skor);
        setPenguji(res.data.data.penguji);
      });
  };

  useEffect(() => {
    loadKuisioner();
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <div>
          <p>Nama : {penguji?.nama_penguji}</p>
          <p>Jabatan : {penguji?.jabatan}</p>
          <p>Tanggal uji : {penguji?.tanggal_uji}</p>
        </div>
        {skor.map((data, i) => (
          <>
            <br />
            <div key={i} className="font-bold text-xl">
              {data.tb_indikator.nama_indikator} (Skor : {data.skor.toFixed(1)})
            </div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Level</th>
                  <th>Soal</th>
                  <th>Jawaban</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {data.tb_indikator.jawab_kuisioner.map((soal, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{soal.level}</td>
                    <td>{soal.soal}</td>
                    <td>{soal.jawaban}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ))}
      </div>
    </>
  );
};

export default LihatHasilUji;
