import { expiresIn, getToken, validateToken } from "@navikt/oasis";
import { getEnv } from "~/utils/env.utils";
import { INetworkResponse } from "~/models/networkResponse";

export interface ISessionData {
  expiresIn: number;
}

export async function getSession(req: Request): Promise<INetworkResponse<ISessionData>> {
  if (getEnv("IS_LOCALHOST") === "true" && getEnv("DP_SOKNAD_ORKESTRATOR_TOKEN")) {
    return {
      status: "success",
      data: {
        expiresIn: expiresIn(getEnv("DP_SOKNAD_ORKESTRATOR_TOKEN")),
      },
    };
  }

  const token = getToken(req);

  if (!token) {
    return {
      status: "error",
      error: {
        statusCode: 401,
        statusText: "Token not found",
      },
    };
  }

  const validation = await validateToken(token);
  if (!validation.ok) {
    return {
      status: "error",
      error: {
        statusCode: 401,
        statusText: "Invalid token",
      },
    };
  }

  return {
    status: "success",
    data: {
      expiresIn: expiresIn(token),
    },
  };
}
