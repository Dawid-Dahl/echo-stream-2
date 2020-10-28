import {getPidsOfAllProcessesExceptMain} from "./util";

describe("getPidsOfAllProcessesExceptMain", () => {
	const realProcess = process;
	const pidMock = 95498;
	const pPidMock = 94998;

	beforeAll(() => {
		global.process = {...realProcess, pid: pidMock, ppid: pPidMock};
	});

	afterAll(() => {
		global.process = realProcess;
	});
	describe("happy path", () => {
		it("returns an Array<number> of all pids except main and parent 1", () => {
			const expected = [95508];

			const stoutExampleWithNodemon = `94998 ttys005    0:00.58 node /Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/echo-stream-2/node_modules/.bin/nodemon src/server/server.ts
            95498 ttys005    0:04.76 node /Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/echo-stream-2/node_modules/.bin/ts-node src/server/server.ts
            95508 ttys005    0:03.69 /usr/local/bin/node /Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/echo-stream-2/node_modules/ts-node/dist/bin.js /Volumes/Seagate Backup Plus Drive/Dawid Programming Files/Projects/echo-stream-2/src/server/api/utils/forkChildToInitTwitStream.ts
            95511 ttys005    0:00.00 grep node`;

			expect(getPidsOfAllProcessesExceptMain(stoutExampleWithNodemon)).toEqual(expected);
		});
	});
});
