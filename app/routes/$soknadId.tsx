import { LoaderFunctionArgs } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { SoknadHeader } from "~/components/soknad-header/SoknadHeader";
import { SporsmalGruppe } from "~/components/sporsmal-gruppe/SporsmalGruppe";
import { getNesteSporsmal } from "~/models/getNesteSporsmal.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.soknadId, "params.soknadId er påkrevd");

  const nesteSporsmal = await getNesteSporsmal(request, params.soknadId);

  if (nesteSporsmal.status === "error") {
    const { statusCode, statusText } = nesteSporsmal.error;
    throw new Response("Error", { status: statusCode, statusText: statusText });
  }

  return typedjson({ sporsmalGruppe: nesteSporsmal.data });
}

export default function SoknadIdPage() {
  const { sporsmalGruppe } = useTypedLoaderData<typeof loader>();

  return (
    <main>
      <div className="dp-soknad-frontend">
        <SoknadHeader />
        <SporsmalGruppe {...sporsmalGruppe} />
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <div className="dp-soknad-frontend">
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </div>
      </main>
    );
  } else if (error instanceof Error) {
    return (
      <main>
        <div className="dp-soknad-frontend">
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <div className="dp-soknad-frontend">
          <h1>Unknown Error</h1>
        </div>
      </main>
    );
  }
}
