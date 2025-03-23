import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
	loginFailure,
	loginStart,
	loginSuccess,
} from "../store/slices/authSlice";
import { useForm } from "react-hook-form";

type FormValues = {
	email: string;
	password: string;
};

const SignInPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated === true) navigate("/");
	}, [isAuthenticated, navigate]);

	const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

	const onSubmit = async (data: FormValues) => {
		dispatch(loginStart());

		await new Promise((r) => setTimeout(r, 1000));

		// Fake backend check if user data matches our mock data
		if (data.email === "test@test.test" && data.password === "password") {
			dispatch(
				loginSuccess({
					email: data.email,
					name: data.email.split("@")[0],
					id: Math.random(),
					role: "user",
				}),
			);
		} else dispatch(loginFailure("User not found"));
	};

	return (
		<div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 dark:text-white">
			<div className="w-full max-w-md">
				<div className="bg-white dark:bg-neutral-800 shadow-md rounded-xl p-8">
					<h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
						Sign In
					</h1>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium mb-2">
								Email address
							</label>
							<input
								id="email"
								className={`py-3 px-4 block w-full border-gray-200 dark:border-neutral-600 border-1 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${
									errors.email ? "border-red-500" : ""
								}`}
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: "Invalid email address",
									},
								})}
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
							)}
						</div>

						<div className="mb-6">
							<label
								htmlFor="password"
								className="block text-sm font-medium mb-2">
								Password
							</label>
							<input
								type="password"
								id="password"
								className={`py-3 px-4 block w-full border-gray-200 dark:border-neutral-600 border-1 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${
									errors.password ? "border-red-500" : ""
								}`}
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 6,
										message: "Password must be at least 6 characters",
									},
								})}
							/>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
							)}
						</div>


						{/* Error message from fake backend */}
						{error && <p className="mb-2 text-sm m-auto text-center text-red-600">{error}</p>}

						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
							{loading ? "Signing in..." : "Sign in"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
