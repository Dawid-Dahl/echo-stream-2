import {ClientEchoStream} from "../utils/clientEchoStream";
import {AppThunk} from "../types/AppThunk";
import {config} from "dotenv";

config({
	path: "../../../.env",
});

//SYNC

export const addEchoStream = (payload: ClientEchoStream) =>
	({
		type: "ADD_ECHO_STREAM",
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

//ASYNC

export const asyncAddEchoStream = (hashtag: string): AppThunk => async dispatch => {
	const res = await fetch(`${process.env.SERVER_URL}/api/echo-stream/start`, {
		method: "POST",
		body: JSON.stringify({hashtag}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		const echoStream: string = await res.json();

		dispatch(addEchoStream(JSON.parse(echoStream)));
	}
};

export const asyncRemoveEchoStream = (id: string): AppThunk => async dispatch => {
	const res = await fetch(`${process.env.SERVER_URL}/api/echo-stream/stop`, {
		method: "DELETE",
		body: JSON.stringify({id}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		const data: {echoStreamId: string} = await res.json();

		dispatch(stopEchoStream(data.echoStreamId));
	}
};

export const asyncRemoveAllEchoStreams = (): AppThunk => async dispatch => {
	const res = await fetch(`${process.env.SERVER_URL}/api/echo-stream/clear-server-state`, {
		method: "DELETE",
	});

	if (res.ok) {
		dispatch(stopAllEchoStreams());
	}
};

export type EchoStreamActionTypes =
	| ReturnType<typeof addEchoStream>
	| ReturnType<typeof stopEchoStream>
	| ReturnType<typeof stopAllEchoStreams>;
