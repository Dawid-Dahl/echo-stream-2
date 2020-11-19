import {ServerEchoStream} from "./serverEchoStream";
import {initIoNameSpaceAndStartEmitting} from "./initIoNameSpaceAndStartEmitting";
import {clientEchoStream, ClientEchoStream} from "./clientEchoStream";
import {EffectContainer} from "../../effectContainer";

export const startEchoStream = (effectContainer: EffectContainer) => async (
	echoStreamServerState: ServerEchoStream[]
): Promise<ClientEchoStream[] | null> => {
	try {
		const {twitterStream} = effectContainer;

		twitterStream.startTwitterStream(echoStreamServerState.map(state => state.hashtag));

		echoStreamServerState.forEach(echoStreamState => {
			initIoNameSpaceAndStartEmitting(effectContainer)(echoStreamState);
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
