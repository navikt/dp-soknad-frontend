import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { ISpørsmal } from "~/types/sporsmal";

export function DatoSporsmal(props: ISpørsmal) {
  const { tekstnøkkel, svar } = props;

  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date(svar),
    onDateChange: console.log,
  });

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input name="sporsmal" {...inputProps} label={tekstnøkkel} />
    </DatePicker>
  );
}
