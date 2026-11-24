import type {NextApiRequest, NextApiResponse} from "next";
import {getOrganizationId} from "@/lib/ai/org";
import {getPlan} from "@/lib/ai/plans";
import {seedSampleKnowledge} from "@/lib/ai/seed";
import {getOrgStore} from "@/lib/ai/store";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		res.setHeader("Allow", "GET");
		return res.status(405).json({error: "Method not allowed"});
	}

	const organizationId = getOrganizationId(req);
	await seedSampleKnowledge(organizationId);
	const store = getOrgStore(organizationId);
	const questions = store.conversations.reduce(
		(total, conversation) =>
			total + conversation.messages.filter((message) => message.role === "user").length,
		0
	);
	const escalated = store.tickets.length;
	const resolved = store.tickets.filter((ticket) => ticket.status === "resolved").length;

	return res.status(200).json({
		organizationId,
		plan: getPlan(store.usage.planId),
		usage: store.usage,
		stats: {
			documents: store.documents.length,
			questions,
			questionsThisMonth: store.usage.questionsThisMonth,
			escalated,
			resolved,
			openTickets: escalated - resolved,
			conversations: store.conversations.length,
			readyDocuments: store.documents.filter((item) => item.status === "ready").length,
		},
		documents: store.documents,
		tickets: store.tickets.slice(0, 12),
		conversations: store.conversations.slice(0, 8),
	});
}
