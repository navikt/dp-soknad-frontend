import { getDPSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "./networkResponse";

interface IStartSoknad {
  soknadId: string;
}

export async function startSoknad(request: Request): Promise<INetworkResponse<IStartSoknad>> {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/start`;

  const onBehalfOfToken = await getDPSoknadOrkestratorOboToken(request);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });

  if (!response.ok) {
    return {
      status: "error",
      error: {
        statusCode: response.status,
        statusText: "Feil ved oppretting av ny søknad: dp-orkestrator",
      },
    };
  }

  const soknadId: string = await response.json();

  return { status: "success", data: { soknadId } };
}
