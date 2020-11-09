import {twitterStream} from "../../server";
import {ServerEchoStream} from "./serverEchoStream";
import {initIoNameSpaceAndStartEmitting} from "./initIoNameSpaceAndStartEmitting";
import {clientEchoStream, ClientEchoStream} from "./clientEchoStream";

export const startEchoStream = async (
	echoStreamServerState: ServerEchoStream[]
): Promise<ClientEchoStream[] | null> => {
	try {
		twitterStream.startTwitterStream(echoStreamServerState.map(state => state.hashtag));

		echoStreamServerState.forEach(echoStreamState => {
			initIoNameSpaceAndStartEmitting(echoStreamState);
		});

		const echoStreamClientState = echoStreamServerState.map(({id, hashtag, creator, active}) =>
			clientEchoStream(id, hashtag, creator, active, new Date(Date.now()))
		);

		return echoStreamClientState;
	} catch (e) {
		console.error(e);

		return null;
	}
};
