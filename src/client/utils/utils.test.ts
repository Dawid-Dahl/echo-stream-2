import {
	constructTwitterUrl,
	removeHashtagAndSpacesFromString,
	sanitizeString,
	sanitizeStringUnconfig,
	stringTrimmer,
} from "./utils";

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

describe("sanitizeStringUnconfig", () => {
	describe("happy path", () => {
		it("sanitizes a string with one function", () => {
			const str = "# Lol";
			const expected = "Lol";
			const sanitizeString = sanitizeStringUnconfig(removeHashtagAndSpacesFromString);

			expect(sanitizeString(str)).toBe(expected);
		});
		it("sanitizes a string with two functions", () => {
			const str = "# Lol";
			const expected = "lol";
			const sanitizeString = sanitizeStringUnconfig(removeHashtagAndSpacesFromString, str =>
				str.toLocaleLowerCase()
			);

			expect(sanitizeString(str)).toBe(expected);
		});
	});
});

describe("constructTwitterUrl", () => {
	const sourceId = "1271145879878144009";
	const authorScreenName = "AryaNagarjuna";

	it("should construct an twitter status URL from args", () => {
		expect(constructTwitterUrl(authorScreenName, sourceId)).toBe(
			"https://twitter.com/AryaNagarjuna/status/1271145879878144009"
		);
	});

	it("should return an empty string if called incorrectly", () => {
		// @ts-ignore
		expect(constructTwitterUrl(authorScreenName)).toBe("");
		// @ts-ignore
		expect(constructTwitterUrl(sourceId)).toBe("");
	});
});

describe("stringTrimmer", () => {
	const stringWithNormal =
		"https://pbs.twimg.com/profile_images/636894769742897152/frlgaWB8_normal.jpg";
	const stringWithoutNormal =
		"https://pbs.twimg.com/profile_images/636894769742897152/frlgaWB8.jpg";

	describe("happy path", () => {
		it("should remove _normal from the end of twitter profile image string", () => {
			expect(stringTrimmer("_normal", stringWithNormal)).toBe(stringWithoutNormal);
		});
	});

	describe("sad path", () => {
		it("should return the string unaltered if trimAway can't be found", () => {
			expect(stringTrimmer("___normal", stringWithNormal)).toBe(stringWithNormal);
		});
		it("should return an empty string if str is undefined", () => {
			//@ts-ignore
			expect(stringTrimmer("___normal", undefined)).toBe("");
		});
	});
});
