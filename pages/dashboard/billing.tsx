import {NextPage, GetStaticProps} from "next";
import Meta from "@/components/Backend/Dashboard/Meta/Meta";
import AiWorkspace from "@/components/Backend/Dashboard/components/AiWorkspace";
import DashboardMetaContextProvider from "@/components/Frontend/context/DashboardMetaContextProvider";

const billing: NextPage = () => {
	return (
		<DashboardMetaContextProvider pageTitle={"Plans"}>
			<div className="p-1 bg-white">
				<Meta />
				<AiWorkspace view="billing" />
			</div>
		</DashboardMetaContextProvider>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {props: {}};
};

export default billing;
