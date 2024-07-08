import { TextField } from "@navikt/ds-react";
import { ISpørsmal } from "~/types/sporsmal";

export function TekstSporsmal(props: ISpørsmal) {
  const { tekstnøkkel, svar } = props;

  return (
    <TextField
      name="sporsmal"
      label={tekstnøkkel}
      value={svar || ""}
      onChange={(e) => console.log(e.target.value)}
    />
  );
}
