import {EchoStreamActionTypes} from "../actions/echoStreamActions";
import {ClientEchoStream} from "../utils/clientEchoStream";

export type echoStreamReducerState = {
	echoStreams: ClientEchoStream[];
};

const initialState: echoStreamReducerState = {
	echoStreams: [],
};

export const echoStreamReducer = (
	state: echoStreamReducerState = initialState,
	action: EchoStreamActionTypes
): echoStreamReducerState => {
	switch (action.type) {
		case "ADD_ECHO_STREAMS":
			return {
				...state,
				echoStreams: action.payload,
			};
		case "ADD_ECHO_STREAM":
			return {
				...state,
				echoStreams: [...state.echoStreams, action.payload],
			};
		case "STOP_ECHO_STREAM":
			return {
				...state,
				echoStreams: [...state.echoStreams.filter(stream => stream.id !== action.payload)],
			};
		case "STOP_ALL_ECHO_STREAMS":
			return {
				...state,
				echoStreams: [],
			};
		default:
			return state;
	}
};
