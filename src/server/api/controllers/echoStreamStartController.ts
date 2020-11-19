import {Request, Response} from "express-serve-static-core";
import {addEchoStreamToServerState, getEchoStreamServerState} from "../utils/serverStoreActions";
import {serverEchoStream} from "../utils/serverEchoStream";
import shutDownStreamAfterTimeout from "../utils/shutDownStreamAfterTimeout";
import {startEchoStream} from "../utils/startEchoStream";
import {generateId, shutDownAndCleanUpAfterEchoStream} from "../utils/util";
import {EffectContainer} from "../../effectContainer";

const echoStreamStartController = (effectContainer: EffectContainer) => async (
	req: Request,
	res: Response
) => {
	try {
		const {store, twitterStream} = effectContainer;

		const hashtag = req.body.hashtag as string;

		const id = generateId(12);

		await addEchoStreamToServerState(store, serverEchoStream)(id, hashtag, req.sessionID ?? "");

		const echoStreamServerState = await getEchoStreamServerState(store)();

		if (echoStreamServerState) {
			shutDownAndCleanUpAfterEchoStream(twitterStream);

			const clientState = await startEchoStream(effectContainer)(echoStreamServerState);

			shutDownStreamAfterTimeout(effectContainer)(1000 * 10, id);

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
