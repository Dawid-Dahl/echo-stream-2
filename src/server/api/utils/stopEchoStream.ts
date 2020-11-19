import {getEchoStreamServerState, removeEchoStreamFromServerState} from "./serverStoreActions";
import {ServerEchoStream} from "./serverEchoStream";
import {startEchoStream} from "./startEchoStream";
import {shutDownAndCleanUpAfterEchoStream} from "./util";
import {ServerStore} from "./server-store/serverStore";
import TwitterStream from "./TwitterStream";
import {EffectContainer} from "../../effectContainer";

const stopEchoStream = (effectContainer: EffectContainer) => async (
	echoStreamId: ServerEchoStream["id"]
): Promise<ServerEchoStream[] | null> => {
	try {
		const {store, twitterStream} = effectContainer;

		await removeEchoStreamFromServerState(store)(echoStreamId);

		const echoStreamServerState = await getEchoStreamServerState(store)();

		if (echoStreamServerState) {
			shutDownAndCleanUpAfterEchoStream(twitterStream);

			await startEchoStream(effectContainer)(echoStreamServerState);

			return echoStreamServerState;
		} else {
			return null;
		}
	} catch (e) {
		console.error(e);
		throw new Error("Couldn't start the Echo Stream");
	}
};

export default stopEchoStream;
