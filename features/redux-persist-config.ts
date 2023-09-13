// redux-persist-config.js
import storage from "redux-persist/lib/storage"; // Use localStorage for web

const persistConfig = {
	key: "root",
	storage,
	// Specify the reducers you want to persist
	whitelist: ["user"], // Add 'user' to persist the user reducer
};

export default persistConfig;
