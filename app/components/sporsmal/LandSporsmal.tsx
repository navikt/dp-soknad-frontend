import { Select } from "@navikt/ds-react";
import { useFetcher } from "@remix-run/react";
import { ChangeEvent, useState } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import { loader } from "~/routes/$soknadId";
import { ISpørsmal } from "~/types/sporsmal";

export function LandSporsmal(props: ISpørsmal) {
  const { tekstnøkkel, svar, gyldigeSvar } = props;
  const { soknadId } = useTypedLoaderData<typeof loader>();
  const [currentAnswer, setCurrentAnswer] = useState(svar || "");
  const fetcher = useFetcher();

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    setCurrentAnswer(event.target.value);

    const formData = new FormData();
    formData.append("sporsmal", JSON.stringify(props));
    formData.append("svar", event.target.value);
    formData.append("soknadId", soknadId);

    fetcher.submit(formData, { method: "post", action: "/$soknadId/action" });
  }

  return (
    <fetcher.Form>
      <Select name="sporsmal" label={tekstnøkkel} value={currentAnswer} onChange={onChange}>
        <option value="">Velg land</option>
        {gyldigeSvar.map((svar: string) => (
          <option key={svar} value={svar}>
            {svar}
          </option>
        ))}
      </Select>
    </fetcher.Form>
  );
}
