import {ioServer, twitterStream} from "../../server";
import {ServerEchoStream} from "./serverEchoStream";

export const initIoNameSpaceAndStartEmitting = ({id, hashtag}: ServerEchoStream) => {
	const idNameSpace = ioServer.of(`/${id}`).on("connection", socket => {
		console.log(`Client connected to ${id} namespace. The hashtag is #${hashtag}.`);
	});

	twitterStream.on("tweet", tweet => {
		const text = tweet.extended_tweet
			? tweet.extended_tweet.full_text
			: tweet.full_text
			? tweet.full_text
			: tweet.text;

		if (text.toLowerCase().includes(hashtag)) {
			idNameSpace.emit("io-message", {tweet});
		}
	});
};
