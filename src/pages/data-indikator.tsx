import React, { FormEvent, useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import axios, { AxiosResponse } from "axios";
import EditData from "../components/EditData";
import Modal from "@/components/Modal";
import { itDomainSpbe, itKuisioner } from "@/typeData/itIndikator";
import axiosCostume from "@/axiosCostume";
import { IoIosAdd } from "react-icons/io";

const DataIndikatorPage = () => {
  const url = process.env.NEXT_PUBLIC_URL;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [kuisioner, setKuisioner] = useState<string>();
  const [data, setData] = useState<itKuisioner[]>([]);
  const [editData, setEditData] = useState<itKuisioner | null>();
  const [dataSpbe, setDataSpbe] = useState<itDomainSpbe[]>([]);

  // ambil data
  const loadData = () => {
    axiosCostume
      .get(url + "kuisioner")
      .then((response: AxiosResponse<any, any>) => {
        setData(response.data.data);
      });
  };

  const loadSpbe = () => {
    axiosCostume
      .get(`${url}domain-spbe/`)
      .then((res: AxiosResponse<any, any>) => {
        setDataSpbe(res.data);
      });
  };

  // hapus data
  const hapusData = (id: string) => {
    if (confirm("Apakah anda ingin hapus data ini?")) {
      axiosCostume
        .delete(url + "kuisioner/" + id)
        .then((response: AxiosResponse<any, any>) => {
          if (response.data.status == "ok") {
            alert("Data berhasil dihapus");
            loadData();
          }
        });
    }
  };

  useEffect(() => {
    loadData();
    loadSpbe();
  }, []);

  const _simpan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosCostume
      .post(url + "kuisioner", {
        kuisioner: kuisioner,
      })
      .then((response: AxiosResponse<any, any>) => {
        //console.log(response.data);

        if (response.data.status == "ok") {
          alert("data berhasil ditambahkan");
          loadData();
          setModalOpen(false);
        }
      });
  };
  const closeModal = () => {
    setEditData(null);
  };

  return (
    <>
      {editData && (
        <Modal>
          <EditData list={editData} reload={loadData} closeModal={closeModal} />
        </Modal>
      )}
      <div>
        <div className="flex justify-between items-center">
          <h1>Data Indikator</h1>

          <div>
            {/* Tombol untuk membuka modal */}
            <button className="btnTambah" onClick={() => setModalOpen(true)}>
              <p>Tambah data</p> <IoAdd size={24} />
            </button>

            {/* Modal */}
            {isModalOpen && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
              >
                <form onSubmit={_simpan}>
                  <div
                    className="flex flex-col w-[400px] "
                    style={{
                      backgroundColor: "#fff",
                      padding: "20px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3 className="text-xl font-semibold pt-2 pb-4">
                      Tambah data
                    </h3>
                    <select className="border-none p-2">
                      <option value="">Pilih Domain SPBE</option>
                      {dataSpbe.map((data, i) => (
                        <option key={i} value={data.id_spbe}>
                          {data.indikator_spbe}
                        </option>
                      ))}
                    </select>
                    <textarea
                      required
                      onChange={(e) => {
                        setKuisioner(e.target.value);
                      }}
                      placeholder="Masukkan indikator kuisioners"
                      className="input input-bordered mt-4 "
                    ></textarea>
                    <div
                      className="flex justify-end gap-x-1 font-semibold "
                      style={{ marginTop: "20px" }}
                    >
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => setModalOpen(false)}
                      >
                        Batal
                      </button>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        type="submit"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Pernyataan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.map((list, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{list.kuisioner}</td>
                  <td className="flex gap-x-2">
                    <button
                      onClick={() => setEditData(list)}
                      className="flex items-center bg-blue-400 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-blue-300"
                    >
                      <MdOutlineDelete size={20} /> Edit
                    </button>
                    <button
                      onClick={() => hapusData(String(list.id_kuisioner))}
                      className="flex items-center bg-red-500 rounded-md p-2 gap-x-1 justify-center text-white hover:bg-red-400"
                    >
                      <MdOutlineDelete size={20} /> Hapus
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

export default DataIndikatorPage;
