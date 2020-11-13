import {
	addEchoStreamToServerState,
	getAllEchoStreamsActiveLongerThan,
	getEchoStreamServerState,
	removeAllStreamsFromServerState,
	removeEchoStreamFromServerState,
} from "./redisActions";
import redis from "redis";
import {serverEchoStream, ServerEchoStream} from "./serverEchoStream";
import {
	manyStreams,
	noStreams,
	oneStream,
	threeStreamsOneCreatedNowTwoCreatedTwoDaysAgo,
	threeStreamsOneCreatedNowTwoCreatedTwoHoursAgo,
	threeStreamsOneCreatedNowTwoCreatedTwoMinutesAgo,
} from "./mock-data/mockData";

jest.mock("redis", () => ({
	createClient: jest.fn(() => ({
		get: jest.fn((k, callback) => callback(null, manyStreams)),
		set: jest.fn((k, v, callback) => callback(null, "OK")),
	})),
}));

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
		it("should throw an error if the redisClient get method throws an error", async () => {
			redisClient.get.mockImplementationOnce(() => {
				throw new Error();
			});

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});
			await expect(getEchoStreamServerState(redisClient)()).rejects.toThrow(
				"Couldn't get the stream server state from Redis."
			);
		});
	});
});

describe("getAllEchoStreamsActiveLongerThan", () => {
	describe("happy path", () => {
		it("get all streams active longer than a minute", () => {
			jest.spyOn(Date, "now").mockImplementationOnce(() =>
				new Date("2020-12-12T12:00:00.000Z").getTime()
			);
			expect(
				getAllEchoStreamsActiveLongerThan(
					60 * 1000,
					threeStreamsOneCreatedNowTwoCreatedTwoMinutesAgo
				)
			).toEqual(threeStreamsOneCreatedNowTwoCreatedTwoMinutesAgo.slice(1));
		});
		it("get all streams active longer than an hour", () => {
			jest.spyOn(Date, "now").mockImplementationOnce(() =>
				new Date("2020-12-12T12:00:00.000Z").getTime()
			);
			expect(
				getAllEchoStreamsActiveLongerThan(
					60 * 60 * 1000,
					threeStreamsOneCreatedNowTwoCreatedTwoHoursAgo
				)
			).toEqual(threeStreamsOneCreatedNowTwoCreatedTwoHoursAgo.slice(1));
		});
		it("get all streams active longer than a day", () => {
			jest.spyOn(Date, "now").mockImplementationOnce(() =>
				new Date("2020-12-12T12:00:00.000Z").getTime()
			);
			expect(
				getAllEchoStreamsActiveLongerThan(
					24 * 60 * 60 * 1000,
					threeStreamsOneCreatedNowTwoCreatedTwoDaysAgo
				)
			).toEqual(threeStreamsOneCreatedNowTwoCreatedTwoDaysAgo.slice(1));
		});
	});
	it("should return an empty array if there are no streams", () => {
		expect(getAllEchoStreamsActiveLongerThan(24 * 60 * 60 * 1000, [])).toEqual([]);
	});
});

describe("addEchoStreamToServerState", () => {
	const {id, hashtag, creator} = JSON.parse(oneStream)[0] as ServerEchoStream;
	describe("happy path", () => {
		it("should add an echo stream to the server state", async () => {
			expect(
				await addEchoStreamToServerState(redisClient, serverEchoStream)(
					id,
					hashtag,
					creator
				)
			).toBe(true);
			expect(redisClientGetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientGetSpy.mock.calls[0][0]).toBe("echoStreamServerState");
			expect(redisClientSetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientSetSpy.mock.calls[0][0]).toBe("echoStreamServerState");
		});
	});
	describe("sad path", () => {
		it("should throw an error if the redisClient get method throws an error", async () => {
			redisClient.get.mockImplementationOnce(() => {
				throw new Error();
			});

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});
			await expect(
				addEchoStreamToServerState(redisClient, serverEchoStream)(id, hashtag, creator)
			).rejects.toThrow("Couldn't start a session. Is Redis server active?");
		});
		it("should throw an error if the redisClient set method throws an error", async () => {
			redisClient.set.mockImplementationOnce(() => {
				throw new Error();
			});

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});
			await expect(
				addEchoStreamToServerState(redisClient, serverEchoStream)(id, hashtag, creator)
			).rejects.toThrow("Couldn't start a session. Is Redis server active?");
		});
	});
});

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
	describe("sad path", () => {
		it("should throw an error if the redisClient get method throws an error", async () => {
			redisClient.get.mockImplementationOnce(() => {
				throw new Error();
			});

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});
			await expect(
				removeEchoStreamFromServerState(redisClient)("cdc0445266ff5d6db207b4b8")
			).rejects.toThrow("Couldn't get the stream server state from Redis.");
		});
	});
});

describe("removeAllStreamsFromServerState", () => {
	describe("happy path", () => {
		it("should remove all streams from server state", async () => {
			const spy = jest.spyOn(console, "log");
			spy.mockImplementationOnce(() => {});

			await removeAllStreamsFromServerState(redisClient)();

			expect(redisClientGetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientGetSpy.mock.calls[0][0]).toBe("echoStreamServerState");
			expect(redisClientSetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientSetSpy.mock.calls[0][0]).toBe("echoStreamServerState");
			expect(redisClientSetSpy.mock.calls[0][1]).toBe(JSON.stringify([]));
		});
	});
	describe("sad path", () => {
		it("should throw an error if the redisClient get method throws an error", async () => {
			redisClient.get.mockImplementationOnce(() => {
				throw new Error();
			});

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});
			await expect(removeAllStreamsFromServerState(redisClient)()).rejects.toThrow(
				"Couldn't get the stream server state from Redis."
			);
		});
	});
});
