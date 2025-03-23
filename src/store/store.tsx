import { configureStore } from "@reduxjs/toolkit";
import { catsApi } from "../services/catsService";
import authReducer from "./slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";



const store = configureStore({
	reducer: {
		cats: catsApi.reducer,
		auth: authReducer,
		[catsApi.reducerPath]: catsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(catsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
