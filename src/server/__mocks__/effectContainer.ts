import {ServerStore} from "../effect-utils/server-store/serverStore";
import TwitTwitterStream from "../effect-utils/twitter-stream/TwitTwitterStream";
import {EffectContainer} from "../effectContainer";
import {ServerEchoStream} from "../pure-utils/serverEchoStream";

const effectContainer = {
	store: {
		read(k: string) {
			return Promise.resolve("");
		},
		write(k: string, v: string) {
			return Promise.resolve(true);
		},
	} as ServerStore,
	twitterStream: {
		startTwitterStream: jest.fn((hashtag: string[]) => undefined),
		stopTwitterStream: jest.fn(),
		shutDownAndCleanUpAfterEchoStream: jest.fn(),
	} as Pick<
		TwitTwitterStream,
		"startTwitterStream" | "stopTwitterStream" | "shutDownAndCleanUpAfterEchoStream"
	>,
	ioServer: jest.fn(),
	redisClient: {
		set: jest.fn(),
		get: jest.fn(),
	},
	effectUtils: {
		echoStreamUtils: {
			startEchoStream: jest.fn(() => () => Promise.resolve([])),
			stopEchoStream: jest.fn(),
			shutDownStreamAfterTimeout: jest.fn(),
		},
		socketIoUtils: {
			initIoNameSpaceAndStartEmitting: jest.fn(
				(effectContainer: EffectContainer) => ({id, hashtag}: ServerEchoStream) => undefined
			),
		},
		storeUtils: {
			getEchoStreamServerState: jest.fn(() => () => Promise.resolve([])),
			addEchoStreamToServerState: jest.fn(),
			removeEchoStreamFromServerState: jest.fn(() => () => Promise.resolve(true)),
			removeAllStreamsFromServerState: jest.fn(),
		},
	},
};

export default effectContainer;
