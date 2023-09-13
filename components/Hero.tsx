import React from "react";

interface HeroProps {
	title: string;
}

const Hero = ({ title }: HeroProps) => {
	return (
		<div className="flex justify-between items-center p-8 bg-white rounded-md">
			<h1 className="text-2xl">Blog</h1>
			<span className="text-slate-400 uppercase tracking-wider font-light">
				Current Page / {title}
			</span>
		</div>
	);
};

export default Hero;
