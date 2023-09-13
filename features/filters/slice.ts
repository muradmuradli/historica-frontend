import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	filtered_posts: [],
	all_posts: [],
	filters: {
		title: "",
		category: "all",
	},
};

export const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setPosts: (state, action) => {
			state.all_posts = action.payload;
			state.filtered_posts = action.payload;
		},
		setFilters: (state, action) => {
			const { name, value } = action.payload;
			state.filters = { ...state.filters, [name]: value };
		},
		applyFilters: (state) => {
			const { all_posts } = state;
			const { title, category } = state.filters;

			let tempPosts = [...all_posts];

			if (title) {
				tempPosts = tempPosts.filter((post: any) => {
					return post.title.toLowerCase().startsWith(title);
				});
			}

			if (category !== "all") {
				tempPosts = tempPosts.filter((post: any) => {
					return post.category === category;
				});
			}

			state.filtered_posts = tempPosts;
		},
		removeFilters: (state) => {
			state.filters = {
				...state.filters,
				title: "",
				category: "all",
			};
		},
	},
});

export const { setPosts, setFilters, applyFilters, removeFilters } =
	filtersSlice.actions;

export default filtersSlice.reducer;
