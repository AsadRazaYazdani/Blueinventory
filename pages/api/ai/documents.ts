import type {NextApiRequest, NextApiResponse} from "next";
import formidable from "formidable";
import fs from "fs";
import {getOrganizationId} from "@/lib/ai/org";
import {ingestUploadedDocument, removeDocument} from "@/lib/ai/ingest";
import {getOrgStore} from "@/lib/ai/store";

export const config = {
	api: {
		bodyParser: false,
	},
};

const parseForm = (req: NextApiRequest) =>
	new Promise<{fields: formidable.Fields; files: formidable.Files}>(
		(resolve, reject) => {
			const form = formidable({
				multiples: false,
				maxFileSize: 12 * 1024 * 1024,
			});
			form.parse(req, (error, fields, files) => {
				if (error) reject(error);
				else resolve({fields, files});
			});
		}
	);

const firstFile = (files: formidable.Files) => {
	const value = files.file || files.document;
	if (!value) return null;
	return Array.isArray(value) ? value[0] : value;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const organizationId = getOrganizationId(req);

	try {
		if (req.method === "GET") {
			const store = getOrgStore(organizationId);
			return res.status(200).json({
				organizationId,
				documents: store.documents,
			});
		}

		if (req.method === "DELETE") {
			const documentId = String(req.query.id || "");
			if (!documentId) {
				return res.status(400).json({error: "Missing document id"});
			}
			const removed = removeDocument(organizationId, documentId);
			return res.status(removed ? 200 : 404).json({removed});
		}

		if (req.method === "POST") {
			const {files} = await parseForm(req);
			const uploaded = firstFile(files);
			if (!uploaded) {
				return res.status(400).json({error: "No file uploaded"});
			}

			const buffer = fs.readFileSync(uploaded.filepath);
			const document = await ingestUploadedDocument({
				organizationId,
				originalName: uploaded.originalFilename || "document.pdf",
				mimeType: uploaded.mimetype || "application/octet-stream",
				buffer,
			});

			return res.status(201).json({document});
		}

		res.setHeader("Allow", "GET,POST,DELETE");
		return res.status(405).json({error: "Method not allowed"});
	} catch (error: any) {
		return res.status(400).json({error: error?.message || "Document request failed"});
	}
}
