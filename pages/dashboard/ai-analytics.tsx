import {NextPage, GetStaticProps} from "next";
import Meta from "@/components/Backend/Dashboard/Meta/Meta";
import AiWorkspace from "@/components/Backend/Dashboard/components/AiWorkspace";
import DashboardMetaContextProvider from "@/components/Frontend/context/DashboardMetaContextProvider";

const aiAnalytics: NextPage = () => {
	return (
		<DashboardMetaContextProvider pageTitle={"Reports"}>
			<div className="p-1 bg-white">
				<Meta />
				<AiWorkspace view="analytics" />
			</div>
		</DashboardMetaContextProvider>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {props: {}};
};

export default aiAnalytics;
