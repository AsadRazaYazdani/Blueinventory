import fs from "fs";
import path from "path";
import {
	ChatConversation,
	KnowledgeChunk,
	KnowledgeDocument,
	OrgUsage,
	SupportTicket,
} from "./types";
import {currentMonthKey} from "./plans";

const ROOT = path.join(process.cwd(), "data", "ai-store");

const fileFor = (organizationId: string) =>
	path.join(ROOT, `${organizationId}.json`);

type OrgStore = {
	organizationId: string;
	documents: KnowledgeDocument[];
	chunks: KnowledgeChunk[];
	conversations: ChatConversation[];
	tickets: SupportTicket[];
	usage: OrgUsage;
};

const emptyStore = (organizationId: string): OrgStore => ({
	organizationId,
	documents: [],
	chunks: [],
	conversations: [],
	tickets: [],
	usage: {
		organizationId,
		planId: "free",
		documents: 0,
		questionsThisMonth: 0,
		monthKey: currentMonthKey(),
	},
});

const ensureRoot = () => {
	if (!fs.existsSync(ROOT)) {
		fs.mkdirSync(ROOT, {recursive: true});
	}
};

const readStore = (organizationId: string): OrgStore => {
	ensureRoot();
	const file = fileFor(organizationId);
	if (!fs.existsSync(file)) {
		return emptyStore(organizationId);
	}

	const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as OrgStore;
	if (parsed.usage.monthKey !== currentMonthKey()) {
		parsed.usage.monthKey = currentMonthKey();
		parsed.usage.questionsThisMonth = 0;
	}
	return parsed;
};

const writeStore = (store: OrgStore) => {
	ensureRoot();
	fs.writeFileSync(fileFor(store.organizationId), JSON.stringify(store, null, 2));
};

export const withOrgStore = <T>(
	organizationId: string,
	mutate: (store: OrgStore) => T
) => {
	const store = readStore(organizationId);
	const result = mutate(store);
	store.usage.documents = store.documents.length;
	writeStore(store);
	return result;
};

export const getOrgStore = (organizationId: string) => readStore(organizationId);
