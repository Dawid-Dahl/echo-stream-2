import crypto from "crypto";
import {generateId} from "./pureUtils";

describe("generateId", () => {
	it("should generate an id", () => {
		const spy = jest.spyOn(crypto, "randomBytes");
		spy.mockImplementationOnce(() => "f461927f6b379042e3102ce8");

		expect(generateId(12)).toBe("f461927f6b379042e3102ce8");
		expect(spy).toHaveBeenCalled();
	});
});
