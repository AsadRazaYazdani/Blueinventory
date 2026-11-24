import {FC, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {initial, stagger} from "@/animations/animations";
import {useDashboardGlobalContext} from "@/context/dashboard";

const MediaFilesGridCards: FC<{refreshKey?: number}> = ({refreshKey = 0}) => {
	const DashboardContext = useDashboardGlobalContext();
	const [files, setFiles] = useState<any[] | null>(
		DashboardContext?.mediaFilesCollection
	);

	useEffect(() => {
		fetch("/api/media")
			.then((response) => response.json())
			.then((data) => setFiles(data.files || []))
			.catch(() => setFiles(DashboardContext?.mediaFilesCollection || []));
	}, [refreshKey]);

	return (
		<>
			<motion.div
				initial={initial}
				whileInView={stagger}
				viewport={{once: true}}
				className="flex flex-wrap gap-4 -m-3"
			>
				{files == null ? (
					<div className="flex flex-col items-center justify-center">
						<h3>Loading media…</h3>
					</div>
				) : files.length ? (
					files.map((item: any) => (
						<div key={item.id || item.url} className="w-1/4 sm:w-1/2 md:w-1/3 lg:w-1/6">
							<Link href={item.url || "#"} target="_blank">
								<Image
									width={1000}
									height={1000}
									src={item.url}
									alt={item.name || "Media file"}
									className="w-full mb-0 lg:mb-4 object-cover object-center h-[75px] sm:h-[150px]"
								/>
								<div className="flex-wrap items-center justify-between hidden px-2 -m-2 lg:flex">
									<div className="w-auto p-2">
										<h3 className="text-sm font-semibold">{item.name}</h3>
									</div>
									<div className="w-auto p-2">
										<span className="text-xs font-semibold text-darkGrey">
											{item.size}
										</span>
									</div>
								</div>
							</Link>
						</div>
					))
				) : (
					<div className="flex flex-col items-center justify-center m-auto">
						<h3>No media has been added yet.</h3>
					</div>
				)}
			</motion.div>
		</>
	);
};

export default MediaFilesGridCards;
