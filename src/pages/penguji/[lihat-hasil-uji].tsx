import axiosCostume from "@/axiosCostume";
import { itJawabKuisioner, itPenguji } from "@/typeData/itIndikator";
import { itSkor } from "@/typeData/itPenilaian";
import { url } from "@/util/env";
import axios, { AxiosResponse } from "axios";
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

        {skor.map((data, i) => {
          // 1. Mengelompokkan soal berdasarkan level
          const groupedByLevel: Record<
            number,
            typeof data.tb_indikator.jawab_kuisioner
          > = data.tb_indikator.jawab_kuisioner.reduce((acc, soal) => {
            if (!acc[soal.level]) acc[soal.level] = [];
            acc[soal.level].push(soal);
            return acc;
          }, {} as Record<number, typeof data.tb_indikator.jawab_kuisioner>);

          // 2. Menentukan jumlah level yang dicapai (misalnya, level tertinggi dalam data)
          const maxLevel = Math.max(...Object.keys(groupedByLevel).map(Number));

          return (
            <div key={i}>
              <br />
              <div className="font-bold text-xl">
                {data.tb_indikator.nama_indikator} (Skor :{" "}
                {data.skor.toFixed(1)}%)
              </div>

              {/* 3. Looping sesuai jumlah level yang dicapai */}
              {[...Array(maxLevel)].map((_, levelIndex) => {
                const level = levelIndex + 1; // Level dimulai dari 1
                if (!groupedByLevel[level]) return null; // Lewati jika level tidak ada dalam data

                return (
                  <div key={level} className="mb-6">
                    <h3 className="font-semibold text-lg mt-4">
                      Level {level}
                    </h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Soal</th>
                          <th>Jawaban</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedByLevel[level].map((soal, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{soal.soal}</td>
                            <td>{soal.jawaban}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LihatHasilUji;

// {skor.map((data, i) => (
//   <>
//     <br />
//     <div key={i} className="font-bold text-xl">
//       {data.tb_indikator.nama_indikator} (Skor : {data.skor.toFixed(1)}
//       %)
//     </div>
//     <table className="table">
//       {/* head */}
//       <thead>
//         <tr>
//           <th></th>
//           <th>Level</th>
//           <th>Soal</th>
//           <th>Jawaban</th>
//         </tr>
//       </thead>
//       <tbody>
//         {/* row 1 */}
//         {data.tb_indikator.jawab_kuisioner.map((soal, index) => (
//           <tr key={index}>
//             <th>{index + 1}</th>
//             <td>{soal.level}</td>
//             <td>{soal.soal}</td>
//             <td>{soal.jawaban}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </>
// ))}
