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
  judul: "Kuisioner Tata Kelola dan Perencanaan Strategis SPBE",
  deskripsi:
    "Kuisioner ini bertujuan untuk mengukur tingkat kematangan arsitektur SPBE di instansi pusat/pemerintah daerah berdasarkan tata kelola dan perencanaan strategis.",
  indikator: [
    {
      id: "1",
      nama: "Tata Kelola SPBE",
      pertanyaan: [
        {
          id: "1.1",
          teks: "Apakah instansi Anda memiliki kebijakan formal terkait tata kelola SPBE?",
          opsi_jawaban: ["Ya", "Tidak", "Dalam Proses"],
          jawaban: "",
        },
        {
          id: "1.2",
          teks: "Seberapa sering kebijakan tata kelola SPBE diperbarui?",
          opsi_jawaban: [
            "Setiap tahun",
            "Setiap 2-3 tahun",
            "Lebih dari 3 tahun",
            "Tidak pernah",
          ],
          jawaban: "",
        },
        {
          id: "1.3",
          teks: "Apakah terdapat tim atau unit khusus yang bertanggung jawab atas tata kelola SPBE?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "1.4",
          teks: "Seberapa jelas peran dan tanggung jawab dalam tata kelola SPBE di instansi Anda?",
          opsi_jawaban: [
            "Sangat jelas",
            "Cukup jelas",
            "Kurang jelas",
            "Tidak jelas",
          ],
          jawaban: "",
        },
        {
          id: "1.5",
          teks: "Apakah ada pelatihan rutin untuk meningkatkan kompetensi terkait tata kelola SPBE?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "1.6",
          teks: "Apakah instansi Anda memiliki panduan atau framework tata kelola SPBE?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "1.7",
          teks: "Seberapa sering dilakukan evaluasi terhadap implementasi tata kelola SPBE?",
          opsi_jawaban: [
            "Setiap 6 bulan",
            "Setiap tahun",
            "Lebih dari setahun sekali",
            "Tidak pernah",
          ],
          jawaban: "",
        },
        {
          id: "1.8",
          teks: "Apakah tata kelola SPBE diintegrasikan dengan tata kelola IT secara umum?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "1.9",
          teks: "Apakah ada mekanisme pengawasan independen terhadap tata kelola SPBE?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "1.10",
          teks: "Seberapa efektif tata kelola SPBE dalam mendukung tujuan strategis instansi Anda?",
          opsi_jawaban: [
            "Sangat efektif",
            "Cukup efektif",
            "Kurang efektif",
            "Tidak efektif",
          ],
          jawaban: "",
        },
      ],
    },
    {
      id: "2",
      nama: "Perencanaan Strategis SPBE",
      pertanyaan: [
        {
          id: "2.1",
          teks: "Apakah instansi Anda memiliki dokumen perencanaan strategis SPBE yang terdokumentasi?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "2.2",
          teks: "Seberapa sering dokumen perencanaan strategis SPBE diperbarui?",
          opsi_jawaban: [
            "Setiap tahun",
            "Setiap 2-3 tahun",
            "Lebih dari 3 tahun",
            "Tidak pernah",
          ],
          jawaban: "",
        },
        {
          id: "2.3",
          teks: "Apakah perencanaan strategis SPBE diintegrasikan dengan rencana strategis instansi?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "2.4",
          teks: "Apakah pemangku kepentingan dilibatkan dalam penyusunan perencanaan strategis SPBE?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "2.5",
          teks: "Apakah terdapat target yang terukur dalam perencanaan strategis SPBE?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "2.6",
          teks: "Apakah terdapat alokasi anggaran khusus untuk implementasi perencanaan strategis SPBE?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "2.7",
          teks: "Seberapa sering dilakukan evaluasi terhadap implementasi perencanaan strategis SPBE?",
          opsi_jawaban: [
            "Setiap 6 bulan",
            "Setiap tahun",
            "Lebih dari setahun sekali",
            "Tidak pernah",
          ],
          jawaban: "",
        },
        {
          id: "2.8",
          teks: "Apakah perencanaan strategis SPBE memuat peta jalan (roadmap) pengembangan SPBE?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
        {
          id: "2.9",
          teks: "Seberapa jelas arah dan tujuan dalam perencanaan strategis SPBE?",
          opsi_jawaban: [
            "Sangat jelas",
            "Cukup jelas",
            "Kurang jelas",
            "Tidak jelas",
          ],
          jawaban: "",
        },
        {
          id: "2.10",
          teks: "Apakah perencanaan strategis SPBE memuat indikator kinerja utama (IKU)?",
          opsi_jawaban: ["Ya", "Tidak"],
          jawaban: "",
        },
      ],
    },
  ],
  tingkat_kematangan: {
    "1": "Awal",
    "2": "Berkembang",
    "3": "Terdefinisi",
    "4": "Terkelola dan Terukur",
    "5": "Dioptimalkan",
  },
};
