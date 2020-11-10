import crypto from "crypto";
import TwitterStream from "./TwitterStream";

export const generateId = (length: number) => crypto.randomBytes(length).toString("hex");

export const shutDownAndCleanUpAfterEchoStream = (twitterStream: TwitterStream) => {
	twitterStream.stopTwitterStream();

	twitterStream.removeAllListeners();
};
