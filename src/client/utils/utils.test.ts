import {removeHashtagAndSpacesFromString} from "./utils";

describe("removeHashtagAndSpacesFromString", () => {
	describe("happy path", () => {
		it("removes hashtag from the string if it has one", () => {
			const str = "#test";
			const expected = "test";
			expect(removeHashtagAndSpacesFromString(str)).toBe(expected);
		});
		it("returns the string if it doesn't have a hashtag", () => {
			const str = "test";
			const expected = "test";
			expect(removeHashtagAndSpacesFromString(str)).toBe(expected);
		});
		it("returns an empty string if given an empty string", () => {
			const str = "";
			const expected = "";
			expect(removeHashtagAndSpacesFromString(str)).toBe(expected);
		});
		it("returns an empty string if given just a hashtag string", () => {
			const str = "#";
			const expected = "";
			expect(removeHashtagAndSpacesFromString(str)).toBe(expected);
		});
		it("removes all hashtags from string if more than one", () => {
			const str = "###test#";
			const expected = "test";
			expect(removeHashtagAndSpacesFromString(str)).toBe(expected);
		});
	});
	describe("sad path", () => {});
});
