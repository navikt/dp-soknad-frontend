import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import { dpSoknadCreateSoknad } from "~/models/dp-soknad/dpSoknadCreateSoknad.server";
import { startSoknad } from "~/models/startSoknad.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const confirmationPanel = formData.get("confirmationPanel");

  if (!confirmationPanel) {
    return typedjson({ confirmed: false });
  }

  const startSoknadResponse = await startSoknad(request);

  if (startSoknadResponse.status === "error") {
    return typedjson({ error: startSoknadResponse.error, confirmed: true });
  }

  const soknadId = startSoknadResponse.data.soknadId;

  const dpSoknadCreateSoknadResponse = await dpSoknadCreateSoknad(request, soknadId);

  if (dpSoknadCreateSoknadResponse.status === "error") {
    return typedjson({ error: dpSoknadCreateSoknadResponse.error, confirmed: true });
  }

  return redirect(`/${soknadId}`);
}
