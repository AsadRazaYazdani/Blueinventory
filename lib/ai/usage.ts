import {getPlan} from "./plans";
import {getOrgStore, withOrgStore} from "./store";
import {PlanId} from "./types";

export const assertQuestionAllowed = (organizationId: string) => {
	const store = getOrgStore(organizationId);
	const plan = getPlan(store.usage.planId);
	if (
		typeof plan.questions === "number" &&
		store.usage.questionsThisMonth >= plan.questions
	) {
		throw new Error(`${plan.name} plan monthly question limit reached.`);
	}
};

export const recordQuestion = (organizationId: string) => {
	withOrgStore(organizationId, (store) => {
		store.usage.questionsThisMonth += 1;
	});
};

export const setOrganizationPlan = (organizationId: string, planId: PlanId) => {
	return withOrgStore(organizationId, (store) => {
		store.usage.planId = planId;
		return store.usage;
	});
};
