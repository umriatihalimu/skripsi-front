import { data_kuisioner, itSoalKuesioner } from "@/components/data-kuisioner";
import { itAspek, itDomain, itIndikator } from "@/typeData/itIndikator";
import { url } from "@/util/env";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

const PilihDomain: React.FC = () => {
  const [pdomain, setPdomain] = useState(0);
  const [idAspek, setIdAspek] = useState(0);
  const [domain, setDomain] = useState<itDomain[]>([]);
  const [aspek, setAspek] = useState<itAspek[]>([]);
  const [indikator, setIndikator] = useState<itIndikator[]>([]);
  const [idIndikator, setIdIndikator] = useState<number>();
  const [filter, setFilter] = useState<number>(0);
  const [namaDomain, setNamaDomain] = useState<string>();
  const [namaAspek, setNamaAspek] = useState<string>();
  const [namaIndikator, setNamaIndikator] = useState<string>();
  const [soalKuisioner, setSoalKuisioner] = useState<itSoalKuesioner>();

  const getKuisioner = () => {
    axios
      .post(`${url}indikator/get-kuisioner/`, {
        nama_domain: namaDomain,
        nama_aspek: namaAspek,
        nama_indikator: namaIndikator,
      })
      .then((res: AxiosResponse<any, any>) => {
        setSoalKuisioner(data_kuisioner);
      });
  };

  const loadDomain = () => {
    axios.get(`${url}domain/`).then((res: AxiosResponse<any, any>) => {
      setDomain(res.data);
    });
  };
  const getAspek = (id: number) => {
    axios.get(`${url}aspek/${id}`).then((res: AxiosResponse<any, any>) => {
      setAspek(res.data);
    });
  };
  const getIndikator = (id: number) => {
    axios.get(`${url}indikator/${id}`).then((res: AxiosResponse<any, any>) => {
      setIndikator(res.data);
    });
  };

  const updateJawaban = (
    indikatorId: string,
    pertanyaanId: string,
    jawabanBaru: string
  ) => {
    setSoalKuisioner((prevKuesioner) => {
      if (!prevKuesioner) return prevKuesioner; // Tambahan untuk berjaga-jaga jika undefined

      return {
        ...prevKuesioner,
        indikator: prevKuesioner.indikator.map((indikator) =>
          indikator.id === indikatorId
            ? {
                ...indikator,
                pertanyaan: indikator.pertanyaan.map((pertanyaan) =>
                  pertanyaan.id === pertanyaanId
                    ? { ...pertanyaan, jawaban: jawabanBaru }
                    : pertanyaan
                ),
              }
            : indikator
        ),
      };
    });
  };

  const kirim = () => {
    axios
      .post(`${url}indikator/jawab`, {
        data: JSON.stringify(soalKuisioner),
      })
      .then((res: AxiosResponse<any, any>) => {});
  };

  useEffect(() => {
    console.log(JSON.stringify(soalKuisioner));
  }, [soalKuisioner]);

  useEffect(() => {
    loadDomain();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <p className="text-xl font-semibold">Silahkan pilih domain</p>
        </div>
        <div className="flex gap-x-2 justify-center pt-3">
          {domain.map((data, i) => (
            <button
              onClick={() => {
                setPdomain(data.id_domain);
                getAspek(data.id_domain);
                setNamaDomain(data.domain);
                setIndikator([]);
                setAspek([]);
              }}
              className={`${
                pdomain == data.id_domain ? "bg-red-500" : "bg-blue-700 "
              } hover:opacity-80 rounded-sm p-2 gap-x-1 justify-center text-white flex items-center `}
              key={i}
            >
              {data.domain}
            </button>
          ))}
        </div>
        {pdomain > 0 && (
          <>
            <p className="font-semibold text-xl mt-8 mb-4">
              Silahkan pilih aspek
            </p>

            <ul className="flex gap-2 rounded-md ">
              {aspek.map((data, i) => (
                <li
                  className={`${
                    data.id_aspek == idAspek ? "bg-red-500" : "bg-blue-700 "
                  } hover:opacity-80 cursor-pointer flex rounded-sm text-white p-1 gap-x-2 items-center justify-center px-2 `}
                  key={i}
                  onClick={() => {
                    setIdAspek(data.id_aspek);
                    getIndikator(data.id_aspek);
                    setNamaAspek(data.aspek);
                  }}
                >
                  {data.aspek}
                </li>
              ))}
            </ul>
          </>
        )}

        <p className="font-semibold text-xl mt-6">Silahkan pilih indikator</p>
        <div className="flex flex-col justify-center items-center  w-full ms-20">
          <ul className="flex flex-col gap-y-1 pt-4">
            {indikator.map((data, i) => (
              <li key={i}>
                <button
                  className={`flex gap-x-2 items-center hover:opacity-70 ${
                    data.id_indikator == idIndikator && "text-blue-700 "
                  } `}
                  onClick={() => {
                    setIdIndikator(data.id_indikator);
                    setNamaIndikator(data.nama_indikator);
                  }}
                >
                  <FaCheck />
                  {data.nama_indikator}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <br />
        {domain.length > 0 && aspek.length > 0 && indikator.length > 0 ? (
          <button
            onClick={() => getKuisioner()}
            className="text-white font-semibold bg-red-500 rounded-md p-2 px-4 hover:bg-red-400"
          >
            Kirim
          </button>
        ) : (
          <></>
        )}
      </div>
      {soalKuisioner && (
        <div>
          <br />
          <p>{soalKuisioner.deskripsi}</p>
          <br />
          {soalKuisioner.indikator.map((data, i) => (
            <div key={i}>
              {data.nama}
              <table className="table">
                <thead>
                  <tr>
                    <td>No</td>
                    <td>Soal Kuisioner</td>
                    <td></td>
                    <td>Jawaban</td>
                  </tr>
                </thead>
                <tbody>
                  {data.pertanyaan.map((list, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{list.teks}</td>
                      <td>{list.jawaban}</td>
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
                              updateJawaban(data.id, list.id, jawaban)
                            }
                          >
                            {jawaban}
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <center>
            <br />
            <button
              className="text-white font-semibold bg-blue-800 rounded-md p-2 px-4 hover:bg-blue-700"
              onClick={() => kirim()}
            >
              Kirim Jawaban
            </button>
          </center>
        </div>
      )}
    </>
  );
};

export default PilihDomain;
