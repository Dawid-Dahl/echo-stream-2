import {sessionActionTypes} from "../actions/sessionActions";

export type sessionReducerReducerState = {
	sessionId: string;
};

const initialState: sessionReducerReducerState = {
	sessionId: "",
};

export const sessionReducer = (
	state: sessionReducerReducerState = initialState,
	action: sessionActionTypes
): sessionReducerReducerState => {
	switch (action.type) {
		case "GET_SESSION_ID":
			return {
				...state,
				sessionId: action.payload,
			};
		default:
			return state;
	}
};
