import React from "react";
import Navbar from "./Navbar";

interface GeneralLayoutProps {
	children: React.ReactNode;
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
	return (
		<div className="bg-slate-200 px-20 pb-10 min-h-screen h-auto">
			<Navbar />
			{children}
		</div>
	);
};

export default GeneralLayout;
