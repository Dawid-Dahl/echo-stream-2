import {ChildProcess} from "child_process";
import crypto from "crypto";
import {Request} from "express-serve-static-core";
import {ServerEchoStream} from "./serverEchoStream";
import {exec} from "child_process";

export const generateId = (length: number) => crypto.randomBytes(length).toString("hex");

export const addStreamToServerState = (
	req: Request,
	serverEchoStream: (
		id: string,
		hashtag: string,
		active: boolean,
		childProcess: ChildProcess
	) => ServerEchoStream
) => (id: string, hashtag: string, childProcess: ChildProcess) => {
	req.app.locals.echoStreamServerState.push(serverEchoStream(id, hashtag, true, childProcess));
};

export const removeStreamFromServerState = (req: Request, childProcessId: string) => {
	const echoStreamServerState = req.app.locals.echoStreamServerState as ServerEchoStream[];

	req.app.locals.echoStreamServerState = echoStreamServerState.filter(
		stream => stream.id !== childProcessId
	);
};

export const killChildProcess = (req: Request, echoStreamId: string) => {
	try {
		const echoStreamServerState = req.app.locals.echoStreamServerState as ServerEchoStream[];

		const echoStream = echoStreamServerState.find(stream => stream.id === echoStreamId);

		if (echoStream) {
			process.kill(echoStream.childProcess.pid);

			console.log(`ChildProcess ${echoStream.childProcess.pid} was killed!`);
		} else {
			console.log("No echoStream was found in the server state");
		}
	} catch (e) {
		console.error(e);
	}
};

export const getPidsOfAllProcessesExceptMain = (stoutResponse: string): number[] => {
	const allProcessPids = stoutResponse
		.split("\n")
		.filter(process => !process.match(/grep node/))
		.map(process => (process.match(/\d{5}/) ? process.match(/\d{5}/)![0] : null))
		.map(pid => Number(pid))
		.filter(pid => pid !== 0);

	const mainProcPid = process.pid;
	const mainProcParentProcPid = process.ppid;

	const processesToKill = allProcessPids.filter(
		pid => pid !== mainProcPid && pid !== mainProcParentProcPid
	);

	return processesToKill;
};

export const killAllChildProcesses = (req: Request) => {
	exec("ps |grep node|grep -v parcel", (err, stout) => {
		if (!err) {
			const processesToKill = getPidsOfAllProcessesExceptMain(stout);

			processesToKill.forEach(pid => {
				console.log(`ChildProcess ${pid} was killed!`);
				process.kill(pid);
			});
		} else {
			console.error(err);
		}
	});
};

export const removeAllStreamsFromServerState = (req: Request) =>
	(req.app.locals.echoStreamServerState = []);
