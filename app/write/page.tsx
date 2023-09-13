"use client";

import GeneralLayout from "@/components/GeneralLayout";
import Hero from "@/components/Hero";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlineFileDone, AiOutlineFileText } from "react-icons/ai";
import { useAppSelector } from "@/features/hooks";
import { MdCreate } from "react-icons/md";
import { createPost } from "@/features/posts/actions";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Write = () => {
	const { isLoading } = useAppSelector((store) => store.posts);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState(null);

	const router = useRouter();

	const handleSubmit = async (e: any) => {
		console.log(title, description, category, content);
		e.preventDefault();
		const response = await createPost({
			post: { title, description, content, category, image },
		});

		if (response.type === "success") {
			toast.success(response.message);
			setTitle("");
			setDescription("");
			setContent("");
			setCategory("");
			setImage(null);
			router.push("/");
		} else {
			toast.error(response.message);
		}
	};

	const { all_posts } = useAppSelector((store) => store.filters);

	const categories = ["History", "Art", "Science"];

	return (
		<GeneralLayout>
			<Toaster position="top-center" reverseOrder={false} />
			<Hero title="Write" />
			<div className="flex flex-col gap-2 bg-white rounded-md p-5 mt-5">
				<div className="flex items-center gap-3 text-lg font-light">
					<div className="text-center w-4/12">
						<h1>Title</h1>
					</div>
					<div className="text-center w-4/12">
						<h1>Description</h1>
					</div>
					<div className="text-center w-4/12">
						<h1>Category</h1>
					</div>
				</div>
				<div className="flex items-center gap-3 mb-2">
					<div className="flex items-center justify-between w-4/12 border border-slate-300 py-2 pl-3 rounded-md">
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Title..."
							className="focus:outline-none w-11/12"
						/>
						<AiOutlineFileDone className="w-1/12" />
					</div>
					<div className="flex items-center justify-between w-4/12 border border-slate-300 py-2 pl-3 rounded-md">
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Description..."
							className="focus:outline-none w-11/12"
						/>
						<AiOutlineFileText className="w-1/12" />
					</div>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="p-2 rounded-md border border-slate-300 w-4/12 capitalize"
					>
						{categories.map((c, i) => (
							<option value={c} key={i}>
								{c}
							</option>
						))}
					</select>
				</div>

				<ReactQuill
					className="h-56"
					theme="snow"
					value={content}
					onChange={setContent}
				/>

				<div className="mt-10 text-lg font-light">
					<h2 className="mb-1">Add Image:</h2>
					<input
						type="file"
						onChange={(e: any) => setImage(e.target.files[0])}
					/>
					<img
						className="h-[20rem] rounded-sm mt-3 border border-slate-300"
						src={image ? URL.createObjectURL(image) : ""}
					/>
				</div>

				<div className="flex justify-center">
					<button
						disabled={isLoading}
						onClick={handleSubmit}
						className="flex items-center gap-2 font-lg bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600 rounded-md transition p-3 text-white uppercase font-light"
					>
						Create Post <MdCreate />
					</button>
				</div>
			</div>
		</GeneralLayout>
	);
};

export default Write;
