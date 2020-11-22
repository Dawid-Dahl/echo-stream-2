import {EffectContainer} from "../../effectContainer";
import {ioServer} from "../../main";
import {ServerEchoStream} from "../../pure-utils/serverEchoStream";

export const initIoNameSpaceAndStartEmitting = (effectContainer: EffectContainer) => ({
	id,
	hashtag,
}: ServerEchoStream) => {
	try {
		const {twitterStream} = effectContainer;

		const hashtagNameSpace = ioServer.of(`/${id}/${hashtag}`).on("connection", socket => {
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
	} catch (e) {
		console.log(e);
	}
};
