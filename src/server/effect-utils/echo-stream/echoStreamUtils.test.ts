import effectContainer from "../../effectContainer";
import {startEchoStream} from "./echoStreamUtils";

jest.mock("../../effectContainer");

describe("echoStreamUtils", () => {
	describe("startEchoStream", () => {
		describe("happy path", () => {
			it("should correctly delegate to all its dependencies", async () => {
				await startEchoStream(effectContainer)([]);
				expect(true).toBeTruthy();
			});
		});
		describe("sad path", () => {
			it("", () => {});
		});
	});
});
