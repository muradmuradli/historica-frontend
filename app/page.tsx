"use client";

import Filter from "@/components/Filter";
import GeneralLayout from "@/components/GeneralLayout";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PostList from "@/components/PostList";
import { loadPosts } from "@/features/filters/actions";
import { getAllPosts } from "@/features/posts/actions";
import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		getAllPosts().then(() => loadPosts());
	}, []);

	return (
		<GeneralLayout>
			<Hero title="Home" />
			<div className="p-5 flex gap-4">
				<Filter />
				<PostList />
			</div>
		</GeneralLayout>
	);
}
