export type itKuisioner = {
  id_kuisioner: number;
  kuisioner: string;
};
export type itDomainSpbe = {
  id_spbe: number;
  indikator_spbe: string;
  nama_spbe: string;
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
