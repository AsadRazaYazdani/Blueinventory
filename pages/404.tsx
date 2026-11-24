// Imports
import type {NextPage, GetStaticProps} from "next";
import {IPageContext} from "@/types/context/public";
import {postType, errorPage, flexibleContentType} from "@/context/context";
import PageContextProvider from "@/components/Frontend/context/PageContextProvider";

// Queries Functions
import {getAllSeoContent} from "@/functions/Frontend/graphql/Queries/GetAllSeoPagesContent";
import {getAllFlexibleContentComponents} from "@/functions/Frontend/graphql/Queries/GetAllFlexibleContentComponents";

// Components
import Layout from "@/components/Frontend/Layout/Layout";
import RenderFlexibleContent from "@/components/Frontend/FlexibleContent/RenderFlexibleContent";

const noPageExits: NextPage<IPageContext> = ({
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
				<div
					className="min-h-screen bg-white bg-center bg-no-repeat bg-cover"
					style={{
						backgroundImage: `url("/svg/backgroundSVG/stacked-waves-haikei-blue-pink-red-yellow.svg")`,
					}}
				>
					<Layout>
						<RenderFlexibleContent />
					</Layout>
				</div>
			</PageContextProvider>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	let seoContent: any = null;
	let flexibleContentComponents: any = {content: []};

	try {
		seoContent = await getAllSeoContent(errorPage, postType?.pages);
	} catch (error) {
		console.log(error);
	}

	try {
		flexibleContentComponents = await getAllFlexibleContentComponents(
			errorPage,
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

export default noPageExits;
