import {ServerEchoStream} from "./serverEchoStream";
import {ServerStore} from "./server-store/serverStore";

export const getEchoStreamServerState = (store: ServerStore) => async () => {
	try {
		const state = await store.read("echoStreamServerState");

		return state ? (JSON.parse(state) as ServerEchoStream[]) : null;
	} catch (e) {
		console.error(e);
		throw new Error(e);
	}
};

export const getAllEchoStreamsActiveLongerThan = (
	time: number,
	streams: ServerEchoStream[]
): ServerEchoStream[] =>
	streams.filter(stream => Date.now() + time < new Date(stream.createdAt).getTime());

export const addEchoStreamToServerState = (
	store: ServerStore,
	serverEchoStream: (
		id: string,
		hashtag: string,
		creator: string,
		active: boolean,
		createdAt: Date
	) => ServerEchoStream
) => async (id: string, hashtag: string, creator: string) => {
	try {
		const state = await store.read("echoStreamServerState");

		if (state) {
			const echoStreamServerState = JSON.parse(state) as ServerEchoStream[];

			await store.write(
				"echoStreamServerState",
				JSON.stringify([
					...echoStreamServerState,
					serverEchoStream(id, hashtag, creator, true, new Date(Date.now())),
				])
			);

			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.error(e);
		throw new Error(e);
	}
};

export const removeEchoStreamFromServerState = (store: ServerStore) => async (
	echoStreamId: string
) => {
	try {
		const state = await store.read("echoStreamServerState");

		if (state) {
			const echoStreamServerState = JSON.parse(state) as ServerEchoStream[];

			await store.write(
				"echoStreamServerState",
				JSON.stringify(echoStreamServerState.filter(stream => stream.id !== echoStreamId))
			);

			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.error(e);

		throw new Error("Couldn't get the stream server state from Redis.");
	}
};

export const removeAllStreamsFromServerState = (store: ServerStore) => async () => {
	try {
		const res = await store.read("echoStreamServerState");

		if (res) {
			await store.write("echoStreamServerState", JSON.stringify([]));

			console.log("Server state was cleared!");

			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.error(e);
		throw new Error("Couldn't get the stream server state from Redis.");
	}
};
