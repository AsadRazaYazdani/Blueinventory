import {FC, FormEvent, useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import {fadeIn, fadeInUp, initial, initialTwo, stagger} from "@/animations/animations";

type KnowledgeDocument = {
	id: string;
	originalName: string;
	status: string;
	pageCount: number;
	chunkCount: number;
	size: number;
	createdAt: string;
};

type Citation = {
	fileName: string;
	page: number;
};

type ChatItem = {
	id: string;
	role: "user" | "assistant";
	content: string;
	citations?: Citation[];
	escalated?: boolean;
};

type Overview = {
	plan?: {name: string; price: string; documents?: number | "custom"; questions?: number | "custom"};
	usage?: {questionsThisMonth: number; planId: string};
	stats?: {
		documents: number;
		questions: number;
		questionsThisMonth: number;
		escalated: number;
		resolved: number;
		openTickets: number;
		conversations: number;
		readyDocuments: number;
	};
	documents?: KnowledgeDocument[];
	tickets?: Array<{id: string; question: string; status: string; createdAt: string}>;
	conversations?: Array<{id: string; title: string; updatedAt: string}>;
};

const cardClass =
	"w-full p-6 border-2 shadow-2xl bg-white border-darkBlue rounded-2xl";

const statusLabel = (status: string) => {
	if (status === "ready") return "Ready";
	if (status === "processing") return "Saving";
	if (status === "failed") return "Needs attention";
	return status;
};

const formatDate = (value?: string) => {
	if (!value) return "—";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "—";
	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
};

const AiWorkspace: FC<{
	view: "knowledge" | "support" | "analytics" | "billing";
	audience?: "staff" | "public";
}> = ({view, audience = "staff"}) => {
	const [overview, setOverview] = useState<Overview>({});
	const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
	const [messages, setMessages] = useState<ChatItem[]>([]);
	const [question, setQuestion] = useState("");
	const [url, setUrl] = useState("");
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [conversationId, setConversationId] = useState("");
	const [plans, setPlans] = useState<any[]>([]);
	const [origin, setOrigin] = useState("");
	const [copied, setCopied] = useState(false);

	const loadOverview = async () => {
		const response = await fetch("/api/ai/overview");
		const data = await response.json();
		setOverview(data);
		setDocuments(data.documents || []);
	};

	useEffect(() => {
		setOrigin(window.location.origin);
		loadOverview().catch(() => setError("The help desk could not be loaded."));
		if (view === "billing") {
			fetch("/api/ai/billing")
				.then((response) => response.json())
				.then((data) => setPlans(data.plans || []))
				.catch(() => undefined);
		}
	}, [view]);

	const uploadFile = async (file: File) => {
		setBusy(true);
		setError("");
		const body = new FormData();
		body.append("file", file);
		const response = await fetch("/api/ai/documents", {method: "POST", body});
		const data = await response.json();
		setBusy(false);
		if (!response.ok) {
			setError(data.error || "The document could not be saved.");
			return;
		}
		await loadOverview();
	};

	const removeDocument = async (id: string) => {
		await fetch(`/api/ai/documents?id=${id}`, {method: "DELETE"});
		await loadOverview();
	};

	const crawlSite = async (event: FormEvent) => {
		event.preventDefault();
		setBusy(true);
		setError("");
		const response = await fetch("/api/ai/crawl", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({url}),
		});
		const data = await response.json();
		setBusy(false);
		if (!response.ok) {
			setError(data.error || "That page could not be imported.");
			return;
		}
		setUrl("");
		await loadOverview();
	};

	const askQuestion = async (event: FormEvent) => {
		event.preventDefault();
		if (!question.trim()) return;
		const nextQuestion = question.trim();
		setQuestion("");
		setBusy(true);
		setError("");
		setMessages((current) => [
			...current,
			{
				id: `user-${Date.now()}`,
				role: "user",
				content: nextQuestion,
			},
		]);

		const response = await fetch("/api/ai/chat", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({question: nextQuestion, conversationId}),
		});
		const data = await response.json();
		setBusy(false);
		if (!response.ok) {
			setError(data.error || "We could not complete that request just now.");
			return;
		}
		setConversationId(data.conversationId);
		setMessages(data.messages || []);
		await loadOverview();
	};

	const choosePlan = async (planId: string) => {
		await fetch("/api/ai/billing", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({planId}),
		});
		await loadOverview();
	};

	const stats = overview.stats || {
		documents: 0,
		questions: 0,
		questionsThisMonth: 0,
		escalated: 0,
		resolved: 0,
		openTickets: 0,
		conversations: 0,
		readyDocuments: 0,
	};

	const embedSnippet = useMemo(
		() => `<script src="${origin}/widget.js" data-org="local-org"></script>`,
		[origin]
	);

	const copySnippet = async () => {
		try {
			await navigator.clipboard.writeText(embedSnippet);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	};

	return (
		<div className="p-4">
			<motion.div
				initial={initial}
				whileInView={stagger}
				viewport={{once: true}}
				className="grid gap-6"
			>
				{view === "analytics" ? (
					<section className={cardClass}>
						<motion.h3
							initial={initialTwo}
							whileInView={fadeIn}
							viewport={{once: true}}
							className="pb-2 text-lg font-semibold text-darkBlue"
						>
							Support overview
						</motion.h3>
						<p className="pb-6 text-black">
							A snapshot of document coverage, customer enquiries, and open tickets.
						</p>
						<div className="grid gap-4 md:grid-cols-3">
							{[
								["Documents", stats.documents],
								["Enquiries", stats.questions],
								["Open tickets", stats.openTickets],
								["This month", stats.questionsThisMonth],
								["Resolved", stats.resolved],
								["Handed to staff", stats.escalated],
							].map(([label, value]) => (
								<div
									key={String(label)}
									className="p-5 border-t-4 bg-lightGrey border-blue"
								>
									<p className="text-sm tracking-widest uppercase text-darkGrey">
										{label}
									</p>
									<h4 className="text-3xl font-semibold text-darkBlue">{value}</h4>
								</div>
							))}
						</div>
					</section>
				) : null}

				{view === "knowledge" || view === "analytics" ? (
					<section className={cardClass}>
						<div className="flex flex-col justify-between gap-4 pb-4 md:flex-row md:items-center">
							<div>
								<h3 className="text-lg font-semibold text-darkBlue">
									Document library
								</h3>
								<p className="mt-1 text-black">
									Handbooks, pricing sheets, and policies used to answer customer
									enquiries.
								</p>
							</div>
							<label className="px-5 py-2 font-semibold tracking-widest text-white uppercase cursor-pointer bg-darkBlue hover:bg-goldPrime">
								{busy ? "Saving..." : "Add document"}
								<input
									type="file"
									accept=".pdf,.docx,.doc,.txt,.md"
									className="hidden"
									onChange={(event) => {
										const file = event.target.files?.[0];
										if (file) uploadFile(file);
									}}
								/>
							</label>
						</div>
						<form onSubmit={crawlSite} className="flex flex-col gap-3 mb-6 md:flex-row">
							<input
								value={url}
								onChange={(event) => setUrl(event.target.value)}
								placeholder="https://yourcompany.com/policies"
								className="w-full px-4 py-3 border rounded-md border-lightGreyTwo text-darkBlue"
							/>
							<button
								type="submit"
								className="px-6 py-3 font-semibold tracking-widest text-white uppercase bg-blue hover:bg-goldPrime"
							>
								Import page
							</button>
						</form>
						{error ? <p className="mb-4 text-pinkRed">{error}</p> : null}
						<div className="space-y-4 lg:hidden">
							{documents.length ? (
								documents.map((document) => (
									<div
										key={document.id}
										className="flex flex-col gap-2 py-4 border-b border-lightGreyTwo"
									>
										<p className="font-semibold text-darkBlue">
											{document.originalName}
										</p>
										<p className="text-sm text-black">
											{document.pageCount} pages · {statusLabel(document.status)} ·{" "}
											{formatDate(document.createdAt)}
										</p>
										<button
											onClick={() => removeDocument(document.id)}
											className="self-start text-sm font-semibold uppercase text-pinkRed"
										>
											Remove
										</button>
									</div>
								))
							) : (
								<p className="py-4 text-darkGrey">
									No documents have been added yet. Upload a handbook or policy
									to begin.
								</p>
							)}
						</div>
						<div className="hidden w-full overflow-x-auto lg:block">
							<table className="w-full min-w-max">
								<thead>
									<tr className="text-left text-black">
										<th className="pb-4 pr-6 border-b border-black">
											<span className="font-semibold capitalize">Document</span>
										</th>
										<th className="pb-4 pr-6 border-b border-black">
											<span className="font-semibold capitalize">Pages</span>
										</th>
										<th className="pb-4 pr-6 border-b border-black">
											<span className="font-semibold capitalize">Status</span>
										</th>
										<th className="pb-4 pr-6 border-b border-black">
											<span className="font-semibold capitalize">Added</span>
										</th>
										<th className="pb-4 border-b border-black">
											<span className="font-semibold capitalize">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{documents.length ? (
										documents.map((document) => (
											<tr key={document.id} className="border-b border-lightGreyTwo">
												<td className="py-4 pr-6 font-semibold text-darkBlue">
													{document.originalName}
												</td>
												<td className="py-4 pr-6 text-black">{document.pageCount}</td>
												<td className="py-4 pr-6 text-black">
													{statusLabel(document.status)}
												</td>
												<td className="py-4 pr-6 text-black">
													{formatDate(document.createdAt)}
												</td>
												<td className="py-4">
													<button
														onClick={() => removeDocument(document.id)}
														className="text-sm font-semibold uppercase text-pinkRed"
													>
														Remove
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={5} className="py-8 text-darkGrey">
												No documents have been added yet. Upload a handbook or
												policy to begin.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</section>
				) : null}

				{view === "support" ? (
					<section className={cardClass}>
						{audience === "public" ? (
							<div className="pb-6">
								<h3 className="text-lg font-semibold text-darkBlue">
									How can we help?
								</h3>
								<p className="mt-2 text-black">
									Ask about your account, orders, shipping, or a company policy.
									A specialist will pick up anything we cannot answer from our
									records.
								</p>
								<p className="mt-2 text-sm text-darkGrey">
									Monday to Friday, 9:00–17:00 GMT
								</p>
							</div>
						) : (
							<div className="pb-6">
								<h3 className="text-lg font-semibold text-darkBlue">Help desk</h3>
								<p className="mt-2 text-black">
									Reply to customer questions using the documents in your library.
								</p>
							</div>
						)}
						<div className="overflow-hidden border-2 border-darkBlue rounded-2xl">
							<div
								className="px-6 py-4 text-white border-b border-goldPrime"
								style={{
									backgroundImage:
										"linear-gradient(0deg, rgba(9,39,94,0.92), rgba(9,39,94,0.92)), url('/svg/backgroundSVG/stacked-waves-haikei-blue-darkblue.svg')",
								}}
							>
								<p className="text-lg font-semibold text-white">BlueInventory</p>
								<p className="text-sm text-white/80">Customer support</p>
							</div>
							<div className="min-h-[320px] max-h-[480px] overflow-y-auto p-6 bg-white">
								{messages.length ? (
									messages.map((message) => (
										<div
											key={message.id}
											className={`mb-4 max-w-3xl ${
												message.role === "user" ? "ml-auto" : ""
											}`}
										>
											<p className="mb-1 text-xs tracking-widest uppercase text-darkGrey">
												{message.role === "user" ? "You" : "Support"}
											</p>
											<div
												className={
													message.role === "user"
														? "px-4 py-3 text-white bg-darkBlue rounded-xl"
														: "px-4 py-3 bg-lightGrey text-black rounded-xl"
												}
											>
												{message.content}
											</div>
											{message.citations?.length ? (
												<p className="mt-2 text-sm text-goldPrimeDarker">
													Source: {message.citations[0].fileName}
													{message.citations[0].page
														? `, page ${message.citations[0].page}`
														: ""}
												</p>
											) : null}
											{message.escalated ? (
												<p className="mt-2 text-sm text-pinkRed">
													A colleague will follow up with you.
												</p>
											) : null}
										</div>
									))
								) : (
									<div className="text-darkGrey">
										<p>Hello, this is BlueInventory support.</p>
										<p className="mt-2">
											Send a question and we will reply from your company
											records.
										</p>
									</div>
								)}
							</div>
							<form
								onSubmit={askQuestion}
								className="flex gap-3 p-4 bg-white border-t border-lightGreyTwo"
							>
								<input
									value={question}
									onChange={(event) => setQuestion(event.target.value)}
									placeholder="Write your question"
									className="w-full px-4 py-3 border rounded-md border-lightGreyTwo text-darkBlue"
								/>
								<button
									type="submit"
									disabled={busy}
									className="px-6 py-3 font-semibold tracking-widest text-white uppercase bg-blue hover:bg-goldPrime disabled:opacity-60"
								>
									{busy ? "Sending" : "Send"}
								</button>
							</form>
						</div>
						{error ? <p className="mt-4 text-pinkRed">{error}</p> : null}
						{audience === "staff" ? (
							<div className="p-5 mt-6 bg-lightGrey">
								<p className="mb-1 text-sm font-semibold uppercase text-darkBlue">
									Website widget
								</p>
								<p className="mb-3 text-sm text-black">
									Place this snippet before the closing body tag on your site.
								</p>
								<code className="block mb-3 text-sm break-all text-darkGrey">
									{embedSnippet}
								</code>
								<button
									type="button"
									onClick={copySnippet}
									className="px-5 py-2 text-sm font-semibold tracking-widest text-white uppercase bg-darkBlue hover:bg-goldPrime"
								>
									{copied ? "Copied" : "Copy snippet"}
								</button>
							</div>
						) : null}
					</section>
				) : null}

				{view === "billing" ? (
					<section className={cardClass}>
						<h3 className="text-lg font-semibold text-darkBlue">Plans</h3>
						<p className="pt-2 pb-6 text-black">
							Choose a monthly allowance for stored documents and customer
							enquiries. You can change plan at any time.
						</p>
						<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
							{(plans.length
								? plans
								: [
										{
											id: "free",
											name: "Complimentary",
											documents: 5,
											questions: 100,
											price: "£0",
										},
								  ]
							).map((plan) => (
								<motion.article
									key={plan.id}
									initial={initial}
									whileInView={fadeInUp}
									viewport={{once: true}}
									className="p-6 border-t-4 bg-lightGrey border-blue"
								>
									<p className="text-sm tracking-widest uppercase text-darkGrey">
										{plan.name}
									</p>
									<h4 className="my-3 text-3xl font-semibold text-darkBlue">
										{plan.price}
										{plan.price !== "Custom" ? (
											<span className="text-sm font-normal text-darkGrey">
												{" "}
												/ month
											</span>
										) : null}
									</h4>
									<p className="text-sm text-black">
										{plan.documents === "custom"
											? "Document library sized to your team"
											: `${Number(plan.documents).toLocaleString("en-GB")} documents in the library`}
									</p>
									<p className="mt-2 text-sm text-black">
										{plan.questions === "custom"
											? "Enquiry volume agreed with accounts"
											: `${Number(plan.questions).toLocaleString("en-GB")} enquiries each month`}
									</p>
									<button
										onClick={() => choosePlan(plan.id)}
										className="w-full px-4 py-3 mt-5 font-semibold tracking-widest text-white uppercase bg-darkBlue hover:bg-goldPrime"
									>
										{overview.usage?.planId === plan.id
											? "Current plan"
											: "Choose plan"}
									</button>
								</motion.article>
							))}
						</div>
					</section>
				) : null}

				{view === "analytics" && overview.tickets?.length ? (
					<section className={cardClass}>
						<h3 className="pb-4 text-lg font-semibold text-darkBlue">
							Handed to staff
						</h3>
						<div className="w-full overflow-x-auto">
							<table className="w-full min-w-max">
								<thead>
									<tr className="text-left text-black">
										<th className="pb-4 border-b border-black">
											<span className="font-semibold capitalize">Enquiry</span>
										</th>
										<th className="pb-4 border-b border-black">
											<span className="font-semibold capitalize">Status</span>
										</th>
										<th className="pb-4 border-b border-black">
											<span className="font-semibold capitalize">Opened</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{overview.tickets.map((ticket) => (
										<tr key={ticket.id} className="border-b border-lightGreyTwo">
											<td className="py-4 font-semibold text-darkBlue">
												{ticket.question}
											</td>
											<td className="py-4 text-black uppercase">{ticket.status}</td>
											<td className="py-4 text-black">
												{formatDate(ticket.createdAt)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</section>
				) : null}
			</motion.div>
		</div>
	);
};

export default AiWorkspace;
