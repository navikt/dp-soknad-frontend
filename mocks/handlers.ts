import { HttpResponse, bypass, http } from "msw";
import { getEnv } from "~/utils/env.utils";
import { getNesteSporsmalResponse } from "./responses/getNesteSporsmalResponse";

export const handlers = [
  http.post(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/start`, () => {
    return HttpResponse.json("a8326661-353e-4e4c-afe9-868ce349e086");
  }),

  http.post(`${getEnv("DP_SOKNAD_URL")}/soknad`, () => {
    return new HttpResponse(null, { status: 201 });
  }),

  http.get(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/:soknadId/neste`, () => {
    return HttpResponse.json(getNesteSporsmalResponse);
  }),

  // Bypassing mocks, use actual data instead
  http.get("https://rt6o382n.apicdn.sanity.io/*", async ({ request }) => {
    const bypassResponse = await fetch(bypass(request));
    const response = await bypassResponse.json();

    return HttpResponse.json(response);
  }),
];
