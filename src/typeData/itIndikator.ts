export type itKuisioner = {
  id_kuisioner: number;
  kuisioner: string;
};
export type itDomainSpbe = {
  id_spbe: number;
  indikator_spbe: string;
  nama_spbe: string;
};

export type FileMap = {
  [id_indikator: number]: File | null;
};

export type itDomain = {
  id_domain: number;
  domain: string;
};
export type itAspek = {
  id_aspek: number;
  aspek: string;
  tb_domain: itDomain;
};
export type itIndikator = {
  id_indikator: number;
  indikator: string;
  nama_indikator: string;
  tb_domain: itDomain;
  tb_aspek: itAspek;
  id_aspek: number;
};

export type itPenguji = {
  id_penguji: number;
  nama_penguji: string;
  jabatan: string;
  keterangan: string;
  tanggal_uji: string;
};

export type itJawabKuisioner = {
  id_aspek: number;
  id_domain: number;
  id_indikator: number;
  id_jawab_kuisioner: number;
  id_penguji: number;
  jawaban: string;
  level: number;
  soal: string;
};
