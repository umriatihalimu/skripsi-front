export interface itSoalKuesioner {
  judul: string;
  deskripsi: string;
  indikator: Indikator[];
  tingkat_kematangan: Record<string, string>;
}

interface Indikator {
  id: string;
  nama: string;
  pertanyaan: Pertanyaan[];
}

interface Pertanyaan {
  id: string;
  teks: string;
  opsi_jawaban: string[];
  jawaban: string;
}

export const data_kuisioner: itSoalKuesioner = {
  judul: "Kuisioner Manajemen Risiko SPBE",
  deskripsi:
    "Kuisioner ini bertujuan untuk menilai tingkat kematangan penerapan manajemen risiko SPBE berdasarkan domain COBIT 5 APO12 pada level 1.",
  indikator: [
    {
      id: "1",
      nama: "Kesadaran Risiko SPBE",
      pertanyaan: [
        {
          id: "1.1",
          teks: "Apakah organisasi menyadari pentingnya manajemen risiko SPBE?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "1.2",
          teks: "Apakah terdapat inisiatif awal untuk mengidentifikasi risiko terkait SPBE?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
      ],
    },
    {
      id: "2",
      nama: "Penerapan Awal Identifikasi Risiko",
      pertanyaan: [
        {
          id: "2.1",
          teks: "Apakah organisasi telah memulai proses identifikasi risiko terkait SPBE secara informal?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "2.2",
          teks: "Apakah terdapat upaya untuk mendokumentasikan risiko yang teridentifikasi meskipun belum terstruktur?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
      ],
    },
    {
      id: "3",
      nama: "Kesadaran Dampak Risiko",
      pertanyaan: [
        {
          id: "3.1",
          teks: "Apakah organisasi mulai memahami dampak risiko SPBE terhadap pencapaian tujuan?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "3.2",
          teks: "Apakah organisasi telah mengidentifikasi risiko prioritas meskipun belum ada proses formal?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
      ],
    },
  ],
  tingkat_kematangan: {
    "0": "Tidak ada proses yang diterapkan.",
    "1": "Proses dilakukan secara ad-hoc.",
    "2": "Proses telah direncanakan namun belum konsisten.",
    "3": "Proses telah didokumentasikan dan diterapkan secara konsisten.",
    "4": "Proses telah dimonitor dan diukur efektivitasnya.",
    "5": "Proses dioptimalkan secara berkelanjutan.",
  },
};
