import {getEchoStreamServerState, removeEchoStreamFromServerState} from "./redisActions";
import {manyStreams, noStreams} from "../../../../__mocks__/redis";
import redis from "redis";
import {ServerEchoStream} from "./serverEchoStream";

const redisClient = (redis.createClient() as unknown) as jest.Mocked<redis.RedisClient>;

const redisClientGetSpy = jest.spyOn(redisClient, "get");
const redisClientSetSpy = jest.spyOn(redisClient, "set");

afterEach(() => {
	redisClientGetSpy.mockClear();
	redisClientSetSpy.mockClear();
});

describe("getEchoStreamServerState", () => {
	describe("happy path", () => {
		it("should return the echo stream server state if there are active streams", async () => {
			await expect(getEchoStreamServerState(redisClient)()).resolves.toEqual(
				JSON.parse(manyStreams)
			);
			expect(redisClientGetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientGetSpy.mock.calls[0][0]).toBe("echoStreamServerState");
		});
		it("should return the echo stream server state if there are no active streams", async () => {
			redisClient.get.mockImplementationOnce((k, callback) => {
				callback!(null, noStreams);
				return true;
			});
			await expect(getEchoStreamServerState(redisClient)()).resolves.toEqual([]);
			expect(redisClientGetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientGetSpy.mock.calls[0][0]).toBe("echoStreamServerState");
		});
	});
	describe("sad path", () => {
		it("should log any errors to the console", async () => {
			redisClient.get.mockImplementationOnce(() => {
				throw new Error();
			});
			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});
			await getEchoStreamServerState(redisClient)();
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});
});

/* describe("getAllEchoStreamsActiveLongerThan", () => {
	describe("happy path", () => {
		it('should call "removeEchoStreamFromServerState" for each stream active longer than the provided arg', () => {
			getAllEchoStreamsActiveLongerThan(1);
		});
	});
	describe("sad path", () => {
		it("", () => {});
	});
}); */

/* describe('addEchoStreamToServerState', () => {
    describe('happy path', () => {
        it('', () => {})
    });
    describe('sad path', () => {
        it('', () => {})
    });
}); */

describe("removeEchoStreamFromServerState", () => {
	describe("happy path", () => {
		it("should remove an echo stream from the server state if it has active streams", async () => {
			const stateWithOnlyCatStream = Array.of(
				JSON.parse(manyStreams)[1]
			) as ServerEchoStream[];

			await removeEchoStreamFromServerState(redisClient)("cdc0445266ff5d6db207b4b8");

			expect(redisClientSetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientSetSpy.mock.calls[0][0]).toBe("echoStreamServerState");
			expect(redisClientSetSpy.mock.calls[0][1]).toBe(JSON.stringify(stateWithOnlyCatStream));
		});
		it("should do nothing to the server state if it has no active streams", async () => {
			redisClient.get.mockImplementationOnce((k, callback) => {
				callback!(null, noStreams);
				return true;
			});

			await removeEchoStreamFromServerState(redisClient)("cdc0445266ff5d6db207b4b8");

			expect(redisClientSetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientSetSpy.mock.calls[0][0]).toBe("echoStreamServerState");
			expect(redisClientSetSpy.mock.calls[0][1]).toBe(JSON.stringify([]));
		});
	});
	/* describe("sad path", () => {
		it("", () => {});
	}); */
});
