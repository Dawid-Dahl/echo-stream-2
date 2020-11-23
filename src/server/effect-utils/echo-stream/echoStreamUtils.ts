import {EffectContainer} from "../../effectContainer";
import {clientEchoStream, ClientEchoStream} from "../../pure-utils/clientEchoStream";
import {ServerEchoStream} from "../../pure-utils/serverEchoStream";

export const startEchoStream = (effectContainer: EffectContainer) => async (
	echoStreamServerState: ServerEchoStream[]
): Promise<ClientEchoStream[] | null> => {
	try {
		const {twitterStream, effectUtils} = effectContainer;
		const {initIoNameSpaceAndStartEmitting} = effectUtils.socketIoUtils;

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

export const stopEchoStream = (effectContainer: EffectContainer) => async (
	echoStreamId: ServerEchoStream["id"]
): Promise<ServerEchoStream[] | null> => {
	try {
		const {store, twitterStream, effectUtils} = effectContainer;
		const {removeEchoStreamFromServerState, getEchoStreamServerState} = effectUtils.storeUtils;

		await removeEchoStreamFromServerState(store)(echoStreamId);

		const echoStreamServerState = await getEchoStreamServerState(store)();

		if (echoStreamServerState) {
			twitterStream.shutDownAndCleanUpAfterEchoStream();

			echoStreamServerState.length > 0 &&
				(await startEchoStream(effectContainer)(echoStreamServerState));

			return echoStreamServerState;
		} else {
			return null;
		}
	} catch (e) {
		console.error(e);

		return null;
	}
};

export const shutDownStreamAfterTimeout = (effectContainer: EffectContainer) => (
	time: number,
	id: ServerEchoStream["id"]
) => {
	const {store, effectUtils} = effectContainer;
	const {removeEchoStreamFromServerState} = effectUtils.storeUtils;

	setTimeout(async () => {
		console.log(`${time / 60 / 1000}m has passed. Shutting down this stream [id: ${id}].`);
		await removeEchoStreamFromServerState(store)(id);
		await stopEchoStream(effectContainer)(id);
	}, time);
};
