import {clientEchoStream, ClientEchoStream} from "../../../client/utils/clientEchoStream";
import {twitterStream} from "../../server";
import {ServerEchoStream} from "./serverEchoStream";
import {initIoNameSpaceAndStartStreaming} from "./initIoNameSpaceAndStartStreaming";

export const startEchoStream = async (
	echoStreamServerState: ServerEchoStream[]
): Promise<ClientEchoStream[] | null> => {
	try {
		twitterStream.startTwitterStream(echoStreamServerState.map(state => state.hashtag));

		twitterStream.removeAllListeners("tweet");

		echoStreamServerState.forEach(echoStreamState => {
			initIoNameSpaceAndStartStreaming(echoStreamState);
		});

		const echoStreamClientState = echoStreamServerState.map(({id, hashtag, active}) =>
			clientEchoStream(id, hashtag, active)
		);

		return echoStreamClientState;
	} catch (e) {
		console.error(e);

		return null;
	}
};
