"use client";

import { login, register } from "@/features/user/actions";
import { useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BsFillPersonCheckFill } from "react-icons/bs";
import {
	AiOutlineEye,
	AiOutlineEyeInvisible,
	AiOutlineLogin,
	AiOutlineMail,
} from "react-icons/ai";
import { useAppSelector } from "@/features/hooks";

interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const InputField = ({
	value,
	onChange,
	type,
	placeholder,
	icon,
}: {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	type: string;
	placeholder: string;
	icon: React.JSX.Element;
}) => (
	<div className="flex items-center justify-between p-3 border border-slate-400 rounded-md w-full">
		<input
			value={value}
			onChange={onChange}
			type={type}
			placeholder={placeholder}
			className="bg-transparent focus:outline-none text-sm"
		/>
		{icon}
	</div>
);

const Auth = () => {
	const router = useRouter();
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { isLoading } = useAppSelector((store) => store.user);

	const initialUserState: User = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};
	const [user, setUser] = useState<User>(initialUserState);

	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let response;
		if (isLogin) {
			response = await login({ user });
			if (response.type === "success") {
				setTimeout(() => {
					router.push("/");
				}, 1000);
			}
		} else {
			response = await register({ user });
			setIsLogin(true);
		}

		if (response.type === "success") {
			toast.success(response.message);
			setUser(initialUserState); // Reset user state
		} else {
			toast.error(response.message);
		}
	};

	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen flex items-center justify-center">
			<Toaster position="top-center" reverseOrder={false} />
			<div className="flex h-[30rem] w-[50rem]">
				<div className="h-full w-6/12 bg-blue-100 relative">
					<img src="login-bg.jpg" className="h-full w-full object-cover" />
					<div className="absolute top-40 w-full text-center text-2xl font-light text-white">
						Welcome Back! <br /> Please log in to your account
					</div>
				</div>
				<div className="bg-white w-6/12 flex items-center justify-center flex-col p-10">
					<h1 className="text-3xl font-light">
						{isLogin ? "Sign In" : "Register"}
					</h1>
					<form
						className="h-full w-full flex flex-col gap-5 items-center justify-center"
						onSubmit={handleSubmit}
					>
						{!isLogin && (
							<>
								<InputField
									value={user.firstName}
									onChange={(e) =>
										setUser({ ...user, firstName: e.target.value })
									}
									type="text"
									placeholder="First Name"
									icon={<BsFillPersonCheckFill />}
								/>
								<InputField
									value={user.lastName}
									onChange={(e) =>
										setUser({ ...user, lastName: e.target.value })
									}
									type="text"
									placeholder="Last Name"
									icon={<BsFillPersonCheckFill />}
								/>
							</>
						)}
						<InputField
							value={user.email}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
							type="email"
							placeholder="Email"
							icon={<AiOutlineMail />}
						/>
						<InputField
							value={user.password}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							icon={
								showPassword ? (
									<AiOutlineEyeInvisible
										className="cursor-pointer"
										onClick={handlePasswordVisibility}
									/>
								) : (
									<AiOutlineEye
										className="cursor-pointer"
										onClick={handlePasswordVisibility}
									/>
								)
							}
						/>
						<button
							className={`bg-emerald-600 disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition rounded-md p-2 text-white uppercase w-full flex items-center gap-2 justify-center`}
							disabled={isLoading}
							type="submit"
						>
							{!isLogin ? "Register" : "Login"}
							<AiOutlineLogin />
						</button>
					</form>
					<div className="flex items-center gap-1">
						<span>
							{isLogin ? "Don't have an account?" : "Already have an account?"}
						</span>
						<button className="underline" onClick={() => setIsLogin(!isLogin)}>
							{isLogin ? "Register" : "Login"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
