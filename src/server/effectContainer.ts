import redis, {RedisClient} from "redis";
import {redisServerStore} from "./api/utils/server-store/redis-server-store/redisServerStore";
import {ServerStore, serverStore} from "./api/utils/server-store/serverStore";
import TwitterStream from "./api/utils/TwitterStream";

export const store = serverStore(redisServerStore);

export const twitterStream = new TwitterStream();

if (!process.env.REDIS_URL) {
	throw new Error("REDIS_URL not found.");
}

const redisClient = redis.createClient(process.env.REDIS_URL);

export type EffectContainer = {
	store: ServerStore;
	twitterStream: TwitterStream;
	redisClient: RedisClient;
};

const effectContainer: EffectContainer = {store, twitterStream, redisClient};

export default effectContainer;
