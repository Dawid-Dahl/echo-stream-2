import {ParamsDictionary, Request, Response} from "express-serve-static-core";
import QueryString from "qs";
import {redisClient, twitterStream} from "../../server";
import {startEchoStream} from "../utils/startEchoStream";
import {
	getEchoStreamServerState,
	removeEchoStreamFromServerState,
	shutDownAndCleanUpAfterEchoStream,
} from "../utils/util";

const echoStreamStopController = async (
	req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>,
	res: Response<any, number>
) => {
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
};

export default echoStreamStopController;
