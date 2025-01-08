import React from "react";
import { itSoalKuesioner } from "./data-kuisioner";

type ab = {
  stateSoalKuisioner: itSoalKuesioner;
  stateSetSoalKuisioner: (data: any) => void;
  updateJawaban: any;
  stateBtn: boolean;
  kirim: (level: string, nextStateLevel: (data: any) => void) => void;
  nextStateLevel: (data: any) => void;
  stateSetBtn: (data: any) => void;
  level: string;
};

const Kuisioner: React.FC<ab> = ({
  stateSoalKuisioner,
  updateJawaban,
  stateSetSoalKuisioner,
  stateBtn,
  kirim,
  nextStateLevel,
  stateSetBtn,
  level,
}) => {
  if (Number(level) < 6)
    return (
      <>
        <div className="ms-3">
          <br />
          <br />
          <h1>Level {level}</h1>
          <p className="text-[16px]">{stateSoalKuisioner.deskripsi}</p>
          <br />
          {stateSoalKuisioner.indikator.map((data, i) => (
            <div key={i}>
              <p className="font-bold">{data.nama}</p>

              <table className="table">
                <thead>
                  <tr>
                    <td>No</td>
                    <td className="w-[480px]">Soal Kuisioner</td>
                    <td>Jawab</td>
                    <td className="w-[120px]">Hasil jawaban </td>
                  </tr>
                </thead>
                <tbody>
                  {data.pertanyaan.map((list, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{list.teks}</td>
                      <td>
                        {list.opsi_jawaban.map((jawaban, indexJ) => (
                          <button
                            key={indexJ}
                            className={`${
                              list.jawaban == jawaban &&
                              data.pertanyaan[index].id == list.id
                                ? "bg-red-500"
                                : "bg-green-500"
                            } text-white m-1 p-2  rounded-md px-3 `}
                            onClick={() =>
                              updateJawaban(
                                data.id,
                                list.id,
                                jawaban,
                                stateSetSoalKuisioner
                              )
                            }
                          >
                            {jawaban}
                          </button>
                        ))}
                      </td>
                      <td>{list.jawaban}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <center>
            <br />
            {stateBtn && (
              <button
                className="text-white font-semibold bg-blue-800 rounded-md p-2 px-4 hover:bg-blue-700"
                onClick={() => {
                  kirim(level, nextStateLevel);
                  stateSetBtn(false);
                }}
              >
                Kirim Jawaban
              </button>
            )}
          </center>
        </div>
      </>
    );
  else return <></>;
};

export default Kuisioner;
