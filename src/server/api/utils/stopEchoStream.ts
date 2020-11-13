/* import {RedisClient} from "redis";
import {twitterStream} from "../../server";
import {getEchoStreamServerState, removeEchoStreamFromServerState} from "./redisActions";
import {ServerEchoStream} from "./serverEchoStream";
import {startEchoStream} from "./startEchoStream";
import {shutDownAndCleanUpAfterEchoStream} from "./util";

const stopEchoStream = (redisClient: RedisClient) => async (
	echoStreamId: ServerEchoStream["id"]
): Promise<ServerEchoStream[] | null> => {
	try {
		await removeEchoStreamFromServerState(redisClient)(echoStreamId);

		const echoStreamServerState = await getEchoStreamServerState(redisClient)();

		if (echoStreamServerState) {
			shutDownAndCleanUpAfterEchoStream(twitterStream);

			if (echoStreamServerState.length === 0) {
				return res.status(200).json(JSON.stringify(echoStreamServerState));
			}

			const clientState = await startEchoStream(echoStreamServerState);

			if (clientState) {
				res.status(200).json(JSON.stringify(clientState));
			} else {
				res.status(500).json({message: "Couldn't start the Echo Stream"});
			}
		} else {
			res.status(500).json({message: "Couldn't start the Echo Stream"});
		}
	} catch (e) {
		console.error(e);
	}
};

export default stopEchoStream; */
