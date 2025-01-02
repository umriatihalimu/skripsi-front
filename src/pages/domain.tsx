import { itDomain } from "@/typeData/itIndikator";
import { url } from "@/util/env";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

const Domain = () => {
  const [data, setData] = useState<itDomain[]>([]);
  const [domain, setDomain] = useState<string>();
  const [add, setAdd] = useState(false);

  const loadDomain = () => {
    axios.get(`${url}domain/`).then((res: AxiosResponse<any, any>) => {
      setData(res.data);
    });
  };

  // hapus data
  const hapusDomain = (id: number) => {
    if (confirm("Apakah anda ingin hapus data ini?")) {
      axios
        .delete(url + "domain/" + id)
        .then((response: AxiosResponse<any, any>) => {
          if (response.data.status == "ok") {
            loadDomain();
          }
        });
    }
  };
  const _simpan = () => {
    axios
      .post(`${url}domain/`, {
        domain: domain,
      })
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.status === "ok") {
          alert("data berhasil ditambahkan");
          loadDomain();
          setAdd(false);
        }
      });
  };

  useEffect(() => {
    loadDomain();
  }, []);

  return (
    <>
      <div className="flex justify-between pb-3">
        <h1>Domain SPBE</h1>
        <button className="btnTambah" onClick={() => setAdd(!add)}>
          <p>Tambah data</p> <IoAdd size={24} />
        </button>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="w-5">No</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
          {add && (
            <tr>
              <td>*</td>
              <td>
                <input
                  className="p-1 border border-gray-300 rounded"
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Masukkan domain..."
                  autoFocus
                  type="text"
                />
              </td>
              <td>
                <button className="btnSimpan" onClick={_simpan}>
                  simpan
                </button>
              </td>
            </tr>
          )}
          {data.map((datas, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{datas.domain}</td>
              <td>
                <button
                  onClick={() => hapusDomain(datas.id_domain)}
                  className="flex items-center bg-red-500 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-red-400"
                >
                  <MdOutlineDelete size={20} /> Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Domain;
