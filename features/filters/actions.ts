import { setPosts, removeFilters, setFilters } from "./slice";
import { store } from "../store";

export const loadPosts = async () => {
	const { posts } = store.getState();
	console.log(posts);
	store.dispatch(setPosts([...posts.posts]));
};

export const updateFilters = (e: any) => {
	let name = e.target.name;
	let value = e.target.value;
	console.log(name, value);

	if (name === "category") {
		value = e.target.textContent;
	}

	store.dispatch(setFilters({ name, value }));
};

export const clearFilters = (e: any) => {
	store.dispatch(removeFilters());
};
