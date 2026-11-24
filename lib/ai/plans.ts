import {PlanId, PlanLimits} from "./types";

export const AI_PLANS: PlanLimits[] = [
	{id: "free", name: "Complimentary", documents: 5, questions: 100, price: "£0"},
	{id: "starter", name: "Starter", documents: 50, questions: 2000, price: "£29"},
	{
		id: "business",
		name: "Business",
		documents: 500,
		questions: 20000,
		price: "£99",
	},
	{
		id: "enterprise",
		name: "Enterprise",
		documents: "custom",
		questions: "custom",
		price: "Custom",
	},
];

export const getPlan = (planId: PlanId = "free") =>
	AI_PLANS.find((plan) => plan.id === planId) || AI_PLANS[0];

export const currentMonthKey = () => {
	const now = new Date();
	return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(
		2,
		"0"
	)}`;
};
