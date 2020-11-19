import TwitterStream from "./TwitterStream";
import T from "../../config/twitConfig";
import {Stream} from "twit";
import {start} from "repl";

jest.mock("twit");

let twitterStream: TwitterStream;

beforeEach(() => {
	if (twitterStream?.twitStream) twitterStream.stopTwitterStream();

	twitterStream = new TwitterStream();
});

afterEach(() => {
	twitterStream.twitStream = null;
	jest.restoreAllMocks();
});

describe("TwitterStream", () => {
	describe("constructor", () => {
		it("should construct a twitterStream with a this.twitStream value of null", () => {
			expect(twitterStream).toBeDefined();
			expect(twitterStream.twitStream).toBeNull();
		});
	});
	describe("startTwitterStream", () => {
		describe("happy path", () => {
			it("should start a Twitter stream", () => {
				const consoleSpy = jest.spyOn(console, "log").mockImplementationOnce(jest.fn());

				const tStreamSpy = jest.spyOn(T, "stream");

				tStreamSpy.mockImplementationOnce(
					jest.fn(() => ({
						on: jest.fn(),
					})) as any
				);

				twitterStream.startTwitterStream(["hashtag"]);

				expect(tStreamSpy).toHaveBeenCalledTimes(1);
				expect(tStreamSpy).toHaveBeenCalledWith("statuses/filter", {
					track: ["#hashtag"],
				});
			});
		});
	});
	describe("stopTwitterStream", () => {
		it("should stop a twitter stream", () => {
			jest.spyOn(console, "log").mockImplementationOnce(jest.fn);

			twitterStream.twitStream = {stop: jest.fn()} as any;

			twitterStream.stopTwitterStream();

			expect(twitterStream.twitStream?.stop).toHaveBeenCalledTimes(1);
		});
		it("should throw an error if the twitStream is null", () => {
			expect(() => twitterStream.stopTwitterStream()).toThrowError(
				"No twitter stream is active!"
			);
		});
	});
	describe("shutDownAndCleanUpAfterEchoStream", () => {
		describe("happy path", () => {
			beforeEach(() => {
				(twitterStream.twitStream as any) = {
					start() {},
					stop() {},
				};
			});

			it("should stop the twitter stream, then remove all listeners", () => {
				const twitterStreamStopSpy = jest
					.spyOn(twitterStream, "stopTwitterStream")
					.mockImplementation(() => {});

				twitterStream.shutDownAndCleanUpAfterEchoStream();

				expect(twitterStreamStopSpy).toHaveBeenCalledTimes(1);
			});
			it("should remove all listeners", () => {
				const twitterStreamRemoveAllListenersSpy = jest
					.spyOn(twitterStream, "removeAllListeners")
					.mockImplementation(() => expect.any(TwitterStream));
				jest.spyOn(console, "log").mockImplementation(() => jest.fn());

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
