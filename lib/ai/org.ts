import type {NextApiRequest} from "next";

const FALLBACK_ORG = "local-org";

export const getOrganizationId = (req?: NextApiRequest | Request) => {
	if (!req) return FALLBACK_ORG;

	if ("headers" in req && typeof (req as NextApiRequest).headers?.get !== "function") {
		const pagesReq = req as NextApiRequest;
		return (
			asHeader(pagesReq.headers["x-organization-id"]) ||
			asHeader(pagesReq.headers["x-org-id"]) ||
			asHeader(pagesReq.cookies?.organizationId) ||
			FALLBACK_ORG
		);
	}

	const headers = (req as Request).headers;
	return (
		headers.get("x-organization-id") ||
		headers.get("x-org-id") ||
		FALLBACK_ORG
	);
};

const asHeader = (value?: string | string[]) => {
	if (Array.isArray(value)) return value[0];
	return value || "";
};
