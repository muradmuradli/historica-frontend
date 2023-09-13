"use client";

import { useAppSelector } from "@/features/hooks";
import { useState } from "react";
import Link from "next/link";
import {
	AiOutlineUserAdd,
	AiOutlineLogout,
	AiOutlineCrown,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const dropdownLinks = [
	{ id: 1, title: "Profile Settings", icon: <AiOutlineUserAdd /> },
	{ id: 2, title: "My Posts", icon: <AiOutlineCrown /> },
	{ id: 3, title: "Sign Out", icon: <AiOutlineLogout /> },
];

const Navbar = () => {
	const { user }: { user: any } = useAppSelector((store) => store.user);
	const [showDropdown, setShowDropdown] = useState<boolean>(false);

	return (
		<div className="flex justify-between p-5">
			<Link href={"/"}>
				<img src="/logo.png" alt="logo" className="h-12" />
			</Link>
			<div className="flex items-center gap-7 capitalize">
				<Link href={"/"}>home</Link>
				<Link href={"/about"}>about</Link>
				<Link href={"/write"}>write</Link>
				{user?.email ? (
					<div className="relative">
						<button
							onClick={() => setShowDropdown(!showDropdown)}
							className="flex items-center gap-2"
						>
							<span>
								{user?.firstName} {user?.lastName}
							</span>
							<BsChevronDown className="mt-1" />
						</button>
						<AnimatePresence>
							{showDropdown && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="absolute flex flex-col top-10 right-0 bg-white w-52 border border-slate-300 rounded-md shadow-sm"
								>
									{dropdownLinks.map((link) => {
										return (
											<Link
												key={link.id}
												className={`flex items-center gap-1 hover:bg-slate-100 p-2 ${
													link.id === 1 && "rounded-t-md"
												} ${link.id === 3 && "hover:rounded-b-md"}`}
												href={"/profile"}
											>
												<span>{link.title}</span>
												{link.icon}
											</Link>
										);
									})}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				) : (
					<Link href={"/auth"}>Sign In</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
