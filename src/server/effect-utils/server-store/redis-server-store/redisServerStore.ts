import redis from "redis";
import {RedisClient} from "redis";
import {ServerStore} from "../serverStore";
import {config} from "dotenv";

config({
	path: "../../../../../.env",
});

export const redisReaderUnconfig = (redisClient: RedisClient) => (
	k: string
): Promise<string | null> => {
	return new Promise<string | null>((res, rej) => {
		redisClient.get(k, (err, data) => {
			if (err) {
				console.error(err);
				throw new Error("Couldn't get the stream server state from Redis.");
			} else {
				return data ? res(data) : res(null);
			}
		});
	}).catch(e => {
		throw new Error(e);
	});
};

export const redisWriterUnconfig = (redisClient: RedisClient) => (
	k: string,
	v: string
): Promise<boolean> => {
	return new Promise<boolean>((res, rej) => {
		redisClient.set(k, v, (err, response) => {
			if (err) {
				console.error(err);
				throw new Error("Couldn't set the data. Is the Redis server active?");
			} else {
				return response ? res(true) : res(false);
			}
		});
	}).catch(e => {
		throw new Error(e);
	});
};

if (!process.env.REDIS_URL) {
	throw new Error("REDIS_URL not found.");
}

const redisReader = redisReaderUnconfig(redis.createClient(process.env.REDIS_URL!));
const redisWriter = redisWriterUnconfig(redis.createClient(process.env.REDIS_URL!));

export const redisServerStore: ServerStore = {
	read: redisReader,
	write: redisWriter,
};
