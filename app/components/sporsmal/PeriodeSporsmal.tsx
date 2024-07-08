import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { ISpørsmal } from "~/types/sporsmal";

export function PeriodeSporsmal(props: ISpørsmal) {
  const { tekstnøkkel, svar } = props;

  function getFomDate() {
    const match = svar?.match(/fom=(\d{4}-\d{2}-\d{2})/);
    return match ? new Date(match[1]) : undefined;
  }

  function getTomDate() {
    const match = svar?.match(/tom=(\d{4}-\d{2}-\d{2})/);
    return match ? new Date(match[1]) : undefined;
  }

  const { datepickerProps: fraProps, inputProps: fra } = useDatepicker({
    defaultSelected: getFomDate(),
    onDateChange: console.log,
  });

  const { datepickerProps: tilProps, inputProps: til } = useDatepicker({
    defaultSelected: getTomDate(),
    onDateChange: console.log,
  });

  return (
    <>
      <DatePicker {...fraProps}>
        <DatePicker.Input name="sporsmal-fra" {...fra} label={tekstnøkkel} />
      </DatePicker>

      <DatePicker {...tilProps}>
        <DatePicker.Input name="sporsmal-til" {...til} label={tekstnøkkel} />
      </DatePicker>
    </>
  );
}
