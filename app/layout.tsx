import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/features/provider";

export const metadata: Metadata = {
	title: "FurnishHub",
	description: "Your ultimate guide to quality furniture",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
