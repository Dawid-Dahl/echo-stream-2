import {server} from "./server";
import io from "socket.io";
import {redisServerStore} from "./api/utils/server-store/redis-server-store/redisServerStore";
import {serverStore} from "./api/utils/server-store/serverStore";
import TwitterStream from "./api/utils/TwitterStream";

const PORT = process.env.PORT || 5000;

export const store = serverStore(redisServerStore);

const app = server(store);

export const twitterStream = new TwitterStream();

const expressServer = app.listen(PORT, () => console.log(`Server now listening at port: ${PORT}`));

export const ioServer = io.listen(expressServer);
