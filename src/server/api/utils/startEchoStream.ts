import {clientEchoStream, ClientEchoStream} from "../../../client/utils/clientEchoStream";
import {generateId} from "./util";
import {Request} from "express-serve-static-core";
import {twitterStream} from "../../server";

export const startEchoStream = async (req: Request): Promise<ClientEchoStream | null> => {
	try {
		const hashtag = req.body.hashtag as string;

		const id = generateId(12);

		twitterStream.startTwitterStream(hashtag);

		twitterStream.on("tweet", tweet => {
			console.log(tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text);
		});

		/* initIoNameSpaceAndStartStreaming(id, hashtag); */

		return clientEchoStream(id, hashtag, true);
	} catch (e) {
		console.error(e);

		return null;
	}
};
