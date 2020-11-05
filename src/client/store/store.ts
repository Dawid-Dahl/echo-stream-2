import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {echoStreamReducer, sessionReducer} from "../reducers/reducers";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({echoStreamReducer, sessionReducer});

export type RootState = ReturnType<typeof rootReducer>;

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, composeWithDevTools(middleware));

export default store;
