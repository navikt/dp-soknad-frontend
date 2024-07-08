import { ActionFunctionArgs } from "@remix-run/node";
import { lagreSvar } from "~/models/lagreSvar.server";
import { ISpørsmal } from "~/types/sporsmal";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const sporsmal = formData.get("sporsmal") as string;
  const svar = formData.get("svar") as string;
  const soknadId = formData.get("soknadId") as string;

  const parsedSporsmal = JSON.parse(sporsmal);
  const svarObject: ISpørsmal = { ...parsedSporsmal, svar };

  return await lagreSvar(request, soknadId, svarObject);
}
