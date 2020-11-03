import crypto from "crypto";
import {ServerEchoStream} from "./serverEchoStream";
import {redisClient} from "../../server";
import {promisify} from "util";

export const generateId = (length: number) => crypto.randomBytes(length).toString("hex");

export const saveEchoStreamInServerState = (
	serverEchoStream: (id: string, hashtag: string, active: boolean) => ServerEchoStream
) => async (id: string, hashtag: string) => {
	try {
		const redisGetAsync = promisify(redisClient.get).bind(redisClient);

		const res = await redisGetAsync("echoStreamServerState");

		if (res) {
			const echoStreamServerState = JSON.parse(res) as ServerEchoStream[];

			redisClient.set(
				"echoStreamServerState",
				JSON.stringify([...echoStreamServerState, serverEchoStream(id, hashtag, true)])
			);

			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const removeStreamFromServerState = async (echoStreamId: string) => {
	try {
		const redisGetAsync = promisify(redisClient.get).bind(redisClient);

		const res = await redisGetAsync("echoStreamServerState");

		if (res) {
			const echoStreamServerState = JSON.parse(res) as ServerEchoStream[];

			redisClient.set(
				"echoStreamServerState",
				JSON.stringify(echoStreamServerState.filter(stream => stream.id !== echoStreamId))
			);
		} else {
			throw new Error("Couldn't get the stream server state from Redis.");
		}
	} catch (e) {
		console.log(e);
	}
};

export const removeAllStreamsFromServerState = async () => {
	try {
		const redisGetAsync = promisify(redisClient.get).bind(redisClient);

		const res = await redisGetAsync("echoStreamServerState");

		if (res) {
			redisClient.set("echoStreamServerState", JSON.stringify([]));
		} else {
			throw new Error("Couldn't get the stream server state from Redis.");
		}
	} catch (e) {
		console.log(e);
	}
};
