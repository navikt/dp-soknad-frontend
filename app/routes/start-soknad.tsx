import { Alert, Button, ConfirmationPanel } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { ReadMore } from "~/components/sanity-aksel-components/readmore/ReadMore";
import { Timeline } from "~/components/sanity-aksel-components/timeline/Timeline";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { useSanity } from "~/hooks/useSanity";
import { useSetFocus } from "~/hooks/useSetFocus";
import { action } from "./start-soknad.action";

export default function Index() {
  const startSoknad = useFetcher<typeof action>();
  const [consentGiven, setConsentGiven] = useState(false);
  const confirmPanelRef = useRef<HTMLInputElement>(null);
  const startSoknadErrorRef = useRef<HTMLDivElement>(null);
  const { setFocus } = useSetFocus();
  const { getInfoPageText, getAppText } = useSanity();
  const startSideText = getInfoPageText("startside");

  useEffect(() => {
    if (startSoknad.data && !startSoknad.data.consentGiven) {
      setFocus(confirmPanelRef);
    }

    if (startSoknad.data && startSoknad.data.error) {
      setFocus(startSoknadErrorRef);
    }
  }, [startSoknad.data, setFocus]);

  return (
    <main>
      <div className="dp-soknad-frontend">
        <SoknadHeader />
        {startSideText?.body && (
          <PortableText
            value={startSideText.body}
            components={{ types: { timeline: Timeline, readMore: ReadMore } }}
          />
        )}
        <startSoknad.Form method="post" action="/start-soknad/action">
          <ConfirmationPanel
            ref={confirmPanelRef}
            name="confirmationPanel"
            className="mb-10"
            checked={consentGiven}
            label={getAppText("start-soknad.checkbox.samtykke-riktige-opplysninger.label")}
            onChange={() => {
              setConsentGiven(!consentGiven);
            }}
            error={
              !consentGiven && startSoknad.data && !startSoknad.data.consentGiven
                ? getAppText("start-soknad.checkbox.samtykke-innhenting-data.validering-tekst")
                : undefined
            }
          />

          {startSoknad.data && startSoknad.data.error && (
            <Alert variant="error" className="mb-10" ref={startSoknadErrorRef}>
              {startSoknad.data.error.statusText}
            </Alert>
          )}
          <Button
            variant="primary"
            size="medium"
            type="submit"
            loading={startSoknad.state !== "idle"}
          >
            {getAppText("start-soknad.knapp.start")}
          </Button>
        </startSoknad.Form>
      </div>
    </main>
  );
}
