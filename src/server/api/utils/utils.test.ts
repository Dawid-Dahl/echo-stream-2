import crypto from "crypto";
/* import shutDownStreamAfterTimeout from "./shutDownStreamAfterTimeout"; */
import {generateId} from "./util";

describe("generateId", () => {
	it("should generate an id", () => {
		const spy = jest.spyOn(crypto, "randomBytes");
		spy.mockImplementationOnce(() => "f461927f6b379042e3102ce8");

		expect(generateId(12)).toBe("f461927f6b379042e3102ce8");
		expect(spy).toHaveBeenCalled();
	});
});

//FINISH THIS
/* describe("shutDownStreamAfterTimeout", () => {
	describe("happy path", () => {
		it("should shut down a stream after ten seconds", () => {
			const tenSeconds = 1000 * 15;
			expect(shutDownStreamAfterTimeout(tenSeconds, streamId)).resolves.toBe(true);
		});
	});
	describe("sad path", () => {
		it("", () => {});
	});
}); */

//FINISH THIS
/* describe("stopEchoStream", () => {
	describe("happy path", () => {
		it("should stop an echo stream", () => {});
	});
	describe("sad path", () => {
		it("", () => {});
	});
}); */
