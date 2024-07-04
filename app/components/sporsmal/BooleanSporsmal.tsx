import { Radio, RadioGroup } from "@navikt/ds-react";
import { ISpørsmal } from "~/types/sporsmal";

export function BooleanSporsmal(props: ISpørsmal) {
  const { tekstnøkkel, svar } = props;

  const handleChange = (val: string) => console.log(val);

  return (
    <RadioGroup legend={tekstnøkkel} onChange={handleChange} value={svar}>
      <Radio value="true">Ja</Radio>
      <Radio value="false">Nei</Radio>
    </RadioGroup>
  );
}
