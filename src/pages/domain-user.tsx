import { itDomain } from "@/typeData/itIndikator";
import { url } from "@/util/env";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import axiosCostume from "@/axiosCostume";

const DomainUser = () => {
  const [data, setData] = useState<itDomain[]>([]);

  const loadDomain = () => {
    axiosCostume.get(`${url}domain/`).then((res: AxiosResponse<any, any>) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    loadDomain();
  }, []);

  return (
    <>
      <div className="flex justify-between pb-3">
        <h1>Domain SPBE</h1>
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
          {data.map((datas, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{datas.domain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DomainUser;
