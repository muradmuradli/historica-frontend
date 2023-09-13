import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	posts: [],
	isLoading: false,
};

export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export const { setPosts, setIsLoading } = postSlice.actions;

export default postSlice.reducer;
