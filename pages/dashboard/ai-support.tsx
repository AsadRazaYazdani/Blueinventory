import {NextPage, GetStaticProps} from "next";
import Meta from "@/components/Backend/Dashboard/Meta/Meta";
import AiWorkspace from "@/components/Backend/Dashboard/components/AiWorkspace";
import DashboardMetaContextProvider from "@/components/Frontend/context/DashboardMetaContextProvider";

const aiSupport: NextPage = () => {
	return (
		<DashboardMetaContextProvider pageTitle={"Help Desk"}>
			<div className="p-1 bg-white">
				<Meta />
				<AiWorkspace view="support" />
			</div>
		</DashboardMetaContextProvider>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {props: {}};
};

export default aiSupport;
