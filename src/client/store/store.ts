import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {echoStreamReducer} from "../reducers/reducers";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({echoStreamReducer});

export type RootState = ReturnType<typeof rootReducer>;

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, composeWithDevTools(middleware));

export default store;
