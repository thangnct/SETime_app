import {
    createStore,
    applyMiddleware
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "../reducers"
import { multiClientMiddleware } from "redux-axios-middleware";
import redux_thunk from "redux-thunk";
import clients from "./clients"
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: "root",
    blacklist: [],
    whitelist: ["auth"],
    storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer)
const midderwares = [
    redux_thunk,
    multiClientMiddleware(clients)
]
export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(
        applyMiddleware(...midderwares)
    ));
    let persistor = persistStore(store);
    return { store, persistor }
}