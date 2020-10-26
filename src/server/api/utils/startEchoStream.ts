import {clientEchoStream, ClientEchoStream} from "../../../client/utils/clientEchoStream";
import {addStreamToServerState, generateId} from "./util";
import {serverEchoStream} from "./serverEchoStream";
import {Request} from "express-serve-static-core";
import {initIoNameSpaceAndStartStreaming} from "./initIoNameSpaceAndStartStreaming";

export const startEchoStream = (req: Request): ClientEchoStream => {
	const hashtag = req.body.hashtag as string;

	const id = generateId(12);

	addStreamToServerState(req, serverEchoStream)(id, hashtag);

	initIoNameSpaceAndStartStreaming(id);

	return clientEchoStream(id, hashtag, true);
};
