import {Request, Response} from "express-serve-static-core";
import {redisClient} from "../../server";
import {serverEchoStream} from "../utils/serverEchoStream";
import {startEchoStream} from "../utils/startEchoStream";
import {generateId, getEchoStreamServerState, saveEchoStreamInServerState} from "../utils/util";

const echoStreamStartController = async (req: Request, res: Response) => {
	try {
		const hashtag = req.body.hashtag as string;

		const id = generateId(12);

		await saveEchoStreamInServerState(redisClient, serverEchoStream)(id, hashtag);

		const echoStreamServerState = await getEchoStreamServerState(redisClient)();

		if (echoStreamServerState) {
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
