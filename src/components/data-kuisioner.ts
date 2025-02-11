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
