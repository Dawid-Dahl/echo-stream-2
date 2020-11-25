import TwitTwitterStream from "./TwitTwitterStream";
import T from "../../config/twitConfig";

jest.mock("twit");

let twitterStream: TwitTwitterStream;

beforeEach(() => {
	jest.spyOn(console, "log").mockImplementation(jest.fn());
	twitterStream = new TwitTwitterStream(T);

	jest.spyOn(T, "stream").mockImplementationOnce(
		jest.fn(() => ({
			start: jest.fn(),
			stop: jest.fn(),
			on: jest.fn(),
		})) as any
	);
});

afterEach(() => {
	jest.spyOn(console, "log").mockImplementation(jest.fn());
	twitterStream && twitterStream.stopTwitterStream();

	jest.restoreAllMocks();
});

describe("TwitTwitterStream", () => {
	describe("constructor", () => {
		it("should construct a twitterStream with a this.twitterLib value", () => {
			expect(twitterStream).toBeDefined();
			expect((twitterStream as any).twitterLib).toEqual(T);
		});
		it("should construct a twitterStream with a this.twitStream value of null", () => {
			expect(twitterStream).toBeDefined();
			expect((twitterStream as any).twitStream).toBeNull();
		});
		it("should construct a twitterStream with a this.twitterLib value of null if no args are passed", () => {
			const localTwitterStream = new TwitTwitterStream();
			expect(localTwitterStream).toBeDefined();
			expect((localTwitterStream as any).twitterLib).toBeNull();
			jest.spyOn(console, "log").mockImplementation(jest.fn());
			localTwitterStream.shutDownAndCleanUpAfterEchoStream();
		});
	});
	describe("startTwitterStream", () => {
		describe("happy path", () => {
			it("should start a Twitter stream", () => {
				jest.spyOn(console, "log");

				twitterStream.startTwitterStream(["hashtag"]);

				const tStreamSpy = jest.spyOn(T, "stream");

				expect(tStreamSpy).toHaveBeenCalledTimes(1);
				expect(tStreamSpy).toHaveBeenCalledWith("statuses/filter", {
					track: ["#hashtag"],
				});
			});
		});
		describe("sad path", () => {
			it("should log info to the console if no stream has been set", () => {
				const consoleSpy = jest.spyOn(console, "log");

				const localTwitterStream = new TwitTwitterStream();
				localTwitterStream.startTwitterStream(["hashtag"]);

				expect(consoleSpy).toHaveBeenCalledTimes(1);
				expect(consoleSpy).toHaveBeenCalledWith(
					"No Twitter Library is used. Inject it when constructing the TwitTwitterStream."
				);
			});
		});
	});
	describe("stopTwitterStream", () => {
		it("should stop a twitter stream", () => {
			jest.spyOn(console, "log");

			const twitterStreamSpy = jest.spyOn(twitterStream, "stopTwitterStream");

			twitterStream.stopTwitterStream();

			expect(twitterStreamSpy).toHaveBeenCalledTimes(1);
		});
		it("should exit without calling .stop on the twitStream if the stream is null", () => {
			const consoleSpy = jest.spyOn(console, "log");

			(twitterStream as any).twitStream = null;

			expect(twitterStream.stopTwitterStream()).toBeUndefined();

			expect(consoleSpy).toHaveBeenCalledTimes(1);
			expect(consoleSpy).toHaveBeenCalledWith("No twitter stream is active!");
		});
	});
	describe("shutDownAndCleanUpAfterEchoStream", () => {
		describe("happy path", () => {
			it("should stop the twitter stream, then remove all listeners", () => {
				const twitterStreamStopSpy = jest
					.spyOn(twitterStream, "stopTwitterStream")
					.mockImplementation(() => {});

				twitterStream.startTwitterStream(["hashtag"]);

				twitterStream.shutDownAndCleanUpAfterEchoStream();

				expect(twitterStreamStopSpy).toHaveBeenCalledTimes(1);
			});
			it("should remove all listeners", () => {
				const twitterStreamRemoveAllListenersSpy = jest
					.spyOn(twitterStream, "removeAllListeners")
					.mockImplementation(() => expect.any(TwitTwitterStream));
				jest.spyOn(console, "log").mockImplementation(() => jest.fn());

				twitterStream.startTwitterStream(["hashtag"]);

				twitterStream.shutDownAndCleanUpAfterEchoStream();

				expect(twitterStreamRemoveAllListenersSpy).toHaveBeenCalledTimes(1);
			});
		});
		describe("sad path", () => {
			it("should log a message to the console if no stream is active", () => {
				const consoleSpy = jest
					.spyOn(console, "log")
					.mockImplementationOnce(() => jest.fn());

				twitterStream.shutDownAndCleanUpAfterEchoStream();

				expect(consoleSpy).toHaveBeenCalledTimes(1);
				expect(consoleSpy).toHaveBeenCalledWith(
					"Twitter stream is not active, no need to shut down anything."
				);
			});
		});
	});
});
