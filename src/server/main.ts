import {server} from "./server";
import io from "socket.io";
import redis from "redis";
import {redisServerStore} from "./api/utils/server-store/redis-server-store/redisServerStore";
import {serverStore} from "./api/utils/server-store/serverStore";
import TwitterStream from "./api/utils/TwitterStream";

const PORT = process.env.PORT || 5000;

export const store = serverStore(redisServerStore);

export const twitterStream = new TwitterStream();

if (!process.env.REDIS_URL) {
	throw new Error("REDIS_URL not found.");
}

const redisClient = redis.createClient(process.env.REDIS_URL);

const app = server(store, twitterStream, redisClient);

const expressServer = app.listen(PORT, () => console.log(`Server now listening at port: ${PORT}`));

export const ioServer = io.listen(expressServer);
