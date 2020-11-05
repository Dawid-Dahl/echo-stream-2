import {ioServer, twitterStream} from "../../server";
import {ServerEchoStream} from "./serverEchoStream";

export const initIoNameSpaceAndStartEmitting = ({hashtag}: ServerEchoStream) => {
	const hashtagNameSpace = ioServer.of(`/${hashtag}`).on("connection", socket => {
		console.log(`Client connected to ${hashtag} namespace.`);
	});

	twitterStream.on("tweet", tweet => {
		const text = tweet.extended_tweet
			? tweet.extended_tweet.full_text
			: tweet.full_text
			? tweet.full_text
			: tweet.text;

		if (text.toLowerCase().includes(hashtag)) {
			hashtagNameSpace.emit("io-message", {tweet});
		}
	});
};
