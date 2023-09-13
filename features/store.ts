import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import postReducer from "./posts/slice";
import filterReducer from "./filters/slice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { FLUSH, REGISTER } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
	reducer: {
		user: persistedUserReducer,
		posts: postReducer,
		filters: filterReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
