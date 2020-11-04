import crypto from "crypto";
import {ServerEchoStream} from "./serverEchoStream";
import {promisify} from "util";
import {RedisClient} from "redis";

export const generateId = (length: number) => crypto.randomBytes(length).toString("hex");

export const saveEchoStreamInServerState = (
	redisClient: RedisClient,
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

		throw new Error("Couldn't start a session. Is Redis server active?");
	}
};

export const getEchoStreamServerState = (redisClient: RedisClient) => async () => {
	const redisGetAsync = promisify(redisClient.get).bind(redisClient);

	const res = await redisGetAsync("echoStreamServerState");

	if (res) {
		const echoStreamServerState = JSON.parse(res) as ServerEchoStream[];

		return echoStreamServerState;
	} else {
		return null;
	}
};

export const removeStreamFromServerState = (redisClient: RedisClient) => async (
	echoStreamId: string
) => {
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

export const removeAllStreamsFromServerState = (redisClient: RedisClient) => async () => {
	try {
		const redisGetAsync = promisify(redisClient.get).bind(redisClient);

		const res = await redisGetAsync("echoStreamServerState");

		if (res) {
			redisClient.set("echoStreamServerState", JSON.stringify([]));

			console.log("Server state was cleared!");
		} else {
			throw new Error("Couldn't get the stream server state from Redis.");
		}
	} catch (e) {
		console.log(e);
	}
};
