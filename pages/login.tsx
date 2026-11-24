// Imports
import {NextPage, GetServerSideProps} from "next";
import {IPageContext} from "@/types/context/public";
import Layout from "@/components/Frontend/Layout/Layout";
import {homePage, postType, flexibleContentType} from "@/context/context";
import PageContextProvider from "@/components/Frontend/context/PageContextProvider";

// Queries Functions
import {getAllSeoContent} from "@/functions/Frontend/graphql/Queries/GetAllSeoPagesContent";
import {getAllFlexibleContentComponents} from "@/functions/Frontend/graphql/Queries/GetAllFlexibleContentComponents";

// Components
import Login from "@/components/Frontend/Login";

const login: NextPage<IPageContext> = ({
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
					className="bg-center bg-no-repeat bg-cover "
					style={{
						backgroundImage: `url("/svg/backgroundSVG/stacked-waves-haikei-orange-yellow-pinkRed.svg")`,
					}}
				>
					<Layout>
						<Login />
					</Layout>
				</div>
			</PageContextProvider>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
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
	};
};

export default login;
