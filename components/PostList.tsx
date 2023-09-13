import { applyFilters } from "@/features/filters/slice";
import { useAppSelector } from "@/features/hooks";
import { store } from "@/features/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import HtmlConverter from "./HtmlConverter";

interface PostProps {
	id: string;
	image: string;
	title: string;
	description: string;
	content: string;
	category: string;
}

const Post = ({
	id,
	image,
	title,
	description,
	content,
	category,
}: PostProps) => {
	return (
		<Link href={`/posts/${id}`}>
			<div className="w-[21rem] h-[20rem] border border-slate-300 bg-white rounded-md ">
				<img src={image} className="w-full h-32 object-cover" />
				<div className="px-3 py-2 flex flex-col gap-1">
					<div className="flex items-center justify-between gap-2 text-sm text-slate-500 capitalize">
						<span>{category}</span>
						<span>2 hours ago</span>
					</div>
					<h1 className="font-bold text-slate-600">{title}</h1>
					<h1>{description}</h1>
					<HtmlConverter htmlContent={content.substring(0, 180)} />
				</div>
			</div>
		</Link>
	);
};

const PostList = () => {
	const { filtered_posts: posts, filters } = useAppSelector(
		(store) => store.filters
	);

	useEffect(() => {
		store.dispatch(applyFilters());
	}, [filters]);

	return (
		<div className="flex gap-3 flex-wrap w-10/12">
			{posts.map((post: any) => {
				return <Post key={post.id} {...post} />;
			})}
		</div>
	);
};

export default PostList;
