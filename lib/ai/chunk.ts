export type TextChunk = {
	page: number;
	index: number;
	content: string;
};

const TARGET_CHARS = 1400;
const OVERLAP_CHARS = 220;

export const splitPagesIntoChunks = (
	pages: Array<{page: number; text: string}>
): TextChunk[] => {
	const chunks: TextChunk[] = [];
	let index = 0;

	pages.forEach((page) => {
		const words = page.text.split(/\s+/).filter(Boolean);
		if (!words.length) return;

		let start = 0;
		while (start < words.length) {
			let current = "";
			let cursor = start;

			while (cursor < words.length) {
				const next = current ? `${current} ${words[cursor]}` : words[cursor];
				if (next.length > TARGET_CHARS && current) break;
				current = next;
				cursor += 1;
			}

			chunks.push({
				page: page.page,
				index,
				content: current.trim(),
			});
			index += 1;

			if (cursor >= words.length) break;

			const overlap = current.slice(Math.max(0, current.length - OVERLAP_CHARS));
			const overlapWords = overlap.split(/\s+/).filter(Boolean).length;
			start = Math.max(start + 1, cursor - overlapWords);
		}
	});

	return chunks;
};
