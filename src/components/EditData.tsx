import { itKuisioner } from "@/typeData/itIndikator";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

type itEdit = {
  list: itKuisioner;
  reload: VoidFunction;
  closeModal: VoidFunction;
};
const EditData: React.FC<itEdit> = ({ list, reload, closeModal }) => {
  const url = process.env.NEXT_PUBLIC_URL;
  const [kuisioner, setKuisioner] = useState<string>(list.kuisioner);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`${url}kuisioner/${list.id_kuisioner}`, {
        kuisioner: kuisioner,
      })
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.status === "ok") {
          alert("Data berhasil diubah");
          reload();
          closeModal();
        }
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 className="text-xl font-semibold pt-2 pb-4">Edit data</h3>
            <textarea
              required
              className="input input-bordered  max-w-xs "
              value={kuisioner}
              onChange={(e) => setKuisioner(e.target.value)}
            ></textarea>
            <div
              className="flex justify-end gap-x-1 font-semibold "
              style={{ marginTop: "20px" }}
            >
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={closeModal}
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
    </div>
  );
};
export default EditData;
