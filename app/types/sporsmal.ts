export type SpørsmålTypes = "LAND" | "PERIODE" | "DATO" | "TEKST" | "BOOLEAN";

export interface ISpørsmal {
  id: string;
  tekstnøkkel: string;
  type: SpørsmålTypes;
  /* eslint-disable */
  svar: any;
  gyldigeSvar: any;
  /* eslint-enable */
}

export interface ISpørsmålGruppe {
  id: number;
  navn: string;
  nesteSpørsmål: ISpørsmal;
  besvarteSpørsmål: ISpørsmal[];
}
