import type {NextApiRequest, NextApiResponse} from "next";
import {getOrganizationId} from "@/lib/ai/org";
import {AI_PLANS} from "@/lib/ai/plans";
import {setOrganizationPlan} from "@/lib/ai/usage";
import {getOrgStore} from "@/lib/ai/store";
import {PlanId} from "@/lib/ai/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const organizationId = getOrganizationId(req);

	if (req.method === "GET") {
		return res.status(200).json({
			plans: AI_PLANS,
			usage: getOrgStore(organizationId).usage,
		});
	}

	if (req.method === "POST") {
		const planId = String(req.body?.planId || "free") as PlanId;
		const usage = setOrganizationPlan(organizationId, planId);
		return res.status(200).json({usage, plans: AI_PLANS});
	}

	res.setHeader("Allow", "GET,POST");
	return res.status(405).json({error: "Method not allowed"});
}
