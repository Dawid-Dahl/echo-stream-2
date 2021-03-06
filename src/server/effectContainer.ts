import redis, {RedisClient} from "redis";
import {redisServerStore} from "./effect-utils/server-store/redis-server-store/redisServerStore";
import {ServerStore, serverStore} from "./effect-utils/server-store/serverStore";
import {
	startEchoStream,
	stopEchoStream,
	shutDownStreamAfterTimeout,
} from "./effect-utils/echo-stream/echoStreamUtils";
import {
	getEchoStreamServerState,
	addEchoStreamToServerState,
	removeEchoStreamFromServerState,
	removeAllStreamsFromServerState,
} from "./effect-utils/server-store/serverStoreUtils";
import {initIoNameSpaceAndStartEmitting} from "./effect-utils/socket-io/initIoNameSpaceAndStartEmitting";
import TwitTwitterStream from "./effect-utils/twitter-stream/TwitTwitterStream";
import T from "./config/twitConfig";

const store = serverStore(redisServerStore);

const twitterStream = new TwitTwitterStream(T);

if (!process.env.REDIS_URL) {
	throw new Error("REDIS_URL not found.");
}

const redisClient = redis.createClient(process.env.REDIS_URL);

export type EffectContainer = {
	store: ServerStore;
	twitterStream: TwitTwitterStream;
	redisClient: RedisClient;
	effectUtils: typeof effectUtils;
};

const effectUtils = {
	echoStreamUtils: {
		startEchoStream,
		stopEchoStream,
		shutDownStreamAfterTimeout,
	},
	socketIoUtils: {
		initIoNameSpaceAndStartEmitting,
	},
	storeUtils: {
		getEchoStreamServerState,
		addEchoStreamToServerState,
		removeEchoStreamFromServerState,
		removeAllStreamsFromServerState,
	},
};

const effectContainer: EffectContainer = {store, twitterStream, redisClient, effectUtils};

export default effectContainer;
