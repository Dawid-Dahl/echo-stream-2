import {
	addEchoStreamToServerState,
	getAllEchoStreamsActiveLongerThan,
	getEchoStreamServerState,
	removeAllStreamsFromServerState,
	removeEchoStreamFromServerState,
} from "./serverStoreUtils";
import {serverEchoStream, ServerEchoStream} from "../../pure-utils/serverEchoStream";
import {
	manyStreams,
	noStreams,
	oneStream,
	threeStreamsOneCreatedNowTwoCreatedTwoDaysAgo,
	threeStreamsOneCreatedNowTwoCreatedTwoHoursAgo,
	threeStreamsOneCreatedNowTwoCreatedTwoMinutesAgo,
} from "../mock-data/mockData";
import {ServerStore} from "./serverStore";
import {mocked} from "ts-jest/utils";

const mockedStoreConstructor = jest.fn<ServerStore, []>(() => ({
	read: _k => Promise.resolve(manyStreams),
	write: (_k, _v) => Promise.resolve(true),
}));

const mockedStore = mocked(mockedStoreConstructor());

const mockedStoreReadSpy = jest.spyOn(mockedStore, "read");
const mockedStoreWriteSpy = jest.spyOn(mockedStore, "write");

afterEach(() => {
	mockedStoreReadSpy.mockClear();
	mockedStoreWriteSpy.mockClear();
});

describe("getEchoStreamServerState", () => {
	describe("happy path", () => {
		it("should return the echo stream server state if there are active streams", async () => {
			expect(await getEchoStreamServerState(mockedStore)()).toEqual(JSON.parse(manyStreams));
		});
		it("should return the echo stream server state if there are no active streams", async () => {
			mockedStoreReadSpy.mockImplementationOnce(_k => Promise.resolve(noStreams));

			expect(await getEchoStreamServerState(mockedStore)()).toEqual([]);
		});
		it("should resolve to null if Redis returns null", async () => {
			mockedStoreReadSpy.mockImplementationOnce(_k => Promise.resolve(null));
			expect(await getEchoStreamServerState(mockedStore)()).toBe(null);
		});
	});
	describe("sad path", () => {
		it("should throw an error if the serverStore get method throws an error", async () => {
			mockedStoreReadSpy.mockImplementationOnce(_k => {
				throw new Error("error!");
			});

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});

			try {
				await getEchoStreamServerState(mockedStore)();
			} catch (e) {
				expect(e.message).toMatch("error!");
			}
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
			jest.spyOn(Date, "now").mockImplementation(() => 1605204000042);
			expect(
				await addEchoStreamToServerState(mockedStore, serverEchoStream)(
					id,
					hashtag,
					creator
				)
			).toBe(true);

			expect(mockedStoreWriteSpy).toHaveBeenCalledTimes(1);
			expect(mockedStoreWriteSpy).toHaveBeenCalledWith(
				"echoStreamServerState",
				JSON.stringify([
					...JSON.parse(manyStreams),
					{
						id,
						hashtag,
						creator,
						active: true,
						createdAt: new Date(1605204000042),
					},
				])
			);
		});
	});
	describe("sad path", () => {
		it("should throw an error if the redisClient get method throws an error", async () => {
			mockedStoreReadSpy.mockImplementationOnce(() => {
				throw new Error("error!");
			});

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});

			try {
				await addEchoStreamToServerState(mockedStore, serverEchoStream)(
					id,
					hashtag,
					creator
				);
			} catch (e) {
				expect(e.message).toMatch("error!");
			}
		});

		it("should throw an error if the redisClient set method throws an error", async () => {
			mockedStoreWriteSpy.mockImplementationOnce(() => {
				throw new Error("error!");
			});

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});

			try {
				await addEchoStreamToServerState(mockedStore, serverEchoStream)(
					id,
					hashtag,
					creator
				);
			} catch (e) {
				expect(e.message).toMatch("error!");
			}
		});
		it("should return false if the state returned was null or undefined", async () => {
			mockedStoreReadSpy.mockImplementationOnce(_k => Promise.resolve(null));

			expect(
				await addEchoStreamToServerState(mockedStore, serverEchoStream)(
					id,
					hashtag,
					creator
				)
			).toBe(false);
		});
	});
});

describe("removeEchoStreamFromServerState", () => {
	describe("happy path", () => {
		it("should remove an echo stream from the server state if it has active streams", async () => {
			await removeEchoStreamFromServerState(mockedStore)("cdc0445266ff5d6db207b4b8");
		});
		it("should do nothing to the server state if it has no active streams", async () => {
			mockedStoreReadSpy.mockImplementationOnce(_k => Promise.resolve(noStreams));

			await removeEchoStreamFromServerState(mockedStore)("cdc0445266ff5d6db207b4b8");
		});
	});
	describe("sad path", () => {
		it("should throw an error if the redisClient get method throws an error", async () => {
			mockedStoreReadSpy.mockImplementationOnce(() => {
				throw new Error();
			});

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});
			await expect(
				removeEchoStreamFromServerState(mockedStore)("cdc0445266ff5d6db207b4b8")
			).rejects.toThrow("Couldn't get the stream server state from Redis.");
		});
		it("should return false if the state returned was null or undefined", async () => {
			mockedStoreReadSpy.mockImplementationOnce(_k => Promise.resolve(null));

			expect(
				await removeEchoStreamFromServerState(mockedStore)("cdc0445266ff5d6db207b4b8")
			).toBe(false);
		});
	});
});

describe("removeAllStreamsFromServerState", () => {
	describe("happy path", () => {
		it("should remove all streams from server state", async () => {
			const spy = jest.spyOn(console, "log");
			spy.mockImplementationOnce(() => {});

			expect(await removeAllStreamsFromServerState(mockedStore)()).toBe(true);
		});
	});
	describe("sad path", () => {
		it("should throw an error if the redisClient get method throws an error", async () => {
			mockedStoreReadSpy.mockImplementationOnce(() => {
				throw new Error();
			});

			const spy = jest.spyOn(console, "error");
			spy.mockImplementationOnce(() => {});
			await expect(removeAllStreamsFromServerState(mockedStore)()).rejects.toThrow(
				"Couldn't get the stream server state from Redis."
			);
		});
		it("should return false if the state returned was null or undefined", async () => {
			mockedStoreReadSpy.mockImplementationOnce(_k => Promise.resolve(null));

			expect(await removeAllStreamsFromServerState(mockedStore)()).toBe(false);
		});
	});
});
