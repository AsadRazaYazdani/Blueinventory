import type {GetStaticProps, NextPage} from "next";
import {IPageContext} from "@/types/context/public";
import {flexibleContentType} from "@/context/context";
import PageContextProvider from "@/components/Frontend/context/PageContextProvider";
import LayoutTwo from "@/components/Frontend/Layout/LayoutTwo";
import AiWorkspace from "@/components/Backend/Dashboard/components/AiWorkspace";

const supportPage: NextPage<IPageContext> = ({
	seo,
	content,
	postTypeFlexibleContent,
}) => {
	return (
		<PageContextProvider
			seo={seo}
			content={content}
			postTypeFlexibleContent={postTypeFlexibleContent}
		>
			<section
				className="min-h-screen bg-center bg-no-repeat bg-cover"
				style={{
					backgroundImage: `url("/svg/backgroundSVG/stacked-peaks-haikei-blue-darkBlue-two.svg")`,
				}}
			>
				<LayoutTwo pageTitle="Help Desk">
					<div className="container max-w-5xl px-4 py-16 mx-auto">
						<div className="mb-8 text-white">
							<h1 className="text-3xl font-semibold sm:text-5xl">Help Desk</h1>
							<p className="max-w-2xl mt-4 text-lg text-white/90">
								Questions about shipping, refunds, pricing, or your inventory
								workspace. We reply from BlueInventory company records.
							</p>
						</div>
						<AiWorkspace view="support" audience="public" />
					</div>
				</LayoutTwo>
			</section>
		</PageContextProvider>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			seo: null,
			content: null,
			postTypeFlexibleContent: flexibleContentType?.pages,
		},
		revalidate: 60,
	};
};

export default supportPage;
