import {clientEchoStream, ClientEchoStream} from "../../../client/utils/clientEchoStream";
import {twitterStream} from "../../server";
import {ServerEchoStream} from "./serverEchoStream";
import {initIoNameSpaceAndStartEmitting} from "./initIoNameSpaceAndStartEmitting";

export const startEchoStream = async (
	echoStreamServerState: ServerEchoStream[]
): Promise<ClientEchoStream[] | null> => {
	try {
		twitterStream.startTwitterStream(echoStreamServerState.map(state => state.hashtag));

		echoStreamServerState.forEach(echoStreamState => {
			initIoNameSpaceAndStartEmitting(echoStreamState);
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
