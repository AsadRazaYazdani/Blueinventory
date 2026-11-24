const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

const getApiKey = () => process.env.GEMINI_API_KEY || "";

const getChatModel = () =>
	process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

const getEmbeddingModel = () =>
	process.env.GEMINI_EMBEDDING_MODEL || "text-embedding-004";

const requestGemini = async (path: string, body: Record<string, unknown>) => {
	const apiKey = getApiKey();
	if (!apiKey) {
		throw new Error("Support service is not configured");
	}

	const response = await fetch(`${GEMINI_ENDPOINT}/${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-goog-api-key": apiKey,
		},
		body: JSON.stringify(body),
	});

	const payload = await response.json().catch(() => ({}));
	if (!response.ok) {
		throw new Error("Support service is temporarily unavailable");
	}

	return payload;
};

export const generateSupportReply = async (prompt: string) => {
	const payload = await requestGemini(`${getChatModel()}:generateContent`, {
		systemInstruction: {
			parts: [
				{
					text: "You write as a BlueInventory customer-support specialist. Answer in plain, confident English using only the supplied company documents. Sound like a person on the support desk, not a generated assistant. Do not mention models, APIs, prompts, embeddings, or how the reply was produced. Do not use filler such as Certainly, Of course, As an AI, or Happy to help. If the documents do not cover the question, say a colleague will follow up. Keep replies short and specific.",
				},
			],
		},
		contents: [
			{
				role: "user",
				parts: [{text: prompt}],
			},
		],
		generationConfig: {
			temperature: 0.3,
			maxOutputTokens: 512,
		},
	});

	const text = payload?.candidates?.[0]?.content?.parts
		?.map((part: {text?: string}) => part.text || "")
		.join("\n")
		.trim();

	return text || "";
};

export const embedWithGemini = async (text: string) => {
	const payload = await requestGemini(`${getEmbeddingModel()}:embedContent`, {
		content: {
			parts: [{text: text.slice(0, 8000)}],
		},
	});

	return payload?.embedding?.values as number[] | undefined;
};
