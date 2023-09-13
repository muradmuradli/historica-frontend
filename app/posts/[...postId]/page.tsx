"use client";

import GeneralLayout from "@/components/GeneralLayout";
import Hero from "@/components/Hero";
import { deletePost } from "@/features/posts/actions";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Modal from "@mui/material/Modal";
import { useAppSelector } from "@/features/hooks";
import HtmlConverter from "@/components/HtmlConverter";

type Post = {
	id: string;
	title: string;
	description: string;
	user: {
		firstName: string;
		lastName: string;
		email: string;
	};
	content: string;
};

type DeletePopupProps = {
	open: boolean;
	handleClose: () => void;
	handleDelete: () => void;
	isLoading: boolean;
};

const DeletePopup: React.FC<DeletePopupProps> = ({
	open,
	handleClose,
	handleDelete,
	isLoading,
}) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
		>
			<div className="w-[30rem] h-[15rem] bg-white rounded-md p-5 text-center flex flex-col justify-center items-center gap-3">
				<AiOutlineCloseCircle size={70} color="red" />
				<h1 className="text-2xl">Are you sure you want to delete the post?</h1>
				<div className="flex items-center gap-2 w-6/12">
					<button
						onClick={handleDelete}
						disabled={isLoading}
						className="bg-red-500 disabled:bg-red-200 transition hover:bg-red-600 capitalize text-white p-2 rounded-md w-6/12"
					>
						Confirm
					</button>
					<button
						onClick={handleClose}
						className="bg-slate-200 transition hover:bg-slate-300 capitalize text-slate-800 p-2 rounded-md w-6/12"
					>
						Cancel
					</button>
				</div>
			</div>
		</Modal>
	);
};

type SinglePostProps = {
	params: {
		postId: string;
	};
};

const SinglePost: React.FC<SinglePostProps> = ({ params }) => {
	const [post, setPost] = useState<Post | null>(null);
	const router = useRouter();
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const { isLoading } = useAppSelector((store) => store.posts);

	useEffect(() => {
		fetchPost();
	}, []);

	const handleDelete = async () => {
		if (!post) return;

		const response = await deletePost(post.id);

		if (response.type === "success") {
			toast.success(response.message);
			setTimeout(() => {
				router.push("/");
			}, 2000);
			setShowDeletePopup(false);
		} else {
			toast.error(response.message);
		}
	};

	const fetchPost = async () => {
		try {
			const response = await axios.get<Post>(
				`http://localhost:8080/api/v1/posts/${params.postId}`
			);
			setPost(response.data);
		} catch (error) {
			console.error("Error fetching post:", error);
		}
	};

	return (
		<GeneralLayout>
			<Hero title="Single Product" />
			<Toaster position="top-center" reverseOrder={false} />
			<DeletePopup
				open={showDeletePopup}
				handleClose={() => setShowDeletePopup(false)}
				handleDelete={handleDelete}
				isLoading={isLoading}
			/>

			{post && (
				<div className="mt-5 flex justify-center flex-col items-center bg-white relative">
					<div className="flex gap-2 w-full h-[20rem] bg-blue-200">
						<img
							src={post?.image}
							alt={post?.title}
							className="h-full object-cover rounded-md w-full"
						/>
					</div>

					<div className="text-center flex flex-col gap-2 mt-4 w-8/12 p-2">
						<h1 className="text-5xl">{post?.title}</h1>
						<h1 className="text-2xl">{post.description}</h1>
						<div className="flex justify-center items-center gap-2">
							<img
								className="h-10"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
								alt="neg"
							/>
							<div className="flex flex-col items-start">
								<span>
									{post?.user?.firstName} {post?.user?.lastName}
								</span>
								<span>{post?.user?.email}</span>
							</div>
						</div>
					</div>

					<div className="flex gap-2 absolute top-[21rem] right-5">
						<button
							className="mt-2 rounded-md p-2 flex items-center gap-1 bg-blue-600 text-white transition hover:bg-blue-700"
							onClick={handleDelete}
						>
							<AiFillEdit />
						</button>
						<button
							className="mt-2 rounded-md p-2 flex items-center gap-1 bg-red-500 text-white transition hover:bg-red-600"
							onClick={() => setShowDeletePopup(true)}
						>
							<MdDelete />
						</button>
					</div>
					<div className="w-8/12 mt-2 text-lg text-justify tracking-wider p-4 bg-white rounded-md">
						<HtmlConverter htmlContent={post.content} />
					</div>
				</div>
			)}
		</GeneralLayout>
	);
};

export default SinglePost;
