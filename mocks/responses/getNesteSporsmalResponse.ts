import { ISpørsmålGruppe } from "~/types/sporsmal";

export const getNesteSporsmalResponse: ISpørsmålGruppe = {
  id: 1,
  navn: "BOSTEDSLAND",
  besvarteSpørsmål: [
    {
      id: "537f9536-6889-4747-9552-69c8988293e0",
      tekstnøkkel: "bostedsland.hvilket-land-bor-du-i",
      type: "LAND",
      svar: "NLD",
      gyldigeSvar: [Array],
    },
    {
      id: "82abfbd0-f38e-4169-a0ee-f3c6a267e4e4",
      tekstnøkkel: "bostedsland.reist-tilbake-til-norge",
      type: "BOOLEAN",
      svar: "true",
      gyldigeSvar: null,
    },
    {
      id: "9baf875c-fd6d-4299-933b-1fd66c514096",
      tekstnøkkel: "bostedsland.dato-for-avreise",
      type: "PERIODE",
      svar: "PeriodeSvar(fom=2024-06-19, tom=2024-07-03)",
      gyldigeSvar: null,
    },
    {
      id: "84776baf-05da-454f-a39e-ac8757ae59e3",
      tekstnøkkel: "bostedsland.hvorfor",
      type: "TEKST",
      svar: "Derfor",
      gyldigeSvar: null,
    },
    {
      id: "a1e57a1c-6715-4fc5-9f67-84f54104f480",
      tekstnøkkel: "bostedsland.en-gang-i-uken",
      type: "BOOLEAN",
      svar: "true",
      gyldigeSvar: null,
    },
  ],
  nesteSpørsmål: {
    id: "d82f500d-5f23-40b8-b83f-b429124c2e0e",
    tekstnøkkel: "bostedsland.rotasjon",
    type: "BOOLEAN",
    svar: null,
    gyldigeSvar: null,
  },
};
