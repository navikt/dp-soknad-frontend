import { TextField } from "@navikt/ds-react";
import { useFetcher } from "@remix-run/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import { useDebouncedCallback } from "~/hooks/useDebouncedCallback";
import { loader } from "~/routes/$soknadId";
import { ISpørsmal } from "~/types/sporsmal";

export function TekstSporsmal(props: ISpørsmal) {
  const fetcher = useFetcher();
  const { tekstnøkkel, svar } = props;
  const { soknadId } = useTypedLoaderData<typeof loader>();
  const [currentAnswer, setCurrentAnswer] = useState<string>(svar ?? "");
  const [debouncedText, setDebouncedText] = useState<string>(currentAnswer);
  const debouncedChange = useDebouncedCallback(setDebouncedText, 1000);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setCurrentAnswer(value);
    debouncedChange(value);
  }

  function saveSvar() {
    const formData = new FormData();
    formData.append("sporsmal", JSON.stringify(props));
    formData.append("svar", debouncedText);
    formData.append("soknadId", soknadId);
    fetcher.submit(formData, { method: "post", action: "/$soknadId/action" });
  }

  useEffect(() => {
    if (debouncedText !== svar) {
      saveSvar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  return (
    <fetcher.Form>
      <TextField name="sporsmal" label={tekstnøkkel} value={currentAnswer} onChange={onChange} />
    </fetcher.Form>
  );
}
