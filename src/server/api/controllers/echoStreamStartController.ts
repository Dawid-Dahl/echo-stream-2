import {Request, Response} from "express-serve-static-core";
import {redisClient} from "../../server";
import {twitterStream} from "../../server";
import {addEchoStreamToServerState, getEchoStreamServerState} from "../utils/redisActions";
import {serverEchoStream} from "../utils/serverEchoStream";
import {startEchoStream} from "../utils/startEchoStream";
import {generateId, shutDownAndCleanUpAfterEchoStream} from "../utils/util";

const echoStreamStartController = async (req: Request, res: Response) => {
	try {
		const hashtag = req.body.hashtag as string;

		const id = generateId(12);

		await addEchoStreamToServerState(redisClient, serverEchoStream)(
			id,
			hashtag,
			req.sessionID ?? ""
		);

		const echoStreamServerState = await getEchoStreamServerState(redisClient)();

		if (echoStreamServerState) {
			shutDownAndCleanUpAfterEchoStream(twitterStream);

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
		console.log(e);
	}
};

export default echoStreamStartController;
