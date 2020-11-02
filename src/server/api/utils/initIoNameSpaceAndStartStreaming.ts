import {ioServer} from "../../server";
import {fork} from "child_process";
import {serverEchoStream} from "./serverEchoStream";
import {saveEchoStreamInServerState} from "./util";

export const initIoNameSpaceAndStartStreaming = (echoStreamId: string, hashtag: string) => {
	const idNameSpace = ioServer.of(`/${echoStreamId}`).on("connection", socket => {
		console.log(`Client connected to ${echoStreamId} namespace`);
	});

	const childProcess = fork(`${__dirname}/forkChildToInitTwitStream.ts`);

	saveEchoStreamInServerState(serverEchoStream)(echoStreamId, hashtag);

	childProcess.send(hashtag);

	childProcess.on("message", tweet => {
		idNameSpace.emit("io-message", {tweet});
	});
};
