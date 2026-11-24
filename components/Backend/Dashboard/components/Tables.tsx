// Imports
import {FC} from "react";
import {motion} from "framer-motion";
import {useDashboardGlobalContext} from "@/context/dashboard";
import {fadeIn, initialTwo} from "@/animations/animations";
import styles from "@/styles/pages/Dashboard.module.scss";

// Components;
import TableCard from "./Cards/TableCard";

const Tables: FC = () => {
	const DashboardContext = useDashboardGlobalContext();

	return (
		<>
			<section
				className={
					styles.tables +
					` block w-full h-full p-6 border-darkBlue border-2 overflow-hidden shadow-2xl bg-white rounded-2xl`
				}
			>
				<motion.h3
					initial={initialTwo}
					viewport={{once: true}}
					whileInView={fadeIn}
					className="pb-8 text-lg font-semibold text-darkBlue"
				>
					Created Items
				</motion.h3>
				<div className="w-full mb-5 overflow-x-auto">
					<table className="w-full min-w-max">
						<thead>
							<tr className="text-left text-black">
								<th className="pb-5 border-b border-black">
									<span className="mx-1.5  font-semibold capitalize">Name</span>
								</th>
								<th className="pb-5 border-b border-black">
									<span className="mx-1.5  font-semibold capitalize">
										Description
									</span>
								</th>
								<th className="pb-5 border-b border-black">
									<span className="mx-1.5  font-semibold capitalize">
										Quantity
									</span>
								</th>
								<th className="pb-5 border-b border-black">
									<span className="mx-1.5  font-semibold capitalize">
										Value
									</span>
								</th>
								<th className="pb-5 border-b border-black">
									<span className="mx-1.5  font-semibold capitalize">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{DashboardContext?.itemsCollection == null ? (
								<tr>
									<td colSpan={5} className="py-8 text-darkGrey">
										Loading inventory…
									</td>
								</tr>
							) : DashboardContext.itemsCollection.length ? (
								<TableCard />
							) : (
								<tr>
									<td colSpan={5} className="py-8 text-darkGrey">
										No items have been added yet. Use the plus button to create
										one.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
};

export default Tables;
