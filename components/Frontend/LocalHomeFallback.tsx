import {FC} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {fadeInUp, initial, stagger} from "@/animations/animations";

import Hero from "@/components/Frontend/Hero";
import Paragraph from "@/components/Frontend/Elements/Paragraph";

const features = [
	{
		title: "User Friendly Design",
		copy: "Create and manage inventory without spreadsheets or extra hardware.",
	},
	{
		title: "In-Depth Data & Solutions",
		copy: "Track stock, maintenance, and replacements with a clear operating picture.",
	},
	{
		title: "Real-Time Updates",
		copy: "Keep every location aligned from a single cloud inventory workspace.",
	},
];

const LocalHomeFallback: FC = () => {
	return (
		<>
			<Hero
				title="Simpler Inventory, Smarter Business"
				subtitle="Streamlining inventory management often leads to smarter business growth."
				backgroundImage="/svg/backgroundSVG/stacked-waves-haikei-blue-pink-red-yellow.svg"
				backgroundVideoUrl=""
				buttonLink={{
					url: "/sign-up",
					title: "Try BlueInventory",
					target: "",
				}}
				buttonLinkTwo={{
					url: "/login",
					title: "Learn More",
					target: "",
				}}
			/>

			<section className="bg-white">
				<div className="container px-6 py-16 mx-auto max-w-7xl">
					<motion.div
						initial={initial}
						whileInView={stagger}
						viewport={{once: true}}
						className="grid gap-8 md:grid-cols-3"
					>
						{features.map((feature) => (
							<motion.article
								key={feature.title}
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="p-8 border-t-4 rounded-sm shadow-sm bg-lightGrey border-blue"
							>
								<h3 className="mb-3 text-xl font-semibold text-darkBlue">
									{feature.title}
								</h3>
								<Paragraph
									content={feature.copy}
									tailwindStyling="text-black text-[1.05rem]"
								/>
							</motion.article>
						))}
					</motion.div>
				</div>
			</section>

			<section
				className="py-20 bg-center bg-no-repeat bg-cover"
				style={{
					backgroundImage: `linear-gradient(0deg, rgba(9, 39, 94, 0.88), rgba(9, 39, 94, 0.88)), url("/svg/backgroundSVG/stacked-waves-haikei-blue-darkblue.svg")`,
				}}
			>
				<div className="container px-6 mx-auto text-center max-w-4xl">
					<h2 className="text-3xl font-semibold text-white sm:text-5xl">
						Keep stock, locations, and support in one place
					</h2>
					<p className="mt-6 text-lg text-white/90">
						BlueInventory helps teams track inventory, answer customer questions
						from company policy, and stay aligned across every location.
					</p>
					<div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
						<Link
							href="/sign-up"
							className="px-8 py-3 font-semibold tracking-widest text-white uppercase rounded-sm bg-blue hover:bg-goldPrime"
						>
							Sign Up
						</Link>
						<Link
							href="/login"
							className="px-8 py-3 font-semibold tracking-widest text-white uppercase rounded-sm bg-darkBlue hover:bg-goldPrime"
						>
							Login
						</Link>
						<Link
							href="/support"
							className="px-8 py-3 font-semibold tracking-widest text-white uppercase rounded-sm bg-goldPrime hover:bg-blue"
						>
							Help Desk
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default LocalHomeFallback;
