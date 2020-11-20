import {ServerStore} from "../effect-utils/server-store/serverStore";
import TwitterStream from "../effect-utils/twitter-stream/TwitterStream";

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
		TwitterStream,
		"startTwitterStream" | "stopTwitterStream" | "shutDownAndCleanUpAfterEchoStream"
	>,
	ioServer: jest.fn(),
	redisClient: jest.fn(),
	effectUtils: {
		echoStreamUtils: {
			startEchoStream: jest.fn(),
			stopEchoStream: jest.fn(),
			shutDownStreamAfterTimeout: jest.fn(),
		},
		socketIoUtils: {
			initIoNameSpaceAndStartEmitting: jest.fn(),
		},
		storeUtils: {
			getEchoStreamServerState: jest.fn(),
			addEchoStreamToServerState: jest.fn(),
			removeEchoStreamFromServerState: jest.fn(),
			removeAllStreamsFromServerState: jest.fn(),
		},
	},
};

export default effectContainer;
