import axios from "axios";
import { setIsLoading, setToken, setUser } from "./slice";
import { store } from "../store";

export const register = async ({ user }: { user: any }) => {
	store.dispatch(setIsLoading(true));
	try {
		await axios.post("http://localhost:8080/api/v1/auth/register", user);

		store.dispatch(setIsLoading(false));
		return {
			message: "Registration successfull! Sign in",
			type: "success",
		};
	} catch (error) {
		store.dispatch(setIsLoading(false));
		return { message: "Something went wrong", type: "error" };
	}
};

export const login = async ({ user }: { user: any }) => {
	store.dispatch(setIsLoading(true));
	try {
		const response = await axios.post(
			"http://localhost:8080/api/v1/auth/authenticate",
			user
		);

		store.dispatch(setToken(response.data.token));
		store.dispatch(setUser(response.data.user));

		localStorage.setItem("token", response.data.token);
		localStorage.setItem("user", JSON.stringify(response.data.user));

		store.dispatch(setIsLoading(false));
		return {
			message: "Login successfull! Redirecting",
			type: "success",
		};
	} catch (error) {
		store.dispatch(setIsLoading(false));
		return { message: "Something went wrong", type: "error" };
	}
};
