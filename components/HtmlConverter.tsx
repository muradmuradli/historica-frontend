import React from "react";

interface HtmlConverterProps {
	htmlContent: any;
}

const HtmlConverter = ({ htmlContent }: HtmlConverterProps) => {
	return (
		<div
			style={{ wordWrap: "break-word" }}
			className="text-sm text-justify text-slate-600"
			dangerouslySetInnerHTML={{ __html: htmlContent }}
		/>
	);
};

export default HtmlConverter;
