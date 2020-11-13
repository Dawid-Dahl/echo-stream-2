import {ParamsDictionary, Request, Response} from "express-serve-static-core";
import QueryString from "qs";
import {twitterStream} from "../../server";
import {redisClient} from "../../server";
import {getEchoStreamServerState, removeEchoStreamFromServerState} from "../utils/redisActions";
import {startEchoStream} from "../utils/startEchoStream";
import {shutDownAndCleanUpAfterEchoStream} from "../utils/util";

const echoStreamStopController = async (
	req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>,
	res: Response<any, number>
) => {
	try {
		const echoStreamId = req.body.id as string;

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

export default echoStreamStopController;
