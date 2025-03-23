import { createSlice } from "@reduxjs/toolkit";

interface AuthSlice {
	isAuthenticated: boolean;
	user: {
		email: string;
		name: string;
		id: number;
		role: string;
	} | null;
	loading: boolean;
	error: string | null;
	data: {
		email: string;
		name: string;
		id: number;
		role: string;
	} | {};
	status: "idle" | "loading" | "succeeded" | "failed";
	userInfo: {
		email: string;
		name: string;
		id: number | null;
		role: string;
	} | null;
}

const initialState: AuthSlice = {
	isAuthenticated: false,
	user: null,
	loading: false,
	error: null,
	data: {},
	status: "idle",
	userInfo: {
		email: "",
		name: "",
		id: null,
		role: "",
	},
};

const authSlice = createSlice({
	name: "authentication",
	initialState: initialState,
	reducers: {
		loginStart(state) {
			state.loading = true;
			state.error = null;
			state.status = "loading";
			state.data = {};
		},
		loginSuccess(state, { payload }) {
			state.isAuthenticated = true;
			state.user = payload;
			state.loading = false;
			state.error = null;
			state.status = "succeeded";
			state.data = payload;
			state.userInfo = {
				...state.userInfo,
				...payload,
			};
		},
		loginFailure(state, { payload }) {
			state.loading = false;
			state.error = payload;
			state.status = "failed";
			state.data = {};
			state.user = null;
		},
		updateUserInfo(state, { payload }) {
			state.userInfo = {
				...state.userInfo,
				...payload,
			};
			state.user = {
				...state.user,
				...payload,
			};
			state.data = {
				...state.data,
				...payload,
			};
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	updateUserInfo,
} = authSlice.actions;

export default authSlice.reducer;
