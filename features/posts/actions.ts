import axios from "axios";
import { store } from "../store";
import { setIsLoading, setPosts } from "./slice";

export const getAllPosts = async () => {
	try {
		const response = await axios.get("http://localhost:8080/api/v1/posts");

		store.dispatch(setPosts(response.data));
	} catch (error) {}
};

export const createPost = async ({ post }: { post: any }) => {
	store.dispatch(setIsLoading(true));
	// Define your headers with the Authorization header
	const headers = {
		Authorization: "Bearer " + store.getState().user.token,
	};

	let formData = new FormData();
	formData.append("image", post.image);

	try {
		// Step 1: Upload the image and get the image URL
		const response = await axios.post(
			"http://localhost:8080/api/v1/upload",
			formData,
			{ headers: { ...headers, "Content-Type": "multipart/form-data" } }
		);

		const imageURL = response.data.url;

		// Step 2: Create a post object with the obtained image URL
		const postWithImage = {
			...post,
			image: imageURL, // Add the image URL to the post object
		};

		await axios.post("http://localhost:8080/api/v1/posts", postWithImage, {
			headers,
		});

		store.dispatch(setIsLoading(false));

		return {
			message: "Post created!",
			type: "success",
		};
	} catch (error) {
		store.dispatch(setIsLoading(false));
		return { message: "Something went wrong", type: "error" };
	}
};

export const deletePost = async (id: string) => {
	store.dispatch(setIsLoading(true));
	// Define your headers with the Authorization header
	const headers = {
		Authorization: "Bearer " + store.getState().user.token,
		"Content-Type": "application/json", // Set the content type if needed
	};

	try {
		await axios.delete(`http://localhost:8080/api/v1/posts/${id}`, { headers });

		store.dispatch(setIsLoading(false));

		return {
			message: "Post deleted!",
			type: "success",
		};
	} catch (error) {
		store.dispatch(setIsLoading(false));
		return { message: "Something went wrong", type: "error" };
	}
};
