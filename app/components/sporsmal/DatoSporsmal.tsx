import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { useFetcher } from "@remix-run/react";
import { formatISO } from "date-fns";
import { useTypedLoaderData } from "remix-typedjson";
import { loader } from "~/routes/$soknadId";
import { ISpørsmal } from "~/types/sporsmal";

export function DatoSporsmal(props: ISpørsmal) {
  const { tekstnøkkel, svar } = props;
  const { soknadId } = useTypedLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: !svar ? undefined : JSON.parse(svar),
    onDateChange: (date) => saveSvar(date),
  });

  function saveSvar(date: Date | undefined) {
    const svar = date ? formatISO(date?.toDateString()) : "";

    const formData = new FormData();
    formData.append("sporsmal", JSON.stringify(props));
    formData.append("svar", JSON.stringify(svar));
    formData.append("soknadId", soknadId);

    fetcher.submit(formData, { method: "post", action: "/$soknadId/action" });
  }

  return (
    <fetcher.Form>
      <DatePicker {...datepickerProps}>
        <DatePicker.Input name="sporsmal" {...inputProps} label={tekstnøkkel} />
      </DatePicker>
    </fetcher.Form>
  );
}
