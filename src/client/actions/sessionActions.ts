import {AppThunk} from "../types/AppThunk";
import {config} from "dotenv";

config({
	path: "../../../.env",
});

//SYNC

export const getSessionId = (payload: string) =>
	({
		type: "GET_SESSION_ID",
		payload,
	} as const);

//ASYNC

export const asyncGetSessionId = (): AppThunk => async dispatch => {
	const res = await fetch(`${process.env.SERVER_URL}/api/get-sid`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		const {sessionId}: {sessionId: string} = await res.json();

		dispatch(getSessionId(sessionId));
	}
};

export type sessionActionTypes = ReturnType<typeof getSessionId>;
