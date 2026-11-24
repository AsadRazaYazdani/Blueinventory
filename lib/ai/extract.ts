import mammoth from "mammoth";

type ExtractedPage = {
	page: number;
	text: string;
};

const cleanText = (value: string) =>
	value
		.replace(/\u0000/g, "")
		.replace(/[ \t]+\n/g, "\n")
		.replace(/\n{3,}/g, "\n\n")
		.replace(/[^\S\n]{2,}/g, " ")
		.trim();

export const extractDocumentText = async (
	buffer: Buffer,
	mimeType: string,
	fileName: string
): Promise<ExtractedPage[]> => {
	const extension = fileName.split(".").pop()?.toLowerCase() || "";

	if (extension === "pdf" || mimeType.includes("pdf")) {
		const pdfParse = (await import("pdf-parse")).default as any;
		const parsed = await pdfParse(buffer);
		const pages = String(parsed.text || "")
			.split(/\f/g)
			.map((text: string, index: number) => ({
				page: index + 1,
				text: cleanText(text),
			}))
			.filter((item: ExtractedPage) => item.text.length > 0);

		if (pages.length) return pages;
		return [{page: 1, text: cleanText(parsed.text || "")}].filter(
			(item) => item.text.length > 0
		);
	}

	if (
		extension === "docx" ||
		mimeType.includes("wordprocessingml") ||
		mimeType.includes("msword")
	) {
		const result = await mammoth.extractRawText({buffer});
		return splitPlainTextPages(cleanText(result.value || ""));
	}

	const text = cleanText(buffer.toString("utf8"));
	return splitPlainTextPages(text);
};

const splitPlainTextPages = (text: string): ExtractedPage[] => {
	if (!text) return [];
	const blocks = text.split(/\n{2,}/).filter(Boolean);
	if (!blocks.length) return [{page: 1, text}];

	const pages: ExtractedPage[] = [];
	let current = "";
	let page = 1;

	blocks.forEach((block) => {
		if ((current + "\n\n" + block).length > 1800 && current) {
			pages.push({page, text: current.trim()});
			page += 1;
			current = block;
			return;
		}
		current = current ? `${current}\n\n${block}` : block;
	});

	if (current.trim()) {
		pages.push({page, text: current.trim()});
	}

	return pages;
};
