export type tb_kuisioner = {
  id_kuisioner: number;
  kuisioner: string;
  time_stamp: Date;
  id_indikator: number;
  level: number;
};
export type itPertanyaan = {
  id_kuisioner: number;
  level: number;
  kuisioner: string;
  time_stamp: Date;
  id_indikator: number;
  jawaban: string;
};
