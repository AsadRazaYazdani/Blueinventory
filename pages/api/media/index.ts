import type {NextApiRequest, NextApiResponse} from "next";
import formidable from "formidable";
import fs from "fs";
import {addMediaFile, getMediaFiles} from "@/lib/media/store";

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
	const value = files.file || files.media;
	if (!value) return null;
	return Array.isArray(value) ? value[0] : value;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		return res.status(200).json({files: getMediaFiles()});
	}

	if (req.method !== "POST") {
		res.setHeader("Allow", "GET, POST");
		return res.status(405).json({error: "Method not allowed"});
	}

	try {
		const {files} = await parseForm(req);
		const uploaded = firstFile(files);
		if (!uploaded?.filepath) {
			return res.status(400).json({error: "Choose an image to upload."});
		}

		const created = addMediaFile({
			originalName: uploaded.originalFilename || "Untitled",
			buffer: fs.readFileSync(uploaded.filepath),
		});

		return res.status(201).json({file: created, files: getMediaFiles()});
	} catch {
		return res.status(400).json({error: "That file could not be saved."});
	}
}
