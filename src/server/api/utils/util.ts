import {ChildProcess} from "child_process";
import crypto from "crypto";
import {Request} from "express-serve-static-core";
import {ServerEchoStream} from "./serverEchoStream";

export const generateId = (length: number) => crypto.randomBytes(length).toString("hex");

export const addStreamToServerState = (
	req: Request,
	serverEchoStream: (id: string, hashtag: string, active: boolean) => ServerEchoStream
) => (id: string, hashtag: string) => {
	req.app.locals.echoStreamServerState.push(serverEchoStream(id, hashtag, true));
};

export const removeStreamFromServerState = (req: Request, childProcessId: string) => {
	const echoStreamServerState = req.app.locals.echoStreamServerState as ServerEchoStream[];

	req.app.locals.echoStreamServerState = echoStreamServerState.filter(
		stream => stream.id !== childProcessId
	);
};

export const removeAllStreamsFromServerState = (req: Request) =>
	(req.app.locals.echoStreamServerState = []);
