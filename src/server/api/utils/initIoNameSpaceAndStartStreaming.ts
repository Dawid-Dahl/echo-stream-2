import {ioServer} from "../../server";

export const initIoNameSpaceAndStartStreaming = (echoStreamId: string) => {
	const idNameSpace = ioServer.of(`/${echoStreamId}`).on("connection", socket => {
		console.log(`Client connected to ${echoStreamId} namespace`);
	});

	setInterval(() => {
		idNameSpace.emit("io-message", "YO!");
	}, 5000);
};
