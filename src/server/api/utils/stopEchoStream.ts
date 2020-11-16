import {twitterStream} from "../../server";
import {getEchoStreamServerState, removeEchoStreamFromServerState} from "./serverStoreActions";
import {ServerEchoStream} from "./serverEchoStream";
import {startEchoStream} from "./startEchoStream";
import {shutDownAndCleanUpAfterEchoStream} from "./util";
import {ServerStore} from "./server-store/serverStore";

const stopEchoStream = (store: ServerStore) => async (
	echoStreamId: ServerEchoStream["id"]
): Promise<ServerEchoStream[] | null> => {
	try {
		await removeEchoStreamFromServerState(store)(echoStreamId);

		const echoStreamServerState = await getEchoStreamServerState(store)();

		if (echoStreamServerState) {
			shutDownAndCleanUpAfterEchoStream(twitterStream);

			await startEchoStream(echoStreamServerState);

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
