import {Request, Response} from "express-serve-static-core";
import {EffectContainer} from "../../effectContainer";
import {generateId} from "../../pure-utils/pureUtils";
import {serverEchoStream} from "../../pure-utils/serverEchoStream";

const echoStreamStartController = (effectContainer: EffectContainer) => async (
	req: Request,
	res: Response
) => {
	try {
		const {store, twitterStream, effectUtils} = effectContainer;
		const {getEchoStreamServerState, addEchoStreamToServerState} = effectUtils.storeUtils;
		const {startEchoStream, shutDownStreamAfterTimeout} = effectUtils.echoStreamUtils;

		const hashtag = req.body.hashtag as string;

		const id = generateId(12);

		await addEchoStreamToServerState(store, serverEchoStream)(id, hashtag, req.sessionID ?? "");

		const echoStreamServerState = await getEchoStreamServerState(store)();

		if (echoStreamServerState) {
			twitterStream.shutDownAndCleanUpAfterEchoStream();

			const clientState = await startEchoStream(effectContainer)(echoStreamServerState);

			shutDownStreamAfterTimeout(effectContainer)(1000 * 1000, id);

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
