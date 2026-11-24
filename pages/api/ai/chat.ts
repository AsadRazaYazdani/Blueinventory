import type {NextApiRequest, NextApiResponse} from "next";
import {v4 as uuid} from "uuid";
import {getOrganizationId} from "@/lib/ai/org";
import {answerWithRag} from "@/lib/ai/rag";
import {assertQuestionAllowed, recordQuestion} from "@/lib/ai/usage";
import {getOrgStore, withOrgStore} from "@/lib/ai/store";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({error: "Method not allowed"});
	}

	const organizationId = getOrganizationId(req);
	const question = String(req.body?.question || "").trim();
	const conversationId = String(req.body?.conversationId || "");

	if (!question) {
		return res.status(400).json({error: "Question is required"});
	}

	try {
		assertQuestionAllowed(organizationId);
		const result = await answerWithRag(organizationId, question);
		recordQuestion(organizationId);

		const conversation = withOrgStore(organizationId, (store) => {
			const existing = store.conversations.find((item) => item.id === conversationId);
			const userMessage = {
				id: uuid(),
				role: "user" as const,
				content: question,
				createdAt: new Date().toISOString(),
			};

			if (existing) {
				existing.messages.push(userMessage, result.message);
				existing.updatedAt = new Date().toISOString();
				return existing;
			}

			const created = {
				id: uuid(),
				organizationId,
				title: question.slice(0, 72),
				messages: [userMessage, result.message],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			store.conversations.unshift(created);
			return created;
		});

		return res.status(200).json({
			conversationId: conversation.id,
			answer: result.answer,
			citations: result.citations,
			escalated: result.escalated,
			messages: conversation.messages,
			usage: getOrgStore(organizationId).usage,
		});
	} catch (error: any) {
		return res.status(400).json({
			error: "We could not complete that request just now.",
		});
	}
}
