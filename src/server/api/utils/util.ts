import crypto from "crypto";
import {Request} from "express-serve-static-core";
import {ServerEchoStream} from "./serverEchoStream";
import {redisClient} from "../../server";
import {promisify} from "util";

export const generateId = (length: number) => crypto.randomBytes(length).toString("hex");

export const addStreamToServerState = (
	serverEchoStream: (id: string, hashtag: string, active: boolean) => ServerEchoStream
) => async (id: string, hashtag: string) => {
	const redisGetAsync = promisify(redisClient.get).bind(redisClient);

	const res = await redisGetAsync("echoStreamServerState");

	if (res) {
		const echoStreamServerState = JSON.parse(res) as ServerEchoStream[];

		redisClient.set(
			"echoStreamServerState",
			JSON.stringify([...echoStreamServerState, serverEchoStream(id, hashtag, true)])
		);
	} else {
		throw new Error("Couldn't get the stream server state from Redis.");
	}
};

export const removeStreamFromServerState = async (echoStreamId: string) => {
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
};

export const removeAllStreamsFromServerState = async () => {
	const redisGetAsync = promisify(redisClient.get).bind(redisClient);

	const res = await redisGetAsync("echoStreamServerState");

	if (res) {
		redisClient.set("echoStreamServerState", JSON.stringify([]));
	} else {
		throw new Error("Couldn't get the stream server state from Redis.");
	}
};
