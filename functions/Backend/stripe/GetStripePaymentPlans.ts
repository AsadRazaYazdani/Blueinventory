// Imports
import {
	IStripeBasicPlan,
	IStripePremiumPlan,
	IStripePaymentPlans,
	IStripeStandardPlan,
} from "@/types/stripe";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Initialize Stripe only when a key is present
const stripe = stripeSecretKey
	? new Stripe(stripeSecretKey, {
			apiVersion: "2022-11-15",
	  })
	: null;

// Fetches All Stripe Payment Plans
export const getAllStripePaymentPlans = async (): Promise<
	IStripePaymentPlans | any
> => {
	try {
		if (!stripe) {
			throw new Error("Missing STRIPE_SECRET_KEY");
		}

		const {data: stripePrices} = await stripe.prices.list({
			active: true,
			limit: 3,
			expand: ["data.product"],
		});

		// Stripe Basic Plan
		const stripeBasicPlan: IStripeBasicPlan | any = {
			name: getProductProperty(stripePrices[0]?.product, "name") || "Basic",
			description:
				getProductProperty(stripePrices[0]?.product, "description") ||
				"Basic Inventory Management Software subscription",
			price: stripePrices[0]?.unit_amount
				? stripePrices[0]?.unit_amount / 100
				: 999 / 100,
			paymentRecurringInterval: stripePrices[0]?.recurring?.interval,
		};

		// Stripe Standard Plan
		const stripeStandardPlan: IStripeStandardPlan | any = {
			name: getProductProperty(stripePrices[2]?.product, "name") || "Standard",
			description:
				getProductProperty(stripePrices[2]?.product, "description") ||
				"Standard Inventory Management Software subscription",
			price: stripePrices[2]?.unit_amount
				? stripePrices[2]?.unit_amount / 100
				: 2999 / 100,
			paymentRecurringInterval: stripePrices[2]?.recurring?.interval,
		};

		// Stripe Premium Plan
		const stripePremiumPlan: IStripePremiumPlan | any = {
			name: getProductProperty(stripePrices[1]?.product, "name") || "Premium",
			description:
				getProductProperty(stripePrices[1]?.product, "description") ||
				"Premium Inventory Management Software subscription",
			price: stripePrices[1]?.unit_amount
				? stripePrices[1]?.unit_amount / 100
				: 7999 / 100,
			paymentRecurringInterval: stripePrices[1]?.recurring?.interval,
		};

		return {
			stripePrices,
			stripeBasicPlan,
			stripeStandardPlan,
			stripePremiumPlan,
		};
	} catch (error) {
		console.log(error);
		throw new Error(
			"Something went wrong trying to fetch the stripe payment plans"
		);
	}
};

const getProductProperty = (
	product: string | any | undefined,
	property: keyof any
) => {
	if (typeof product === "object" && product !== null) {
		return product[property];
	}
	return undefined;
};
