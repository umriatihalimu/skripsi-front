import axiosCostume from "@/axiosCostume";
import tb_kuisioner from "@/typeData/itPertanyaan";
import { url } from "@/util/env";
import axios, { AxiosResponse } from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

const TambahKuisioner = () => {
  const id =
    typeof window != "undefined" ? window.location.pathname.split("/")[1] : "";

  const [pertanyaan, setPertanyaan] = useState<string>();
  const [data, setData] = useState<tb_kuisioner[]>([]);
  const [level, setLevel] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const getData = () => {
    axiosCostume
      .get(url + "kuisioner/" + id)
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.status == "ok") {
          setData(res.data.data);
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const hapus = (id_pertanyaan: number) => {
    axiosCostume
      .delete(url + "kuisioner/" + id_pertanyaan)
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.status == "ok") {
          alert("Data berhasil dihapus");
          getData();
        }
      });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosCostume
      .post(url + "kuisioner", {
        kuisioner: pertanyaan,
        id_indikator: id,
        level: level,
      })
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.status == "ok") {
          alert("data berhasil disimpan");
          getData();
          // 🚨 Reset semua input secara otomatis
          formRef.current?.reset();
        }
      });
    // console.log("Pertanyaan yang disimpan:", pertanyaan);
  };
  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Tambah Pertanyaan
        </h2>

        {/* Pertanyaan */}
        <div className="mb-4">
          <label className="block font-semibold mb-2 text-gray-700">
            Pertanyaan
          </label>
          <textarea
            className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none"
            placeholder="Masukkan pertanyaan"
            onChange={(e) => setPertanyaan(e.target.value)}
            required
          />
        </div>

        {/* Level */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-gray-700">
            Level
          </label>
          <input
            className="w-[70px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            type="number"
            min="1"
            max="5"
            placeholder="1-5"
            required
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>

        {/* Tombol Simpan */}
        <button type="submit" className="btnSimpan">
          Simpan
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Level</th>
            <th>Pertanyaan</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.level}</td>
                <td>{data.kuisioner}</td>
                <td>
                  <button
                    onClick={() => hapus(data.id_kuisioner)}
                    className="flex items-center bg-red-500 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-red-400"
                  >
                    <MdOutlineDelete size={20} /> Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TambahKuisioner;
