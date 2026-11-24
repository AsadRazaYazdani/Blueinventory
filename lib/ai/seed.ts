import {ingestUploadedDocument} from "./ingest";
import {getOrgStore} from "./store";

const SAMPLE = `BlueInventory Operations Guide

Refund Policy
A refund can be requested within 14 days of purchase if the subscription has not moved beyond the trial period. Approved refunds are processed within 5 business days to the original payment method.

Shipping Policy
Standard deliveries arrive in 3 to 5 business days. Express deliveries arrive in 1 to 2 business days. Tracking details are sent once an order leaves the warehouse.

Pricing
The complimentary plan includes 5 documents and 100 support enquiries each month. Starter is £29 per month. Business is £99 per month. Enterprise pricing is arranged with our accounts team.

Frequently asked questions
How long does shipping take?
Standard shipping usually takes 3 to 5 business days.

What is your refund policy?
Refunds are available within 14 days of purchase while the account remains inside the trial period.
`;

export const seedSampleKnowledge = async (organizationId: string) => {
	const store = getOrgStore(organizationId);
	if (store.documents.length) return store;
	await ingestUploadedDocument({
		organizationId,
		originalName: "Operations Guide",
		mimeType: "text/plain",
		buffer: Buffer.from(SAMPLE, "utf8"),
	});
	return getOrgStore(organizationId);
};
