// Imports
import type {NextPage, GetStaticProps} from "next";
import {IPageContext} from "@/types/context/public";
import {homePage, postType, flexibleContentType} from "@/context/context";

// Queries Functions
import {getAllSeoContent} from "@/functions/Frontend/graphql/Queries/GetAllSeoPagesContent";
import {getAllFlexibleContentComponents} from "@/functions/Frontend/graphql/Queries/GetAllFlexibleContentComponents";

// Components
import Layout from "@/components/Frontend/Layout/Layout";
import RenderFlexibleContent from "@/components/Frontend/FlexibleContent/RenderFlexibleContent";
import PageContextProvider from "@/components/Frontend/context/PageContextProvider";

const HomePage: NextPage<IPageContext> = ({
	seo,
	content,
	postTypeFlexibleContent,
}) => {
	return (
		<>
			<PageContextProvider
				seo={seo}
				content={content}
				postTypeFlexibleContent={postTypeFlexibleContent}
			>
				<Layout>
					<RenderFlexibleContent />
				</Layout>
			</PageContextProvider>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	let seoContent: any = null;
	let flexibleContentComponents: any = {content: []};

	try {
		seoContent = await getAllSeoContent(homePage, postType?.pages);
	} catch (error) {
		console.log(error);
	}

	try {
		flexibleContentComponents = await getAllFlexibleContentComponents(
			homePage,
			postType?.pages,
			flexibleContentType?.pages
		);
	} catch (error) {
		console.log(error);
	}

	return {
		props: {
			seo: seoContent,
			content: flexibleContentComponents?.content ?? [],
			postTypeFlexibleContent: flexibleContentType?.pages,
		},
		revalidate: 60,
	};
};

export default HomePage;
