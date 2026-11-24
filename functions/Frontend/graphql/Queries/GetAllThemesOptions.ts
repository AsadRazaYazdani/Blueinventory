import {client} from "@/config/apollo";
import {DocumentNode, gql} from "@apollo/client";
import {IThemesOptionsContent} from "@/types/context/public";

export const defaultThemesOptionsContent: IThemesOptionsContent = {
	email: "info@blueinventory.com",
	address: "",
	emailTwo: "support@blueinventory.com",
	phoneNumber: "",
	phoneNumberTwo: "",
	twitterLink: "https://twitter.com/blueinventory",
	facebookLink: "https://www.facebook.com/blueinventory",
	linkedinLink: "https://www.linkedin.com/company/blueinventory",
	copyrightText: "© BlueInventory. All rights reserved.",
};

const isUsableValue = (value: unknown) => {
	if (typeof value !== "string") return Boolean(value);
	const trimmed = value.trim();
	return trimmed !== "" && trimmed !== "/";
};

export const withThemeDefaults = (
	content?: Partial<IThemesOptionsContent> | null
): IThemesOptionsContent => {
	const overrides = Object.fromEntries(
		Object.entries(content || {}).filter(([, value]) => isUsableValue(value))
	);

	return {
		...defaultThemesOptionsContent,
		...overrides,
	};
};

// Themes Options Content
export async function getThemesOptionsContent() {
	try {
		const content: DocumentNode = gql`
			{
				themeOptions(where: {id: 539, status: PUBLISH}) {
					edges {
						node {
							themeOptions {
								address
								email
								emailTwo
								phoneNumber
								phoneNumberTwo
								copyrightText
								facebookLink
								linkedinLink
								twitterLink
								businessHours {
									content
								}
							}
						}
					}
				}
			}
		`;

		const response: any = await client.query({
			query: content,
		});

		return withThemeDefaults(
			response?.data?.themeOptions?.edges[0]?.node?.themeOptions
		);
	} catch (error) {
		console.log(error);
		return defaultThemesOptionsContent;
	}
}
