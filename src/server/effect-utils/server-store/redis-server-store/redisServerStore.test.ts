import redis from "redis";
import {mocked} from "ts-jest/utils";
import {manyStreams, noStreams, oneStream} from "../../mock-data/mockData";
import {redisReaderUnconfig, redisWriterUnconfig, redisServerStore} from "./redisServerStore";

jest.mock("redis", () => ({
	createClient: jest.fn(() => ({
		get: jest.fn((k, callback) => callback(null, manyStreams)),
		set: jest.fn((k, v, callback) => callback(null, "OK")),
	})),
}));

const mockedRedisClient = redis.createClient() as jest.Mocked<redis.RedisClient>;

const redisClientGetSpy = jest.spyOn(mockedRedisClient, "get");
const redisClientSetSpy = jest.spyOn(mockedRedisClient, "set");

afterEach(() => {
	redisClientGetSpy.mockClear();
	redisClientSetSpy.mockClear();
});

describe("redisServerStore", () => {
	const redisCreateClientSpy = jest.spyOn(redis, "createClient");

	describe("happy path", () => {
		it("should call redis.createClient for every exported member, with the right dependency injected", () => {
			redisServerStore;

			const twoPlusOneInTestFile = 3;

			expect(redisCreateClientSpy).toHaveBeenCalledTimes(twoPlusOneInTestFile);
			expect(redisCreateClientSpy).toHaveBeenCalledWith(process.env.REDIS_URL);
		});
	});
});

describe("redisReader", () => {
	describe("happy path", () => {
		it("gets the value of a key.", async () => {
			expect(await redisReaderUnconfig(mockedRedisClient)("echoStreamServerState")).toEqual(
				manyStreams
			);

			expect(redisClientGetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientGetSpy).toHaveBeenCalledWith(
				"echoStreamServerState",
				expect.any(Function)
			);
		});
		it("should return an empty array as a string if the value is an empty array as a string", async () => {
			mockedRedisClient.get.mockImplementationOnce((k, callback) => {
				callback!(null, noStreams);
				return true;
			});
			await expect(
				redisReaderUnconfig(mockedRedisClient)("echoStreamServerState")
			).resolves.toEqual(JSON.stringify([]));
			expect(redisClientGetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientGetSpy).toHaveBeenCalledWith(
				"echoStreamServerState",
				expect.any(Function)
			);
		});
		it("should resolve to null if Redis returns null", async () => {
			mockedRedisClient.get.mockImplementationOnce((k, callback) => {
				callback!(null, null);
				return true;
			});
			await expect(
				redisReaderUnconfig(mockedRedisClient)("echoStreamServerState")
			).resolves.toBe(null);
			expect(redisClientGetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientGetSpy).toHaveBeenCalledWith(
				"echoStreamServerState",
				expect.any(Function)
			);
		});
	});
	describe("sad path", () => {
		it("should throw an error if the redisClient get method throws an error", () => {
			mockedRedisClient.get.mockImplementationOnce((k: any, callback: any) =>
				callback(new Error(""), manyStreams)
			);

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});
			expect(redisReaderUnconfig(mockedRedisClient)("echoStreamServerState")).rejects.toThrow(
				"Couldn't get the stream server state from Redis."
			);
		});
	});
});

describe("redisWriter", () => {
	describe("happy path", () => {
		it("set the string value of a key.", async () => {
			expect(
				await redisWriterUnconfig(mockedRedisClient)("echoStreamServerState", oneStream)
			).toBe(true);
			expect(redisClientSetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientSetSpy).toHaveBeenCalledWith(
				"echoStreamServerState",
				oneStream,
				expect.any(Function)
			);
		});
		it("resolve to false if the response is null.", async () => {
			mockedRedisClient.set.mockImplementationOnce((k, v, callback: any) => {
				callback(null, null);
				return true;
			});

			expect(
				await redisWriterUnconfig(mockedRedisClient)("echoStreamServerState", oneStream)
			).toBe(false);
			expect(redisClientSetSpy).toHaveBeenCalledTimes(1);
			expect(redisClientSetSpy).toHaveBeenCalledWith(
				"echoStreamServerState",
				oneStream,
				expect.any(Function)
			);
		});
	});
	describe("sad path", () => {
		it("should throw an error if the redisClient set method throws an error", async () => {
			mockedRedisClient.set.mockImplementationOnce((k: any, v: any, callback: any) =>
				callback(new Error(""), "NOT OK", callback)
			);

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});
			expect(
				redisWriterUnconfig(mockedRedisClient)("echoStreamServerState", oneStream)
			).rejects.toThrow("Couldn't set the data. Is the Redis server active?");
		});
	});
});
