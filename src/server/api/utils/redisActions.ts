import {ServerEchoStream} from "./serverEchoStream";
import {promisify} from "util";
import {RedisClient} from "redis";

export const getEchoStreamServerState = (redisClient: RedisClient) => async () => {
	try {
		const redisGetAsync = promisify(redisClient.get).bind(redisClient);

		const res = await redisGetAsync("echoStreamServerState");

		if (res) {
			const echoStreamServerState = JSON.parse(res) as ServerEchoStream[];

			return echoStreamServerState;
		} else {
			return null;
		}
	} catch (e) {
		console.error(e);
	}
};

export const getAllEchoStreamsActiveLongerThan = (
	time: number,
	streams: ServerEchoStream[]
): ServerEchoStream[] =>
	streams.filter(stream => Date.now() + time < new Date(stream.createdAt).getTime());

export const addEchoStreamToServerState = (
	redisClient: RedisClient,
	serverEchoStream: (
		id: string,
		hashtag: string,
		creator: string,
		active: boolean,
		createdAt: Date
	) => ServerEchoStream
) => async (id: string, hashtag: string, creator: string) => {
	try {
		const redisGetAsync = promisify(redisClient.get).bind(redisClient);
		const redisSetAsync = promisify(redisClient.set).bind(redisClient);

		const res = await redisGetAsync("echoStreamServerState");

		if (res) {
			const echoStreamServerState = JSON.parse(res) as ServerEchoStream[];

			await redisSetAsync(
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

		throw new Error("Couldn't start a session. Is Redis server active?");
	}
};

export const removeEchoStreamFromServerState = (redisClient: RedisClient) => async (
	echoStreamId: string
) => {
	try {
		const redisGetAsync = promisify(redisClient.get).bind(redisClient);
		const redisSetAsync = promisify(redisClient.set).bind(redisClient);

		const res = await redisGetAsync("echoStreamServerState");

		if (res) {
			const echoStreamServerState = JSON.parse(res) as ServerEchoStream[];

			await redisSetAsync(
				"echoStreamServerState",
				JSON.stringify(echoStreamServerState.filter(stream => stream.id !== echoStreamId))
			);
		} else {
			throw new Error("Couldn't get the stream server state from Redis.");
		}
	} catch (e) {
		console.error(e);

		throw new Error("Couldn't get the stream server state from Redis.");
	}
};

export const removeAllStreamsFromServerState = (redisClient: RedisClient) => async () => {
	try {
		const redisGetAsync = promisify(redisClient.get).bind(redisClient);
		const redisSetAsync = promisify(redisClient.set).bind(redisClient);

		const res = await redisGetAsync("echoStreamServerState");

		if (res) {
			await redisSetAsync("echoStreamServerState", JSON.stringify([]));

			console.log("Server state was cleared!");
		} else {
			throw new Error("Couldn't get the stream server state from Redis.");
		}
	} catch (e) {
		console.error(e);
		throw new Error("Couldn't get the stream server state from Redis.");
	}
};
