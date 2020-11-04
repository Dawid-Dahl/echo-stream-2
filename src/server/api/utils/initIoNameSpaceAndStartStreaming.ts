import {ioServer, redisClient, twitterStream} from "../../server";
import {fork} from "child_process";
import {ServerEchoStream, serverEchoStream} from "./serverEchoStream";
import {saveEchoStreamInServerState} from "./util";

export const initIoNameSpaceAndStartStreaming = ({id, hashtag}: ServerEchoStream) => {
	twitterStream.on("tweet", tweet => {
		const text = tweet.extended_tweet
			? tweet.extended_tweet.full_text
			: tweet.full_text
			? tweet.full_text
			: tweet.text;

		console.log(text);
	});

	/* const idNameSpace = ioServer.of(`/${id}`).on("connection", socket => {
		console.log(`Client connected to ${id} namespace`);
	});

	const childProcess = fork(`${__dirname}/forkChildToInitTwitStream.ts`);

	saveEchoStreamInServerState(redisClient, serverEchoStream)(id, hashtag);

	childProcess.send(hashtag);

	childProcess.on("message", tweet => {
		idNameSpace.emit("io-message", {tweet});
	}); */
};
