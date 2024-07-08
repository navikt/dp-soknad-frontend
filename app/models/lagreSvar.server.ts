import { ISpørsmal } from "~/types/sporsmal";
import { getDPSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "./networkResponse";

export async function lagreSvar(
  request: Request,
  soknadId: string,
  svar: ISpørsmal
): Promise<INetworkResponse<object>> {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${soknadId}/svar`;
  const onBehalfOfToken = await getDPSoknadOrkestratorOboToken(request);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(svar),
  });

  if (!response.ok) {
    return {
      status: "error",
      error: {
        statusCode: response.status,
        statusText: "Feil ved lagring av svar",
      },
    };
  }

  return { status: "success", data: {} };
}
