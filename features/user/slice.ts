import { createSlice } from "@reduxjs/toolkit";

// Define your initial state with values from local storage if available
const initialState = {
	token: "",
	user: {}, // Parse the stored JSON
	isLoading: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			// Save the token in local storage
			localStorage.setItem("token", action.payload);
		},
		setUser: (state, action) => {
			state.user = action.payload;
			// Save the user object in local storage
			localStorage.setItem("user", JSON.stringify(action.payload));
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export const { setToken, setUser, setIsLoading } = userSlice.actions;

export default userSlice.reducer;
