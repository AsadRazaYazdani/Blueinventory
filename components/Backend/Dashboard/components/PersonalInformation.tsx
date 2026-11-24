/* eslint-disable react-hooks/exhaustive-deps */
// Imports
import {FC} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {initial, stagger, fadeInUp} from "@/animations/animations";

// Firebase
import {useFirebaseContext} from "@/context/Firebase";

const PersonalInformation: FC = () => {
	const firebaseContext = useFirebaseContext();
	const userData = firebaseContext?.userData || {
		displayName: "BlueInventory Admin",
		email: "info@blueinventory.com",
		emailVerified: true,
		photoURL: "/img/Logos/default-avatar-profile.jpg",
		phoneNumber: "",
		metadata: {
			creationTime: "18 September 2026",
			lastSignInTime: "18 September 2026",
		},
	};

	return (
		<>
			<div className="flex flex-col justify-between gap-4">
				<Image
					width={1000}
					height={1000}
					className="object-cover object-center w-full h-full min-h-[175px] max-h-[175px] lg:min-h-[250px] lg:max-h-[250px]"
					src={"/svg/backgroundSVG/stacked-waves-haikei-orange-yellow.svg"}
					alt="profile hero image"
				/>
				<motion.div
					initial={initial}
					whileInView={stagger}
					viewport={{once: true}}
					className="flex flex-col gap-4 px-4 py-10 lg:flex-row"
				>
					<motion.div
						initial={initial}
						whileInView={stagger}
						viewport={{once: true}}
						className="flex flex-col w-full max-w-5xl gap-4 px-8 py-10 mx-auto bg-white rounded-2xl"
					>
						<div className="flex flex-col py-2 items-center justify-between gap-2 sm:flex-row border-b-lightGreyTwo border-b-[1px]">
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="font-bold text-left text-medium text-darkBlue"
							>
								Display Name
							</motion.h3>
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="mt-1 text-base text-left text-black font-base"
							>
								{userData.displayName}
							</motion.h3>
						</div>
						<div className="flex flex-col pb-3 items-center justify-between gap-2 sm:flex-row border-b-lightGreyTwo border-b-[1px]">
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="font-bold text-left text-medium text-darkBlue"
							>
								Profile Picture
							</motion.h3>
							<Image
								width={500}
								height={500}
								src={
									userData.photoURL
										? userData.photoURL
										: `/img/Logos/default-avatar-profile.jpg`
								}
								alt={`${userData.displayName} profile image`}
								className="object-cover object-center w-10 h-10 rounded-full"
							/>
						</div>
						<div className="flex flex-col py-2 items-center justify-between gap-2 sm:flex-row border-b-lightGreyTwo border-b-[1px]">
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="flex items-center gap-2 font-bold text-left text-medium text-darkBlue"
							>
								<span>Email Address</span>
								<span
									className={
										userData.emailVerified
											? "px-2 py-1 text-xs text-white rounded-full bg-brightGreen"
											: "px-2 py-1 text-xs text-white rounded-full bg-pinkRed"
									}
								>
									{userData.emailVerified ? "Verified" : "Not Verified"}
								</span>
							</motion.h3>
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="mt-1 text-base text-left text-black font-base"
							>
								{userData.email}
							</motion.h3>
						</div>
						<div className="flex flex-col py-2 items-center justify-between gap-2 sm:flex-row border-b-lightGreyTwo border-b-[1px]">
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="font-bold text-left text-medium text-darkBlue"
							>
								Member Role
							</motion.h3>
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="mt-1 text-base text-left text-black font-base"
							>
								Owner
							</motion.h3>
						</div>
						<div className="flex flex-col py-2 items-center justify-between gap-2 sm:flex-row border-b-lightGreyTwo border-b-[1px]">
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="font-bold text-left text-medium text-darkBlue"
							>
								Joined
							</motion.h3>
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="mt-1 text-base text-left text-black font-base"
							>
								{userData.metadata?.creationTime}
							</motion.h3>
						</div>
						<div className="flex flex-col py-2 items-center justify-between gap-2 sm:flex-row border-b-lightGreyTwo border-b-[1px]">
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="font-bold text-left text-medium text-darkBlue"
							>
								Last Sign In
							</motion.h3>
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="mt-1 text-base text-left text-black font-base"
							>
								{userData.metadata?.lastSignInTime}
							</motion.h3>
						</div>
						<div className="flex flex-col py-2 items-center justify-between gap-2 sm:flex-row border-b-lightGreyTwo border-b-[1px]">
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="font-bold text-left text-medium text-darkBlue"
							>
								Phone Number
							</motion.h3>
							<motion.h3
								initial={initial}
								whileInView={fadeInUp}
								viewport={{once: true}}
								className="mt-1 text-base text-left text-black font-base"
							>
								{userData.phoneNumber ? userData.phoneNumber : "none"}
							</motion.h3>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</>
	);
};

export default PersonalInformation;
