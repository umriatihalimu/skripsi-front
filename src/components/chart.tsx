import axiosCostume from "@/axiosCostume";
import { itTipeDomain } from "@/typeData/itTipeDomain";
import { url } from "@/util/env";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loading from "./loading";

const Chart = () => {
  const [data, setData] = useState<itTipeDomain[]>([]);

  const loadData = () => {
    axiosCostume.get(`${url}tipe/`).then((res: AxiosResponse<any, any>) => {
      const dataFormat = res.data.data.map((item: any) => ({
        name: item.name, // Gunakan nama dari tipe domain
        value:
          item.value.length > 0
            ? item.value.reduce((sum: number, indikator: any) => {
                const totalSkor = indikator.skor.reduce(
                  (skorSum: number, s: any) => skorSum + s.nilai,
                  0
                );
                const jumlahSkor = indikator.skor.length;
                return sum + totalSkor / jumlahSkor; // Rata-rata skor per indikator
              }, 0) / item.value.length
            : 0,
      }));

      //console.log("Formatted Data:", dataFormat);
      setData(dataFormat); // Set data ke state
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="w-full h-64 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-4">
        Grafik Rata-rata Hasil Kematangan SPBE Menggunakan COBIT 5
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        {data.length > 0 ? (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" radius={[5, 5, 0, 0]} />
          </BarChart>
        ) : (
          <Loading />
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
