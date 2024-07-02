import { Button, ConfirmationPanel } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { ReadMore } from "~/components/sanity-aksel-components/readmore/ReadMore";
import { Timeline } from "~/components/sanity-aksel-components/timeline/Timeline";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { useSanity } from "~/hooks/useSanity";
import { useSetFocus } from "~/hooks/useSetFocus";

export default function Index() {
  const startSoknad = useFetcher();
  const [consentGiven, setConsentGiven] = useState(false);
  const missingConsentRef = useRef<HTMLInputElement>(null);

  const { setFocus } = useSetFocus();
  const { getInfoPageText, getAppText } = useSanity();
  const startSideText = getInfoPageText("startside");

  useEffect(() => {
    if (startSoknad.data) {
      setFocus(missingConsentRef);
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
            ref={missingConsentRef}
            name="confirmationPanel"
            className="mb-10"
            checked={consentGiven}
            label={getAppText("start-soknad.checkbox.samtykke-riktige-opplysninger.label")}
            onChange={() => {
              setConsentGiven(!consentGiven);
            }}
            error={
              !consentGiven && startSoknad.data
                ? getAppText("start-soknad.checkbox.samtykke-innhenting-data.validering-tekst")
                : undefined
            }
          />
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
