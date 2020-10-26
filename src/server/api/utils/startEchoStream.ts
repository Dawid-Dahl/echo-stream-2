import {clientEchoStream, ClientEchoStream} from "../../../client/utils/clientEchoStream";
import {generateId} from "./util";
import {Request} from "express-serve-static-core";
import {initIoNameSpaceAndStartStreaming} from "./initIoNameSpaceAndStartStreaming";

export const startEchoStream = (req: Request): ClientEchoStream => {
	const hashtag = req.body.hashtag as string;

	const id = generateId(12);

	initIoNameSpaceAndStartStreaming(req)(id, hashtag);

	return clientEchoStream(id, hashtag, true);
};
