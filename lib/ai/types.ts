export type OrgRole = "owner" | "admin" | "agent" | "viewer";

export type PlanId = "free" | "starter" | "business" | "enterprise";

export type DocumentStatus = "processing" | "ready" | "failed";

export interface KnowledgeDocument {
	id: string;
	organizationId: string;
	fileName: string;
	originalName: string;
	mimeType: string;
	size: number;
	storagePath: string;
	status: DocumentStatus;
	pageCount: number;
	chunkCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface KnowledgeChunk {
	id: string;
	organizationId: string;
	documentId: string;
	fileName: string;
	page: number;
	index: number;
	content: string;
	embedding: number[];
}

export interface ChatCitation {
	documentId: string;
	fileName: string;
	page: number;
	score: number;
}

export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	citations?: ChatCitation[];
	createdAt: string;
	escalated?: boolean;
}

export interface ChatConversation {
	id: string;
	organizationId: string;
	title: string;
	messages: ChatMessage[];
	createdAt: string;
	updatedAt: string;
}

export interface SupportTicket {
	id: string;
	organizationId: string;
	question: string;
	status: "open" | "resolved";
	createdAt: string;
}

export interface OrgUsage {
	organizationId: string;
	planId: PlanId;
	documents: number;
	questionsThisMonth: number;
	monthKey: string;
}

export interface PlanLimits {
	id: PlanId;
	name: string;
	documents: number | "custom";
	questions: number | "custom";
	price: string;
}
