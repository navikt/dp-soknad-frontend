import { BodyShort, Heading } from "@navikt/ds-react";
import { useSanity } from "~/hooks/useSanity";
import { getEnv } from "~/utils/env.utils";
import { ExternalLink } from "../ExternalLink";
import { FormattedDate } from "../FormattedDate";
import styles from "./SoknadList.module.css";
import { ISoknad } from "~/models/getFullfortSoknader.server";

interface IProps {
  soknad: ISoknad;
}

export function FullforteSoknad({ soknad }: IProps) {
  const { søknadId, tittel, datoInnsendt, endreLenke, erNySøknadsdialog } = soknad;
  const { getAppText } = useSanity();

  const ettersendingUrl = `${getEnv("DP_SOKNADSDIALOG_URL")}/soknad/${søknadId}/ettersending`;
  const generellInnsendingUrl = `${getEnv("DP_SOKNADSDIALOG_URL")}/generell-innsending`;
  const fallbackGenerellInnsending = !søknadId && !endreLenke;

  return (
    <li className={styles.soknadContainer}>
      <article className={styles.soknadContent} aria-labelledby={`tittel-${søknadId}`}>
        <Heading level="3" size="small" id={`tittel-${søknadId}`}>
          {tittel}
        </Heading>
        <BodyShort className={styles.soknadDate} size="small">
          {getAppText("fullfort-soknad.sendt-dato.label-tekst")}{" "}
          <FormattedDate date={datoInnsendt} />
        </BodyShort>
      </article>
      <nav className={styles.soknadLinksContainer}>
        {erNySøknadsdialog && (
          <>
            <ExternalLink to={ettersendingUrl} asButtonVariant="primary" size="small">
              {getAppText("fullfort-soknad.send-dokumentasjon.knapp-tekst")}
            </ExternalLink>
            <ExternalLink to={endreLenke} asButtonVariant="secondary" size="small">
              {getAppText("fullfort-soknad.se-soknad.knapp-tekst")}
            </ExternalLink>
          </>
        )}
        {!erNySøknadsdialog && !fallbackGenerellInnsending && (
          <ExternalLink to={endreLenke} asButtonVariant="primary" size="small">
            {getAppText("fullfort-soknad.send-dokumentasjon.knapp-tekst")}
          </ExternalLink>
        )}
        {fallbackGenerellInnsending && (
          <ExternalLink to={generellInnsendingUrl} asButtonVariant="primary" size="small">
            {getAppText("fullfort-soknad.send-dokumentasjon.knapp-tekst")}
          </ExternalLink>
        )}
      </nav>
    </li>
  );
}
