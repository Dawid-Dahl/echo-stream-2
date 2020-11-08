import {ClientEchoStream} from "../utils/clientEchoStream";
import {AppThunk} from "../types/AppThunk";
import {config} from "dotenv";

config({
	path: "../../../.env",
});

//SYNC

export const addEchoStreams = (payload: ClientEchoStream[]) =>
	({
		type: "ADD_ECHO_STREAMS",
		payload,
	} as const);

export const stopEchoStream = (payload: ClientEchoStream["id"]) =>
	({
		type: "STOP_ECHO_STREAM",
		payload,
	} as const);

export const stopAllEchoStreams = () =>
	({
		type: "STOP_ALL_ECHO_STREAMS",
	} as const);

export const activateEchoStream = (payload: ClientEchoStream["id"]) =>
	({
		type: "ACTIVATE_ECHO_STREAMS",
		payload,
	} as const);

export const inactivateEchoStream = (payload: ClientEchoStream["id"]) =>
	({
		type: "INACTIVATE_ECHO_STREAMS",
		payload,
	} as const);

//ASYNC

export const asyncAddEchoStream = (hashtag: string): AppThunk => async dispatch => {
	const res = await fetch(`${process.env.SERVER_URL}/api/echo-stream/start`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({hashtag}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		const echoStreamServerState: string = await res.json();

		dispatch(addEchoStreams(JSON.parse(echoStreamServerState)));
	}
};

export const asyncRemoveEchoStream = (id: string): AppThunk => async dispatch => {
	const res = await fetch(`${process.env.SERVER_URL}/api/echo-stream/stop`, {
		method: "DELETE",
		credentials: "include",
		body: JSON.stringify({id}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		const echoStreamServerState: string = await res.json();

		dispatch(addEchoStreams(JSON.parse(echoStreamServerState)));
	}
};

export const asyncIsEchoStreamActive = (id: string): AppThunk => async dispatch => {
	const res = await fetch(`${process.env.SERVER_URL}/api/echo-stream/get?id=${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	//if an echo stream is returned, it is active. If a 404 response is returned, it is not active

	if (res.ok) {
		dispatch(activateEchoStream(id));
	} else {
		dispatch(inactivateEchoStream(id));
	}
};

export const asyncGetAllEchoStreams = (): AppThunk => async dispatch => {
	const res = await fetch(`${process.env.SERVER_URL}/api/echo-stream/get-all`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		const echoStreamServerState: string = await res.json();

		dispatch(addEchoStreams(JSON.parse(echoStreamServerState)));
	}
};

export const asyncRemoveAllEchoStreams = (): AppThunk => async dispatch => {
	const res = await fetch(`${process.env.SERVER_URL}/api/echo-stream/clear-server-state`, {
		credentials: "include",
		method: "DELETE",
	});

	if (res.ok) {
		dispatch(stopAllEchoStreams());
	}
};

export type EchoStreamActionTypes =
	| ReturnType<typeof addEchoStreams>
	| ReturnType<typeof stopEchoStream>
	| ReturnType<typeof stopAllEchoStreams>
	| ReturnType<typeof activateEchoStream>
	| ReturnType<typeof inactivateEchoStream>;
