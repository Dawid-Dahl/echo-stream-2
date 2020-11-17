import {ParamsDictionary, Request, Response} from "express-serve-static-core";
import QueryString from "qs";
import {store, twitterStream} from "../../main";
import {
	getEchoStreamServerState,
	removeEchoStreamFromServerState,
} from "../utils/serverStoreActions";
import {startEchoStream} from "../utils/startEchoStream";
import {shutDownAndCleanUpAfterEchoStream} from "../utils/util";

const echoStreamStopController = async (
	req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>,
	res: Response<any, number>
) => {
	try {
		const echoStreamId = req.body.id as string;

		await removeEchoStreamFromServerState(store)(echoStreamId);

		const echoStreamServerState = await getEchoStreamServerState(store)();

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
