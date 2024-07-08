import { Radio, RadioGroup } from "@navikt/ds-react";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import { loader } from "~/routes/$soknadId";
import { ISpørsmal } from "~/types/sporsmal";

export function BooleanSporsmal(props: ISpørsmal) {
  const { tekstnøkkel, svar } = props;
  const { soknadId } = useTypedLoaderData<typeof loader>();
  const [currentAnswer, setCurrentAnswer] = useState(svar || undefined);
  const fetcher = useFetcher();

  function onChange(value: string) {
    setCurrentAnswer(value);

    const formData = new FormData();
    formData.append("sporsmal", JSON.stringify(props));
    formData.append("svar", value);
    formData.append("soknadId", soknadId);
    fetcher.submit(formData, { method: "post", action: "/$soknadId/action" });
  }

  return (
    <fetcher.Form>
      <RadioGroup legend={tekstnøkkel} onChange={onChange} value={currentAnswer}>
        <Radio value="true">Ja</Radio>
        <Radio value="false">Nei</Radio>
      </RadioGroup>
    </fetcher.Form>
  );
}
