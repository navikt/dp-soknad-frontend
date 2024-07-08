import { getDPSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "./networkResponse";
import { ISpørsmålGruppe } from "~/types/sporsmal";

export async function hentNesteSporsmal(
  request: Request,
  soknadId: string
): Promise<INetworkResponse<ISpørsmålGruppe>> {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${soknadId}/neste`;

  const onBehalfOfToken = await getDPSoknadOrkestratorOboToken(request);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });

  if (!response.ok) {
    return {
      status: "error",
      error: {
        statusCode: response.status,
        statusText: "Feil ved henting av neste spørsmål",
      },
    };
  }

  const data = await response.json();

  return { status: "success", data };
}
