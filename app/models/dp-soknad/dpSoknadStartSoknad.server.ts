import { getDPSoknadOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "../networkResponse";

export async function dpSoknadStartSoknad(
  request: Request,
  uuid: string
): Promise<INetworkResponse<string>> {
  const url = `${getEnv("DP_SOKNAD_URL")}/soknad?søknadId=${uuid}`;
  const onBehalfOfToken = await getDPSoknadOboToken(request);

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
        statusText: "Feil ved oppretting av ny søknad. dp-soknad",
      },
    };
  }

  return { status: "success", data: response.statusText };
}
