import crypto from "crypto";
import TwitterStream from "./TwitterStream";
import {generateId, shutDownAndCleanUpAfterEchoStream} from "./util";

describe("generateId", () => {
	it("should generate an id", () => {
		const spy = jest.spyOn(crypto, "randomBytes");
		spy.mockImplementationOnce(() => "f461927f6b379042e3102ce8");

		expect(generateId(12)).toBe("f461927f6b379042e3102ce8");
		expect(spy).toHaveBeenCalled();
	});
});

describe("shutDownAndCleanUpAfterEchoStream", () => {
	const twitterStream = new TwitterStream();

	describe("happy path", () => {
		it("should stop the twitter stream, then remove all listeners", () => {
			const twitterStreamStopSpy = jest
				.spyOn(twitterStream, "stopTwitterStream")
				.mockImplementation(() => {});

			shutDownAndCleanUpAfterEchoStream(twitterStream);

			expect(twitterStreamStopSpy).toHaveBeenCalledTimes(1);
		});
		it("should remove all listeners", () => {
			const twitterStreamRemoveAllListenersSpy = jest
				.spyOn(twitterStream, "removeAllListeners")
				.mockImplementation(() => expect.any(TwitterStream));

			shutDownAndCleanUpAfterEchoStream(twitterStream);

			expect(twitterStreamRemoveAllListenersSpy).toHaveBeenCalledTimes(1);
		});
	});
});
