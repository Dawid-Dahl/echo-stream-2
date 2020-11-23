import effectContainer from "../../effectContainer";
import {clientEchoStream} from "../../pure-utils/clientEchoStream";
import {ServerEchoStream} from "../../pure-utils/serverEchoStream";
import {manyStreams, oneStream} from "../mock-data/mockData";
import * as echoStreamUtils from "./echoStreamUtils";

const {startEchoStream, stopEchoStream} = echoStreamUtils;

jest.mock("../../effectContainer");

beforeEach(() => {
	jest.spyOn(Date, "now").mockImplementation(() =>
		new Date("2020-11-12T18:00:00.042Z").getTime()
	);
});

afterEach(() => {
	jest.clearAllMocks();
});

describe("echoStreamUtils", () => {
	const {twitterStream, effectUtils, store} = effectContainer;
	const {initIoNameSpaceAndStartEmitting} = effectUtils.socketIoUtils;
	const {removeEchoStreamFromServerState, getEchoStreamServerState} = effectUtils.storeUtils;
	const parsedEchoStreamState: ServerEchoStream[] = JSON.parse(manyStreams);
	const {id: id1, hashtag: hashtag1, creator: creator1} = parsedEchoStreamState[0];
	const {id: id2, hashtag: hashtag2, creator: creator2} = parsedEchoStreamState[1];

	describe("startEchoStream", () => {
		describe("happy path", () => {
			it("should correctly delegate to startTwitterStream", async () => {
				jest.spyOn(twitterStream, "startTwitterStream");
				expect(await startEchoStream(effectContainer)(parsedEchoStreamState)).toEqual([
					clientEchoStream(id1, hashtag1, creator1, true, new Date(Date.now())),
					clientEchoStream(id2, hashtag2, creator2, true, new Date(Date.now())),
				]);
				expect(twitterStream.startTwitterStream).toHaveBeenCalledTimes(1);
			});
			it("should correctly delegate to initIoNameSpaceAndStartEmitting", async () => {
				jest.spyOn(effectUtils.socketIoUtils, "initIoNameSpaceAndStartEmitting");
				expect(await startEchoStream(effectContainer)(parsedEchoStreamState)).toEqual([
					clientEchoStream(id1, hashtag1, creator1, true, new Date(Date.now())),
					clientEchoStream(id2, hashtag2, creator2, true, new Date(Date.now())),
				]);
				expect(initIoNameSpaceAndStartEmitting).toHaveBeenCalledTimes(2);
			});
		});
		describe("sad path", () => {
			it("should return null if there are any errors", async () => {
				jest.spyOn(console, "error").mockImplementationOnce(() => {});
				jest.spyOn(twitterStream, "startTwitterStream").mockImplementationOnce(() => {
					throw new Error("Yikes");
				});
				expect(await startEchoStream(effectContainer)(parsedEchoStreamState)).toEqual(null);
			});
			it("should log the error msg", async () => {
				jest.spyOn(console, "error").mockImplementationOnce(() => {});
				jest.spyOn(twitterStream, "startTwitterStream").mockImplementationOnce(() => {
					throw new Error("Yikes");
				});
				await startEchoStream(effectContainer)(parsedEchoStreamState);
				expect(console.error).toHaveBeenCalledTimes(1);
			});
		});
	});
	describe("stopEchoStream", () => {
		const mockEchoStreamId = "cdc0445266ff5d6db207b4b8";

		describe("happy path", () => {
			it("should delegate to removeEchoStreamFromServerState", async () => {
				await stopEchoStream(effectContainer)(mockEchoStreamId);
				expect(removeEchoStreamFromServerState).toHaveBeenCalledTimes(1);
				expect(removeEchoStreamFromServerState).toHaveBeenCalledWith(store);
			});
			it("should get the state from getEchoStreamServerState", async () => {
				await stopEchoStream(effectContainer)(mockEchoStreamId);
				expect(getEchoStreamServerState).toHaveBeenCalledTimes(1);
				expect(getEchoStreamServerState).toHaveBeenCalledWith(store);
			});
			it("should call shutDownAndCleanUpAfterEchoStream", async () => {
				jest.spyOn(twitterStream, "shutDownAndCleanUpAfterEchoStream");
				await stopEchoStream(effectContainer)(mockEchoStreamId);
				expect(twitterStream.shutDownAndCleanUpAfterEchoStream).toHaveBeenCalledTimes(1);
				expect(twitterStream.shutDownAndCleanUpAfterEchoStream).toHaveBeenCalledWith();
			});
			it("should delegate to startEchoStream if server state is not empty", async () => {
				(effectUtils.storeUtils
					.getEchoStreamServerState as any).mockImplementationOnce(() => () =>
					Promise.resolve(oneStream)
				);
				const spy = jest
					.spyOn(echoStreamUtils, "startEchoStream")
					.mockImplementationOnce(() => () => Promise.resolve([]));
				await stopEchoStream(effectContainer)(mockEchoStreamId);
				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy).toHaveBeenCalledWith(effectContainer);
				spy.mockRestore();
			});
			it("should not delegate to startEchoStream if server state is empty", async () => {
				const spy = jest.spyOn(echoStreamUtils, "startEchoStream");
				await stopEchoStream(effectContainer)(mockEchoStreamId);
				expect(spy).not.toHaveBeenCalled();
				spy.mockRestore();
			});
		});
		describe("sad path", () => {
			it("should return null if there are any errors", async () => {
				jest.spyOn(console, "error").mockImplementationOnce(() => {});
				jest.spyOn(
					twitterStream,
					"shutDownAndCleanUpAfterEchoStream"
				).mockImplementationOnce(() => {
					throw new Error("Yikes");
				});
				expect(await stopEchoStream(effectContainer)(mockEchoStreamId)).toEqual(null);
			});
			it("should return null if the server state return null", async () => {
				jest.spyOn(console, "error").mockImplementationOnce(() => {});
				(effectUtils.storeUtils
					.getEchoStreamServerState as any).mockImplementationOnce(() => () =>
					Promise.resolve(undefined)
				);
				expect(await stopEchoStream(effectContainer)(mockEchoStreamId)).toEqual(null);
			});
			it("should log the error msg", async () => {
				jest.spyOn(console, "error").mockImplementationOnce(() => {});
				jest.spyOn(
					twitterStream,
					"shutDownAndCleanUpAfterEchoStream"
				).mockImplementationOnce(() => {
					throw new Error("Yikes");
				});
				await stopEchoStream(effectContainer)(mockEchoStreamId);
				expect(console.error).toHaveBeenCalledTimes(1);
			});
		});
	});
});
