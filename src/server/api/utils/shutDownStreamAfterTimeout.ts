import {EffectContainer} from "../../effectContainer";
import {ServerStore} from "./server-store/serverStore";
import {ServerEchoStream} from "./serverEchoStream";
import {removeEchoStreamFromServerState} from "./serverStoreActions";
import stopEchoStream from "./stopEchoStream";

const shutDownStreamAfterTimeout = (effectContainer: EffectContainer) => (
	time: number,
	id: ServerEchoStream["id"]
) => {
	const {store, twitterStream} = effectContainer;

	setTimeout(async () => {
		await removeEchoStreamFromServerState(store)(id);
		await stopEchoStream(effectContainer)(id);
	}, time);
};

export default shutDownStreamAfterTimeout;
