import { Select } from "@navikt/ds-react";
import { ISpørsmal } from "~/types/sporsmal";

export function LandSporsmal(props: ISpørsmal) {
  const { tekstnøkkel, svar } = props;

  return (
    <Select label={tekstnøkkel} value={svar} onChange={(e) => console.log(e.target.value)}>
      <option value="">Velg land</option>
      <option value="NO">Norge</option>
      <option value="SE">Sverige</option>
      <option value="DK">Danmark</option>
      <option value="NLD">Nederland</option>
    </Select>
  );
}
