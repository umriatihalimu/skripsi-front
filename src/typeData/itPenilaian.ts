export type itSkor = {
  id_skor: number;
  id_penguji: number;
  id_indikator: number;
  level: number;
  skor: number;
  tb_indikator: itIndikatorPenilaian;
};

export type itIndikatorPenilaian = {
  id_indikator: number;
  indikator: string;
  nama_indikator: string;
  jawab_kuisioner: {
    id_jawab_kuisioner: number;
    level: number;
    soal: string;
    jawaban: string;
    nama_file: string;
  }[];
};
