import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "storage", "uploads");

const ensureDir = (dir: string) => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, {recursive: true});
	}
};

export const storeOriginalFile = async (
	organizationId: string,
	fileName: string,
	buffer: Buffer
) => {
	const dir = path.join(ROOT, organizationId);
	ensureDir(dir);
	const storagePath = path.join(dir, fileName);
	fs.writeFileSync(storagePath, buffer);
	return storagePath;
};

export const readOriginalFile = (storagePath: string) => {
	return fs.readFileSync(storagePath);
};

export const deleteOriginalFile = (storagePath: string) => {
	if (fs.existsSync(storagePath)) {
		fs.unlinkSync(storagePath);
	}
};

export const getSignedFileUrl = (
	organizationId: string,
	fileName: string
) => `/api/ai/files/${encodeURIComponent(organizationId)}/${encodeURIComponent(fileName)}`;
