import {ParamsDictionary, Request, Response} from "express-serve-static-core";
import QueryString from "qs";
import {EffectContainer} from "../../effectContainer";

const echoStreamStopController = (effectContainer: EffectContainer) => async (
	req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>,
	res: Response<any, number>
) => {
	try {
		const {store, twitterStream, effectUtils} = effectContainer;
		const {getEchoStreamServerState, removeEchoStreamFromServerState} = effectUtils.storeUtils;
		const {startEchoStream} = effectUtils.echoStreamUtils;

		const echoStreamId = req.body.id as string;

		await removeEchoStreamFromServerState(store)(echoStreamId);

		const echoStreamServerState = await getEchoStreamServerState(store)();

		if (echoStreamServerState) {
			twitterStream.shutDownAndCleanUpAfterEchoStream();

			if (echoStreamServerState.length === 0) {
				return res.status(200).json(JSON.stringify(echoStreamServerState));
			}

			const clientState = await startEchoStream(effectContainer)(echoStreamServerState);

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
