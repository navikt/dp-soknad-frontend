import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { useFetcher } from "@remix-run/react";
import { formatISO } from "date-fns";
import { useEffect, useState } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import { loader } from "~/routes/$soknadId";
import { ISpørsmal } from "~/types/sporsmal";

export function PeriodeSporsmal(props: ISpørsmal) {
  const { tekstnøkkel, svar } = props;
  const { soknadId } = useTypedLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const [currentFomDate, setcurrentFomDate] = useState<Date | undefined>(undefined);
  const [currentTomDate, setcurrentTomDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (currentFomDate && currentTomDate) {
      saveSvar();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFomDate, currentTomDate]);

  const { datepickerProps: fraProps, inputProps: fra } = useDatepicker({
    defaultSelected: !svar ? undefined : JSON.parse(svar)["fom"],
    onDateChange: (date: Date | undefined) => setcurrentFomDate(date),
  });

  const { datepickerProps: tilProps, inputProps: til } = useDatepicker({
    defaultSelected: !svar ? undefined : JSON.parse(svar)["tom"],
    onDateChange: (date: Date | undefined) => setcurrentTomDate(date),
  });

  function formattedDate() {
    if (currentFomDate && currentTomDate) {
      const fom = formatISO(currentFomDate);
      const tom = formatISO(currentTomDate);

      console.log(`🔥 fom :`, fom);
      console.log(`🔥 tom :`, tom);

      return {
        fom,
        tom,
      };
    }
  }

  function saveSvar() {
    const formData = new FormData();
    formData.append("sporsmal", JSON.stringify(props));
    formData.append("svar", JSON.stringify(formattedDate()));
    formData.append("soknadId", soknadId);

    fetcher.submit(formData, { method: "post", action: "/$soknadId/action" });
  }

  return (
    <fetcher.Form>
      <DatePicker {...fraProps}>
        <DatePicker.Input name="sporsmal-fra" {...fra} label={tekstnøkkel} />
      </DatePicker>
      <DatePicker {...tilProps}>
        <DatePicker.Input name="sporsmal-til" {...til} label={tekstnøkkel} />
      </DatePicker>
    </fetcher.Form>
  );
}
