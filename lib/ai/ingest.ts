import path from "path";
import {v4 as uuid} from "uuid";
import {splitPagesIntoChunks} from "./chunk";
import {embedText} from "./embeddings";
import {extractDocumentText} from "./extract";
import {deleteOriginalFile, storeOriginalFile} from "./files";
import {getPlan} from "./plans";
import {getOrgStore, withOrgStore} from "./store";
import {KnowledgeChunk, KnowledgeDocument} from "./types";

const ALLOWED_TYPES = [
	"application/pdf",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/msword",
	"text/plain",
	"text/markdown",
];

const ALLOWED_EXTENSIONS = ["pdf", "docx", "doc", "txt", "md"];
const MAX_BYTES = 12 * 1024 * 1024;

export const ingestUploadedDocument = async (input: {
	organizationId: string;
	originalName: string;
	mimeType: string;
	buffer: Buffer;
}) => {
	const extension = input.originalName.split(".").pop()?.toLowerCase() || "";
	if (
		!ALLOWED_EXTENSIONS.includes(extension) &&
		!ALLOWED_TYPES.some((type) => input.mimeType.includes(type.split("/")[1]))
	) {
		throw new Error("Unsupported file type. Upload PDF, DOCX, or TXT.");
	}

	if (input.buffer.length > MAX_BYTES) {
		throw new Error("File is too large. Maximum size is 12MB.");
	}

	const store = getOrgStore(input.organizationId);
	const plan = getPlan(store.usage.planId);
	if (typeof plan.documents === "number" && store.documents.length >= plan.documents) {
		throw new Error(`${plan.name} plan document limit reached.`);
	}

	const documentId = uuid();
	const safeName = `${documentId}${path.extname(input.originalName)}`;
	const storagePath = await storeOriginalFile(
		input.organizationId,
		safeName,
		input.buffer
	);

	const document: KnowledgeDocument = {
		id: documentId,
		organizationId: input.organizationId,
		fileName: safeName,
		originalName: input.originalName,
		mimeType: input.mimeType || `application/${extension}`,
		size: input.buffer.length,
		storagePath,
		status: "processing",
		pageCount: 0,
		chunkCount: 0,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	withOrgStore(input.organizationId, (orgStore) => {
		orgStore.documents.unshift(document);
	});

	try {
		const pages = await extractDocumentText(
			input.buffer,
			input.mimeType,
			input.originalName
		);
		const textChunks = splitPagesIntoChunks(pages);
		const chunks: KnowledgeChunk[] = [];

		for (const chunk of textChunks) {
			chunks.push({
				id: uuid(),
				organizationId: input.organizationId,
				documentId,
				fileName: input.originalName,
				page: chunk.page,
				index: chunk.index,
				content: chunk.content,
				embedding: await embedText(chunk.content),
			});
		}

		withOrgStore(input.organizationId, (orgStore) => {
			const current = orgStore.documents.find((item) => item.id === documentId);
			if (current) {
				current.status = "ready";
				current.pageCount = pages.length;
				current.chunkCount = chunks.length;
				current.updatedAt = new Date().toISOString();
			}
			orgStore.chunks.push(...chunks);
		});

		return getOrgStore(input.organizationId).documents.find(
			(item) => item.id === documentId
		);
	} catch (error) {
		withOrgStore(input.organizationId, (orgStore) => {
			const current = orgStore.documents.find((item) => item.id === documentId);
			if (current) {
				current.status = "failed";
				current.updatedAt = new Date().toISOString();
			}
		});
		throw error;
	}
};

export const removeDocument = (organizationId: string, documentId: string) => {
	return withOrgStore(organizationId, (store) => {
		const document = store.documents.find((item) => item.id === documentId);
		if (!document) return false;
		deleteOriginalFile(document.storagePath);
		store.documents = store.documents.filter((item) => item.id !== documentId);
		store.chunks = store.chunks.filter((item) => item.documentId !== documentId);
		return true;
	});
};
