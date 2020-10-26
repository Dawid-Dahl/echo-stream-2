import {ChildProcess} from "child_process";

export type ServerEchoStream = {
	id: string;
	hashtag: string;
	active: boolean;
	childProcess: ChildProcess;
};

export const serverEchoStream = (
	id: string,
	hashtag: string,
	active: boolean,
	childProcess: ChildProcess
): ServerEchoStream => ({
	id,
	hashtag,
	active,
	childProcess,
});
