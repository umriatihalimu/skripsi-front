import { itSoalKuesioner } from "@/components/data-kuisioner";
import Kuisioner from "@/components/kuisioner";
import Loading from "@/components/loading";
import {
  itAspek,
  itDomain,
  itIndikator,
  itPenguji,
} from "@/typeData/itIndikator";
import { url } from "@/util/env";
import axios, { Axios, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import $ from "jquery";
import axiosCostume from "@/axiosCostume";

const PilihDomain: React.FC = () => {
  const [pdomain, setPdomain] = useState(0);
  const [idAspek, setIdAspek] = useState(0);
  const [domain, setDomain] = useState<itDomain[]>([]);
  const [aspek, setAspek] = useState<itAspek[]>([]);
  const [indikator, setIndikator] = useState<itIndikator[]>([]);
  const [idIndikator, setIdIndikator] = useState<number>();
  const [namaDomain, setNamaDomain] = useState<string>();
  const [namaAspek, setNamaAspek] = useState<string>();
  const [namaIndikator, setNamaIndikator] = useState<string>();
  const [soalKuisioner, setSoalKuisioner] = useState<itSoalKuesioner>();
  const [soalKuisioner2, setSoalKuisioner2] = useState<itSoalKuesioner>();
  const [soalKuisioner3, setSoalKuisioner3] = useState<itSoalKuesioner>();
  const [soalKuisioner4, setSoalKuisioner4] = useState<itSoalKuesioner>();
  const [soalKuisioner5, setSoalKuisioner5] = useState<itSoalKuesioner>();
  const [soalKuisioner6, setSoalKuisioner6] = useState<itSoalKuesioner>();
  const [btn1, setBtn1] = useState<boolean>(true);
  const [btn2, setBtn2] = useState<boolean>(true);
  const [btn3, setBtn3] = useState<boolean>(true);
  const [btn4, setBtn4] = useState<boolean>(true);
  const [btn5, setBtn5] = useState<boolean>(true);

  const [isDaftar, setIsDaftar] = useState<boolean>(false);
  const [namaPenguji, setNamaPenguji] = useState<string>();
  const [jabatan, setJabatan] = useState<string>();
  const [keterangan, setKeterangan] = useState<string>();
  const [tanggal, setTanggal] = useState<string>();
  const [penguji, setPenguji] = useState<itPenguji>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);

  const getKuisioner = (level: string, state: (data: any) => void) => {
    setIsLoading(true);
    axiosCostume
      .post(`${url}indikator/get-kuisioner/`, {
        nama_domain: namaDomain,
        nama_aspek: namaAspek,
        nama_indikator: namaIndikator,
        level: level,
      })
      .then((res: AxiosResponse<any, any>) => {
        state(res.data.data);
        //console.log(res.data.data);
        setIsLoading(false);
      });
    if (Number(level) == 5) setBtn5(true);
  };
  const loadDomain = () => {
    axiosCostume.get(`${url}domain/`).then((res: AxiosResponse<any, any>) => {
      setDomain(res.data);
    });
  };
  const getAspek = (id: number) => {
    axiosCostume
      .get(`${url}aspek/${id}`)
      .then((res: AxiosResponse<any, any>) => {
        setAspek(res.data);
      });
  };
  const getIndikator = (id: number) => {
    axiosCostume
      .get(`${url}indikator/${id}`)
      .then((res: AxiosResponse<any, any>) => {
        setIndikator(res.data);
      });
  };

  const updateJawaban = (
    indikatorId: string,
    pertanyaanId: string,
    jawabanBaru: string,
    state: (data: any) => void
  ) => {
    state((prevKuesioner: any) => {
      if (!prevKuesioner) return prevKuesioner; // Tambahan untuk berjaga-jaga jika undefined, maka jjgn ubah apa apa

      return {
        ...prevKuesioner,
        indikator: prevKuesioner.indikator.map((indikator: any) =>
          indikator.id === indikatorId
            ? {
                ...indikator,
                pertanyaan: indikator.pertanyaan.map((pertanyaan: any) =>
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

  const kirim = (level: string, state: (data: any) => void) => {
    setIsLoading(true);
    axiosCostume
      .post(`${url}indikator/jawab`, {
        data: JSON.stringify(
          level == "1" //jika lv 1 maka kirim soalkuisioner
            ? soalKuisioner
            : level == "2"
            ? soalKuisioner2
            : level == "3"
            ? soalKuisioner3
            : level == "4"
            ? soalKuisioner4
            : level == "5"
            ? soalKuisioner5
            : ""
        ),
        level: level,
        id_domain: pdomain,
        id_aspek: idAspek,
        id_indikator: idIndikator,
        id_penguji: penguji?.id_penguji,
      })
      .then((res: AxiosResponse<any, any>) => {
        setIsLoading(false);
        const skor = res.data.data.skor;
        alert("skor = " + skor);
        if (skor >= 75) {
          if (Number(level) + 1 < 6) {
            alert(`Lanjut ke level ${Number(level) + 1}`);
            getKuisioner(`${Number(level) + 1}`, state);
          }
        } else {
          setIsFinish(true);

          alert(
            "Karena skor tidak memenuhi batas minimal, maka tidak dapat lanjut ke level berikutnya"
          );
        }
      });
  };

  useEffect(() => {
    console.log(JSON.stringify(soalKuisioner));
  }, [soalKuisioner]);

  useEffect(() => {
    loadDomain();
  }, []);
  return (
    <>
      {isLoading && <Loading />}

      {!isDaftar ? (
        <>
          <h3 className="font-semibold">
            Lengkapi terlebih dahulu form dibawah ini
          </h3>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();

              axiosCostume
                .post(`${url}indikator/penguji/`, {
                  nama_penguji: namaPenguji,
                  jabatan: jabatan,
                  keterangan: keterangan,
                  tanggal_uji: tanggal,
                })
                .then((res: AxiosResponse<any, any>) => {
                  setPenguji(res.data.data);
                  setIsDaftar(true);
                });
            }}
          >
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Masukkan nama anda</span>
              </div>
              <input
                required
                type="text"
                placeholder="ex: umriati"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setNamaPenguji(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Masukkan jabatan anda</span>
              </div>
              <input
                required
                type="text"
                placeholder="ex: kepala dinas"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setJabatan(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Masukkan tanggal</span>
              </div>
              <input
                required
                type="date"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setTanggal(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Keterangan</span>
              </div>
              <input
                required
                type="text"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </label>
            <br />
            <button className="btnSimpan">Simpan</button>
          </form>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <h2>Data Penguji</h2>
            <table className="table">
              <tbody>
                <tr>
                  <td>Nama </td>
                  <td>: </td>
                  <td>{penguji?.nama_penguji}</td>
                </tr>
                <tr>
                  <td>Jabatan </td>
                  <td>: </td>
                  <td>{penguji?.jabatan}</td>
                </tr>
                <tr>
                  <td>Tanggal </td>
                  <td>: </td>
                  <td>{penguji?.tanggal_uji}</td>
                </tr>
                <tr>
                  <td>Keterangan </td>
                  <td>: </td>
                  <td>{penguji?.keterangan}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col gap-y-2 items-center justify-center">
              <p className="text-xl font-semibold">Silahkan pilih domain</p>
            </div>
            <div className="flex gap-x-2 justify-center pt-3">
              {domain.map((data, i) => ( //loop semua domain & buat tombolnya
                <button
                  onClick={() => {
                    setPdomain(data.id_domain);
                    getAspek(data.id_domain);
                    setNamaDomain(data.domain);
                    setIndikator([]);
                    setAspek([]);
                    setSoalKuisioner(undefined); //kosongkan  semua  kuisioner sebelumnjya 
                    setSoalKuisioner2(undefined);
                    setSoalKuisioner3(undefined);
                    setSoalKuisioner4(undefined);
                    setSoalKuisioner5(undefined);
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
                        setIdIndikator(undefined);
                        setIdAspek(data.id_aspek);
                        getIndikator(data.id_aspek);
                        setNamaAspek(data.aspek);
                        setSoalKuisioner(undefined);
                        setSoalKuisioner2(undefined);
                        setSoalKuisioner3(undefined);
                        setSoalKuisioner4(undefined);
                        setSoalKuisioner5(undefined);
                        setSoalKuisioner6(undefined);
                        setBtn1(true);
                        setBtn2(true);
                        setBtn3(true);
                        setBtn4(true);
                        setBtn5(true);
                      }}
                    >
                      {data.aspek}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {idAspek > 0 && (
              <>
                <p className="font-semibold text-xl mt-6">
                  Silahkan pilih indikator
                </p>
                <div className="flex flex-col justify-center items-center  w-full ms-20">
                  <ul className="flex flex-col gap-y-1 pt-4">
                    {indikator.map((data, i) => (
                      <li key={i} id={String(data.id_indikator)}>
                        <button
                          className={`flex gap-x-2 items-center hover:opacity-70 ${
                            data.id_indikator == idIndikator && "text-blue-700 "
                          } `}
                          onClick={() => {
                            setIdIndikator(data.id_indikator);
                            setNamaIndikator(data.nama_indikator);
                            setBtn1(true);
                            setBtn2(true);
                            setBtn3(true);
                            setBtn4(true);
                            setBtn5(true);
                            setSoalKuisioner(undefined);
                            setSoalKuisioner2(undefined);
                            setSoalKuisioner3(undefined);
                            setSoalKuisioner4(undefined);
                            setSoalKuisioner5(undefined);
                            setSoalKuisioner6(undefined);
                          }}
                        >
                          <FaCheck />
                          {data.nama_indikator}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <br />
            {typeof idIndikator != "undefined" &&
            domain.length > 0 &&
            aspek.length > 0 &&
            indikator.length > 0 ? (
              <button
                onClick={() => getKuisioner("1", setSoalKuisioner)}
                className="text-white font-semibold bg-red-500 rounded-md p-2 px-4 hover:bg-red-400  "
              >
                Kirim
              </button>
            ) : (
              <></>
            )}
          </div>
          {soalKuisioner && (
            <Kuisioner
              stateSoalKuisioner={soalKuisioner}
              updateJawaban={updateJawaban}
              stateSetSoalKuisioner={setSoalKuisioner}
              stateBtn={btn1}
              kirim={kirim}
              nextStateLevel={setSoalKuisioner2}
              level="1"
              stateSetBtn={setBtn1}
            />
          )}
          {soalKuisioner2 && (
            <Kuisioner
              stateSoalKuisioner={soalKuisioner2}
              updateJawaban={updateJawaban}
              stateSetSoalKuisioner={setSoalKuisioner2}
              stateBtn={btn2}
              kirim={kirim}
              nextStateLevel={setSoalKuisioner3}
              level="2"
              stateSetBtn={setBtn2}
            />
          )}
          {soalKuisioner3 && (
            <Kuisioner
              stateSoalKuisioner={soalKuisioner3}
              updateJawaban={updateJawaban}
              stateSetSoalKuisioner={setSoalKuisioner3}
              stateBtn={btn3}
              kirim={kirim}
              nextStateLevel={setSoalKuisioner4}
              level="3"
              stateSetBtn={setBtn3}
            />
          )}
          {soalKuisioner4 && (
            <Kuisioner
              stateSoalKuisioner={soalKuisioner4}
              updateJawaban={updateJawaban}
              stateSetSoalKuisioner={setSoalKuisioner4}
              stateBtn={btn4}
              kirim={kirim}
              nextStateLevel={setSoalKuisioner5}
              level="4"
              stateSetBtn={setBtn4}
            />
          )}
          {soalKuisioner5 && (
            <Kuisioner
              stateSoalKuisioner={soalKuisioner5}
              updateJawaban={updateJawaban}
              stateSetSoalKuisioner={setSoalKuisioner5}
              stateBtn={btn5}
              kirim={kirim}
              nextStateLevel={setSoalKuisioner6}
              level="5"
              stateSetBtn={setBtn5}
            />
          )}
        </>
      )}
      {isFinish && (
        <button
          className="btnSimpan"
          onClick={() => {
            setIsFinish(false);
            setSoalKuisioner(undefined);
            setSoalKuisioner2(undefined);
            setSoalKuisioner3(undefined);
            setSoalKuisioner4(undefined);
            setSoalKuisioner5(undefined);
            setSoalKuisioner6(undefined);
            setBtn1(false);
            setBtn2(false);
            setBtn3(false);
            setBtn4(false);
            setBtn5(false);
            setIdIndikator(undefined);
            $(`#${idIndikator}`).hide();
            alert("Pilih indikator berikutnya");
            window.scrollTo({
              top: 200,
              behavior: "smooth", // Memberikan animasi gulir yang halus
            });
          }}
        >
          Selesai
        </button>
      )}
    </>
  );
};

export default PilihDomain;
