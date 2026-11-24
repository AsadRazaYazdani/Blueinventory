import {v4 as uuid} from "uuid";
import {cosineSimilarity, embedText} from "./embeddings";
import {generateSupportReply} from "./gemini";
import {getOrgStore, withOrgStore} from "./store";
import {ChatCitation, ChatMessage} from "./types";

const TOP_K = 5;
const MIN_SCORE = 0.12;

export const searchOrganizationChunks = async (
	organizationId: string,
	question: string
) => {
	const store = getOrgStore(organizationId);
	const queryEmbedding = await embedText(question);

	return store.chunks
		.filter((chunk) => chunk.organizationId === organizationId)
		.map((chunk) => ({
			...chunk,
			score: cosineSimilarity(queryEmbedding, chunk.embedding),
		}))
		.sort((left, right) => right.score - left.score)
		.slice(0, TOP_K);
};

const buildFallbackAnswer = (
	chunks: Array<{content: string; fileName: string; page: number}>
) => {
	if (!chunks.length) {
		return "That is not covered in the current company records. A colleague will follow up shortly.";
	}

	const lead = chunks[0];
	return lead.content.split(/\n+/).slice(0, 3).join(" ").slice(0, 360);
};

export const answerWithRag = async (
	organizationId: string,
	question: string
) => {
	const matches = await searchOrganizationChunks(organizationId, question);
	const useful = matches.filter((match) => match.score >= MIN_SCORE);
	const citations: ChatCitation[] = useful.map((match) => ({
		documentId: match.documentId,
		fileName: match.fileName,
		page: match.page,
		score: Number(match.score.toFixed(3)),
	}));

	let answer = buildFallbackAnswer(useful);
	let escalated = useful.length === 0;

	if (process.env.GEMINI_API_KEY && useful.length) {
		const context = useful
			.map(
				(chunk, index) =>
					`Source ${index + 1}: ${chunk.fileName}, page ${chunk.page}\n${chunk.content}`
			)
			.join("\n\n");

		try {
			const generated = await generateSupportReply(
				`Company records:\n${context}\n\nCustomer question:\n${question}\n\nWrite a short support reply. If a document and page apply, mention them simply, for example: See Refund Policy, page 1.`
			);
			if (generated) {
				answer = generated;
				if (/follow up|do not have|don't have|not covered/i.test(generated)) {
					escalated = true;
				}
			}
		} catch (error) {
			console.log("Support reply fallback");
		}
	}

	if (escalated) {
		withOrgStore(organizationId, (store) => {
			store.tickets.unshift({
				id: uuid(),
				organizationId,
				question,
				status: "open",
				createdAt: new Date().toISOString(),
			});
		});
	}

	const message: ChatMessage = {
		id: uuid(),
		role: "assistant",
		content: answer,
		citations,
		createdAt: new Date().toISOString(),
		escalated,
	};

	return {answer, citations, escalated, message, matches: useful};
};
