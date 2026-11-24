import type {NextApiRequest, NextApiResponse} from "next";
import {getOrganizationId} from "@/lib/ai/org";
import {ingestUploadedDocument} from "@/lib/ai/ingest";

const stripHtml = (html: string) =>
	html
		.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
		.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({error: "Method not allowed"});
	}

	const organizationId = getOrganizationId(req);
	const url = String(req.body?.url || "").trim();

	if (!/^https?:\/\//i.test(url)) {
		return res.status(400).json({error: "Enter a valid http or https URL"});
	}

	try {
		const response = await fetch(url, {headers: {Accept: "text/html,text/plain"}});
		if (!response.ok) {
			throw new Error("Could not crawl that page");
		}
		const html = await response.text();
		const text = stripHtml(html);
		if (text.length < 40) {
			throw new Error("The page did not contain enough readable text");
		}

		const host = new URL(url).hostname;
		const document = await ingestUploadedDocument({
			organizationId,
			originalName: `${host}.txt`,
			mimeType: "text/plain",
			buffer: Buffer.from(text, "utf8"),
		});

		return res.status(201).json({document});
	} catch (error: any) {
		return res.status(400).json({error: error?.message || "Crawl failed"});
	}
}
