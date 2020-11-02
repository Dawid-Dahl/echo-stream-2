import {ioServer} from "../../server";
import {fork} from "child_process";
import {serverEchoStream} from "./serverEchoStream";
import {addStreamToServerState} from "./util";
import {Request} from "express-serve-static-core";

export const initIoNameSpaceAndStartStreaming = (req: Request) => (
	echoStreamId: string,
	hashtag: string
) => {
	try {
		const idNameSpace = ioServer.of(`/${echoStreamId}`).on("connection", socket => {
			console.log(`Client connected to namespace: ${echoStreamId}`);
		});

		const childProcess = fork(`${__dirname}/forkChildToInitTwitStream.ts`);

		addStreamToServerState(req, serverEchoStream)(echoStreamId, hashtag, childProcess);

		childProcess.send(hashtag);

		childProcess.on("message", tweet => {
			idNameSpace.emit("io-message", {tweet});
		});
	} catch (e) {
		console.log(e);
	}
};
