import React from "react";
import { IoFolderOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/router";

const DashboardUser = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row">
      {/* Main Page */}

      <div className="flex flex-col p-3 gap-5">
        {/* folder */}
        <h1>
          Selamat Datang di Aplikasi Hitung Kematangan Sistem Pemerintahan
          Berbasis Elektronik Menggunakan COBIT 5
        </h1>
        <div className="flex gap-3 ">
          <div className="flex flex-col  bg-blue-400 w-[250px] h-[150px]">
            <div className="flex gap-5 items-center justify-center mt-5 ">
              <p className="font-bold text-[16px] text-white"> Domain SPBE</p>
              <IoFolderOutline size={90} className="opacity-40" />
            </div>
            <button
              onClick={() => router.push("/domain-user")}
              className="flex items-center justify-center p-1 gap-2 mt-[13px] bg-blue-500 text-[13px] hover:bg-blue-600 text-white"
            >
              Selengkapnya
              <IoIosArrowRoundForward />
            </button>
          </div>
          <div className="flex flex-col  bg-green-400 w-[250px] h-[150px]">
            <div className="flex gap-5 items-center justify-center mt-5 ">
              <p className="font-bold text-[16px] text-white">Aspek SPBE</p>
              <IoFolderOutline size={90} className="opacity-40" />
            </div>
            <button
              onClick={() => router.push("/aspek-user")}
              className="flex items-center justify-center p-1 gap-2 mt-[13px] bg-green-500 text-[13px] hover:bg-green-600 text-white"
            >
              Selengkapnya
              <IoIosArrowRoundForward />
            </button>
          </div>
          <div className="flex flex-col  bg-pink-400 w-[250px] h-[150px]">
            <div className="flex gap-5 items-center justify-center mt-5 ">
              <p className="font-bold text-[16px] text-white">Indikator SPBE</p>
              <IoFolderOutline size={90} className="opacity-40" />
            </div>
            <button
              onClick={() => router.push("/indikator-user")}
              className="flex items-center justify-center p-1 gap-2 mt-[13px] bg-pink-500 text-[13px] hover:bg-pink-600 text-white"
            >
              Selengkapnya
              <IoIosArrowRoundForward />
            </button>
          </div>
        </div>

        <div>
          <h2> Tingkat Kematangan SPBE (Maturity Level SPBE)</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Deskripsi</th>
                <th>Karakteristik</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1. Inisialisasi</td>
                <td>
                  SPBE masih dalam tahap awal, belum ada kebijakan dan standar
                  yang jelas
                </td>
                <td>
                  - Penerapan SPBE belum terstruktur <br /> - Belum ada
                  kebijakan atau regulasi yang mendukung
                </td>
              </tr>
              <tr>
                <td>2. Tersusun</td>
                <td>
                  Sudah ada kebijakan dan standar, namun belum sepenuhnya
                  diterapkan
                </td>
                <td>
                  - Dokumen perencanaan sudah ada <br />- Implementasi masih
                  sporadis dan belum merata
                </td>
              </tr>
              <tr>
                <td>3. Terpadu</td>
                <td>
                  SPBE telah diimplementasikan dan terintegrasi antar sistem
                </td>
                <td>
                  - Ada sistem yang mendukung <br /> - Beberapa unit sudah
                  menerapkan dan terhubung
                </td>
              </tr>
              <tr>
                <td>4. Terkelola & Terukur</td>
                <td>
                  Pengelolaan SPBE dilakukan secara sistematis dengan evaluasi
                  berkala
                </td>
                <td>
                  - Ada mekanisme pemantauan dan evaluasi <br /> - Kinerja SPBE
                  mulai terukur
                </td>
              </tr>
              <tr>
                <td>5. Optimum</td>
                <td>SPBE telah mencapai efisiensi dan inovasi maksimal</td>
                <td>
                  - Integrasi penuh antara layanan digital <br /> - Ada inovasi
                  berkelanjutan berbasis teknologi
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 ">
          <h2>Apa itu COBIT 5?</h2>
          <div style={{ textAlign: "justify" }}>
            COBIT (Control Objectives for Information and Related Technologies)
            adalah kerangka kerja yang digunakan untuk mengevaluasi dan mengukur
            tingkat kapabilitas TI dalam suatu organisasi atau pemerintahan.
            Model ini membantu mengidentifikasi tingkat kematangan proses TI dan
            memberikan panduan untuk meningkatkan kapabilitas sistem
            pemerintahan berbasis elektronik. Kapabilitas SPBE dapat diukur dari
            beberapa hal yaitu teknologi, operasional organisasi, kemampuan
            sumber daya, dan proses dari organisasi itu sendiri (ISACA, 2019).
          </div>
          <div>
            <p>
              Dalam evaluasi kapabilitas menggunakan COBIT 5, setiap proses
              dalam tata kelola SPBE akan dievaluasi berdasarkan Model
              Kapabilitas Proses (Process Capability Model - PCM), yang juga
              memiliki skala Level 0 hingga Level 5:
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th>COBIT 5 Level</th>
                  <th>Deskripsi</th>
                  <th>Korelasi dengan SPBE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Level 0 - Incomplete</td>
                  <td>Tidak ada proses yang jelas</td>
                  <td> SPBE belum ada atau sangat terbatas</td>
                </tr>
                <tr>
                  <td>Level 1 - Performed</td>
                  <td>Proses dilakukan secara ad-hoc</td>
                  <td>SPBE Inisialisasi</td>
                </tr>
                <tr>
                  <td>Level 2 - Managed</td>
                  <td>Proses sudah dikelola dasar</td>
                  <td>SPBE Tersusun</td>
                </tr>
                <tr>
                  <td>Level 3 - Established</td>
                  <td>Proses terdokumentasi dan diterapkan</td>
                  <td>SPBE Terpadu</td>
                </tr>
                <tr>
                  <td>Level 4 - Predictable</td>
                  <td>Proses terukur dan dikelola sistematis</td>
                  <td>SPBE Terkelola & Terukur</td>
                </tr>
                <tr>
                  <td>Level 5 - Optimizing</td>
                  <td>Proses berjalan optimal & inovatif</td>
                  <td>SPBE Optimum</td>
                </tr>
              </tbody>
            </table>
          </div>
          Pada COBIT 5 ada beberapa domain yaitu :
          <table className="table">
            <thead>
              <tr>
                <th>Domain Proses </th>
                <th>Proses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>EDM</td>
                <td>
                  Evaluate, Direct, and Monitor (Mengevaluasi, Mengarahkan, dan
                  Memantau)
                </td>
              </tr>
              <tr>
                <td>APO</td>
                <td>
                  Align, Plan and Organise (Menyelaraskan, Merencanakan, dan
                  Mengorganisir)
                </td>
              </tr>
              <tr>
                <td>BAI</td>
                <td>
                  Build, Acquire and Implement (Membangun, Memperoleh, dan
                  Menerapkan)
                </td>
              </tr>
              <tr>
                <td>DSS</td>
                <td>
                  Deliver, Service and Support (Penyediaan, Layanan, dan
                  Dukungan)
                </td>
              </tr>
              <tr>
                <td>MEA</td>
                <td>
                  Monitor, Evaluate, and Assess (Monitor, Evaluasi, dan Menilai)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
