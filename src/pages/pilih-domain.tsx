import axiosCostume from "@/axiosCostume";
import {
  FileMap,
  itAspek,
  itDomain,
  itIndikator,
} from "@/typeData/itIndikator";
import { itPertanyaan } from "@/typeData/itPertanyaan";
import { url } from "@/util/env";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const PilihDomain = () => {
  const [domain, setDomain] = useState<itDomain[]>([]);
  const [selectDomain, setSelectDomain] = useState<number | null>(null);
  const [aspek, setAspek] = useState<itAspek[]>([]);
  const [selectAspek, setSelectAspek] = useState<number | null>(null);
  const [indikator, setIndikator] = useState<itIndikator[]>([]);
  const [selectIndikator, setSelectIndikator] = useState<number | null>(null);
  const [level, setLevel] = useState<number>(1);
  const [pertanyaan, setPertanyaan] = useState<itPertanyaan[]>([]);
  const [jmlJawaban, setJmlJawaban] = useState<number>(0);
  const [indikatorTerjawab, setIndikatorTerjawab] = useState<number[]>([]);
  const [namaPenguji, setNamaPenguji] = useState<string>("");
  const [jabatan, setJabatan] = useState<string>("");
  const [keterangan, setKeterangan] = useState<string>("");
  const [tglUji, setTglUji] = useState<string>("");
  const [namaPengujiLocal, setNamaPengujiLocal] = useState<string>("");
  const [jabatanLocal, setJabatanLocal] = useState<string>("");
  const [keteranganLocal, setKeteranganLocal] = useState<string>("");
  const [tglUjiLocal, setTglUjiLocal] = useState<string>("");
  const [isSimpanForm, setSimpanForm] = useState<boolean>(false);
  const [isReload, setReload] = useState<number>(1);
  const [fileState, setFileState] = useState<FileMap>({});

  const _getDomain = () => {
    axiosCostume.get(url + "domain").then((res) => {
      setDomain(res.data);
    });
  };

  const _getAspek = (id_domain: number) => {
    axiosCostume.get(url + "aspek/" + id_domain).then((res) => {
      setAspek(res.data);
    });
  };

  const _getIndikator = (id_aspek: number) => {
    axiosCostume.get(url + "indikator/" + id_aspek).then((res) => {
      setIndikator(res.data);
    });
  };

  const _getPertanyaan = (id_indikator: number) => {
    console.log(`panggil getpertanyaan level`, level);

    axiosCostume
      .get(url + `pertanyaan?level=${level}&id_indikator=${id_indikator}`)
      .then((res: AxiosResponse) => {
        setPertanyaan(res.data.data);
        if (res.data.data.length == 0) {
          if (selectIndikator) {
            setIndikatorTerjawab((c) => [...c, selectIndikator]);
          }
        }
      });
  };

  const _handleJawabanChange = (id: number, newJawaban: string) => {
    setPertanyaan((prev) =>
      prev.map((q) =>
        q.id_kuisioner === id ? { ...q, jawaban: newJawaban } : q
      )
    );
  };

  const kirimJawaban = () => {
    const formData = new FormData();
    formData.append("file_upload", fileState || "");
    formData.append("data", JSON.stringify(pertanyaan || []));
    formData.append("id_penguji", localStorage.getItem("idPenguji") || "");
    formData.append("id_domain", selectDomain?.toString() || "");
    formData.append("id_aspek", selectAspek?.toString() || "");
    axiosCostume
      .post(url + `pertanyaan?level=${level}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert(`Nilai indikator = ${res.data.hasil}`);
        if (res.data.hasil > 85) {
          setLevel((prev) => prev + 1);
          alert(
            `Karena nilai lebih dari 85, maka lanjut ke level ${level + 1}`
          );
        } else {
          if (selectIndikator) {
            setIndikatorTerjawab((c) => [...c, selectIndikator]);
          }
          alert(
            `Karena nilai kurang dari 85, maka tidak dapat lanjut ke level berikutnya. Silahkan pilih indikator berikutnya`
          );

          setPertanyaan([]);
        }
      });
  };

  useEffect(() => {
    if (selectIndikator) {
      _getPertanyaan(selectIndikator);
    }
  }, [level]);

  const _hitungJmlJawaban = () => {
    var jmlJawab = 0;
    pertanyaan.forEach((soal) => {
      if (soal.jawaban != "") {
        jmlJawab++;
      }
    });
    setJmlJawaban(jmlJawab);
  };

  const _simpanDataUji = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosCostume
      .post(url + "pertanyaan/simpan-data-penguji", {
        nama_penguji: namaPenguji,
        jabatan: jabatan,
        keterangan: keterangan,
        tanggal_uji: tglUji,
      })
      .then((res) => {
        setSimpanForm(true);
        localStorage.setItem("idPenguji", res.data.data.id_penguji);
        localStorage.setItem("nama_penguji", namaPenguji);
        localStorage.setItem("jabatan", jabatan);
        localStorage.setItem("keterangan", keterangan);
        localStorage.setItem("tanggal_uji", tglUji);
        setReload((prev) => prev + 1);
        //console.log(res.data.data);
      });
  };

  useEffect(() => {
    if (indikator.length > 0 && indikatorTerjawab.length === indikator.length) {
      alert("Pindah ke aspek selanjutnya");
      // Di sini kamu bisa juga trigger fungsi untuk load aspek baru
    }
  }, [indikatorTerjawab]);

  useEffect(() => {
    _hitungJmlJawaban();
  }, [pertanyaan]);

  useEffect(() => {
    if (localStorage.getItem("nama_penguji") !== null) {
      setNamaPengujiLocal(localStorage.getItem("nama_penguji") || "");
      setJabatanLocal(localStorage.getItem("jabatan") || "");
      setKeteranganLocal(localStorage.getItem("keterangan") || "");
      setTglUjiLocal(localStorage.getItem("tanggal_uji") || "");
      setSimpanForm(true);
    }

    _getDomain();
  }, [isReload]);
  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
        {namaPengujiLocal !== "" ? (
          <div className="p-4">
            <h2 className="text-center text-xl font-bold mb-4">
              Terima Kasih Telah Mengisi Data
            </h2>

            <table className="table-auto border border-gray-300 w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Nama Penguji:</td>
                  <td className="px-4 py-2">{namaPengujiLocal}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Jabatan:</td>
                  <td className="px-4 py-2">{jabatanLocal}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Keterangan:</td>
                  <td className="px-4 py-2">{keteranganLocal}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">
                    Tanggal Pengujian:
                  </td>
                  <td className="px-4 py-2">{tglUjiLocal}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col  pt-3 gap-2 items-center justify-center">
              <button
                className="btnTambah"
                onClick={() => {
                  localStorage.removeItem("nama_penguji");
                  localStorage.removeItem("jabatan");
                  localStorage.removeItem("keterangan");
                  localStorage.removeItem("tanggal_uji");
                  setNamaPengujiLocal("");
                  setJabatanLocal("");
                  setKeteranganLocal("");
                  setTglUjiLocal("");
                  setReload(new Date().getDate());
                }}
              >
                Tambah data penguji
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2>Silahkan Isi Data Pengujian</h2>
            <form onSubmit={_simpanDataUji} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Penguji
                </label>
                <input
                  type="text"
                  placeholder="cth. Umriati"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setNamaPenguji(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Jabatan
                </label>
                <input
                  type="text"
                  placeholder="cth. Kepala Divisi"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setJabatan(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Keterangan
                </label>
                <input
                  type="text"
                  placeholder="cth. Pengujian 2025"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setKeterangan(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tanggal Pengujian
                </label>
                <input
                  type="date"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setTglUji(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      {isSimpanForm == true && namaPengujiLocal !== "" && (
        <div className="flex flex-col justify-center items-center gap-3">
          <h2>Pilih Domain</h2>

          <div className="flex flex-wrap gap-2">
            {domain.map((dataDom, i) => (
              <div key={i} className="">
                <button
                  className="btnTambah"
                  style={{
                    ...(dataDom.id_domain == selectDomain && {
                      background: "#ff543c",
                    }),
                  }}
                  onClick={() => {
                    setSelectDomain(dataDom.id_domain);
                    _getAspek(dataDom.id_domain);
                  }}
                >
                  {dataDom.domain}
                </button>
              </div>
            ))}
          </div>

          {aspek.length > 0 && (
            <>
              <h2>Pilih Aspek</h2>

              <div className="flex flex-wrap gap-2">
                {aspek.map((dataAsp, i) => (
                  <div key={i} className="">
                    <button
                      className="btnTambah"
                      style={{
                        ...(dataAsp.id_aspek == selectAspek && {
                          background: "#ff543c",
                        }),
                      }}
                      onClick={() => {
                        setSelectAspek(dataAsp.id_aspek);
                        _getIndikator(dataAsp.id_aspek);

                        setIndikatorTerjawab([]);
                      }}
                    >
                      {dataAsp.aspek}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {
            <>
              <h2>Pilih Indikator</h2>

              <div className="flex flex-col gap-2">
                {indikator.map((dataInd, i) => (
                  <div key={i} className="">
                    <button
                      className=""
                      style={{
                        ...(dataInd.id_indikator == selectIndikator && {
                          color: "red",
                        }),
                      }}
                      onClick={() => {
                        setSelectIndikator(dataInd.id_indikator);
                        setLevel(1);
                        setTimeout(() => {
                          _getPertanyaan(dataInd.id_indikator);
                        }, 1000);
                      }}
                    >
                      {dataInd.nama_indikator}
                      **
                      {indikatorTerjawab.includes(dataInd.id_indikator) &&
                        "Sudah Terjawab"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          }

          {pertanyaan.length > 0 && (
            <>
              <div className="flex items-center gap-2 mt-5 mb-3">
                <p className="font-bold">Assessment Level : {level}</p>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Pertanyaan</th>
                    <th>Jawaban</th>
                    <th>File dukung</th>
                  </tr>
                </thead>
                <tbody>
                  {pertanyaan.map((data, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data.kuisioner}</td>
                      <td className="flex flex-row gap-2">
                        <button
                          className="btnSimpan"
                          style={{
                            opacity: data.jawaban == "Ya" ? 1 : 0.5,
                          }}
                          onClick={() =>
                            _handleJawabanChange(data.id_kuisioner, "Ya")
                          }
                        >
                          Ya
                        </button>
                        <button
                          className="btnSimpan"
                          style={{
                            opacity: data.jawaban == "Tidak" ? 1 : 0.5,
                          }}
                          onClick={() =>
                            _handleJawabanChange(data.id_kuisioner, "Tidak")
                          }
                        >
                          Tidak
                        </button>
                      </td>
                      <td>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFileState((prev) => ({
                                ...prev,
                                [data.id_indikator]: file,
                              }));
                            }
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {jmlJawaban == pertanyaan.length && (
                <button className="btnTambah" onClick={() => kirimJawaban()}>
                  Kirim
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
export default PilihDomain;
