import { Alert } from "@navikt/ds-react";
import { ISpørsmal, ISpørsmålGruppe } from "~/types/sporsmal";
import { BooleanSporsmal } from "../sporsmal/BooleanSporsmal";
import { DatoSporsmal } from "../sporsmal/DatoSporsmal";
import { LandSporsmal } from "../sporsmal/LandSporsmal";
import { PeriodeSporsmal } from "../sporsmal/PeriodeSporsmal";
import { TekstSporsmal } from "../sporsmal/TekstSporsmal";

export function SporsmalGruppe(props: ISpørsmålGruppe) {
  const { navn, nesteSpørsmål, besvarteSpørsmål } = props;

  function renderSporsmal(spørsmål: ISpørsmal) {
    if (!spørsmål) return null;

    switch (spørsmål.type) {
      case "TEKST":
        return <TekstSporsmal {...spørsmål} />;
      case "BOOLEAN":
        return <BooleanSporsmal {...spørsmål} />;
      case "LAND":
        return <LandSporsmal {...spørsmål} />;
      case "DATO":
        return <DatoSporsmal {...spørsmål} />;
      case "PERIODE":
        return <PeriodeSporsmal {...spørsmål} />;
      default:
        return (
          <Alert variant="error">
            Error - Brukes til å informere brukeren om at noe kritisk har skjedd.
          </Alert>
        );
    }
  }

  return (
    <div>
      <h2>{navn}</h2>
      <div>
        {besvarteSpørsmål.map((spørsmål: ISpørsmal) => {
          return (
            <div key={spørsmål.id} className="my-10">
              {renderSporsmal(spørsmål)}
            </div>
          );
        })}
      </div>

      <div className="my-10">{renderSporsmal(nesteSpørsmål)}</div>
    </div>
  );
}
