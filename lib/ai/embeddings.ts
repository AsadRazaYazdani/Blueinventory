import {embedWithGemini} from "./gemini";

const DIMENSIONS = 256;

const tokenize = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, " ")
		.split(/\s+/)
		.filter((token) => token.length > 1);

const hashToken = (token: string) => {
	let hash = 2166136261;
	for (let i = 0; i < token.length; i += 1) {
		hash ^= token.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return Math.abs(hash);
};

const normalize = (vector: number[]) => {
	const magnitude = Math.sqrt(
		vector.reduce((sum, value) => sum + value * value, 0)
	);
	if (!magnitude) return vector;
	return vector.map((value) => value / magnitude);
};

export const embedLocally = (text: string) => {
	const vector = new Array(DIMENSIONS).fill(0);
	tokenize(text).forEach((token) => {
		const bucket = hashToken(token) % DIMENSIONS;
		vector[bucket] += 1;
	});
	return normalize(vector);
};

export const cosineSimilarity = (left: number[], right: number[]) => {
	const length = Math.min(left.length, right.length);
	let score = 0;
	for (let i = 0; i < length; i += 1) {
		score += left[i] * right[i];
	}
	return score;
};

export const embedText = async (text: string) => {
	if (!process.env.GEMINI_API_KEY) {
		return embedLocally(text);
	}

	try {
		const values = await embedWithGemini(text);
		if (values?.length) return values;
	} catch (error) {
		console.log("Embedding fallback");
	}

	return embedLocally(text);
};
