import fs from "fs";
import path from "path";
import {v4 as uuid} from "uuid";

const INDEX = path.join(process.cwd(), "data", "media", "files.json");
const UPLOADS = path.join(process.cwd(), "public", "uploads", "media");

export type MediaFile = {
	id: string;
	name: string;
	url: string;
	size: string;
	createdAt: string;
};

const SAMPLE: MediaFile[] = [
	{
		id: "media-logo",
		name: "BlueInventory logo",
		url: "/img/Logos/BlueInventory Logo Two Blue.png",
		size: "6 KB",
		createdAt: "2026-09-01T09:00:00.000Z",
	},
	{
		id: "media-avatar",
		name: "Default profile",
		url: "/img/Logos/default-avatar-profile.jpg",
		size: "7 KB",
		createdAt: "2026-09-04T11:30:00.000Z",
	},
	{
		id: "media-warehouse",
		name: "Warehouse floor",
		url: "/img/_MG_3455.jpg",
		size: "Photo",
		createdAt: "2026-09-08T14:15:00.000Z",
	},
];

const formatSize = (bytes: number) => {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const ensureStore = () => {
	fs.mkdirSync(path.dirname(INDEX), {recursive: true});
	fs.mkdirSync(UPLOADS, {recursive: true});
	if (!fs.existsSync(INDEX)) {
		fs.writeFileSync(INDEX, JSON.stringify(SAMPLE, null, 2));
	}
};

export const getMediaFiles = (): MediaFile[] => {
	ensureStore();
	try {
		return JSON.parse(fs.readFileSync(INDEX, "utf8"));
	} catch {
		return SAMPLE;
	}
};

export const addMediaFile = (file: {
	originalName: string;
	buffer: Buffer;
}): MediaFile => {
	ensureStore();
	const id = uuid();
	const extension = path.extname(file.originalName || "").toLowerCase() || ".jpg";
	const fileName = `${id}${extension}`;
	fs.writeFileSync(path.join(UPLOADS, fileName), file.buffer);

	const created: MediaFile = {
		id,
		name: path.basename(file.originalName || "Untitled", extension) || "Untitled",
		url: `/uploads/media/${fileName}`,
		size: formatSize(file.buffer.length),
		createdAt: new Date().toISOString(),
	};

	const files = getMediaFiles();
	files.unshift(created);
	fs.writeFileSync(INDEX, JSON.stringify(files, null, 2));
	return created;
};
