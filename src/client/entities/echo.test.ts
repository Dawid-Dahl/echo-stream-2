import echo, {defaultEcho} from "./echo";
import {EchoConstructorArg, DefaultEcho} from "./echoTypes";
import {constructTwitterUrl} from "../utils/utils";
import {Echo} from "../components/echo/Echo";

type Keys = "withoutMedia" | "withMedia" | "defaultEcho";

type ExpectedResultObject = {
	[K in Keys]: K extends "defaultEcho" ? DefaultEcho : Echo;
};

export const expectedEcho: ExpectedResultObject = {
	withoutMedia: {
		id: "123",
		sourceId: "1271062275340873730",
		text: "TESTTESTTEST #test123456",
		author: "Nagarjuna",
		authorScreenName: "AryaNagarjuna",
		echoLikes: 0,
		date: 1591879841712,
		sourceDate: "1591879836293",
		sourceLink: "https://twitter.com/AryaNagarjuna/status/1271062275340873730",
		sourceLikesFavorites: 0,
		profileImageUrl: "http://pbs.twimg.com/profile_images/1253345515/Nagarjuna_normal.jpg",
		platform: "twitter",
		mediaUrl: undefined,
	},
	withMedia: {
		id: "123",
		sourceId: "1271062275340873730",
		text: "TESTWITHIMAGE #test123456 https://t.co/x8ehyquajR",
		author: "Nagarjuna",
		authorScreenName: "AryaNagarjuna",
		echoLikes: 0,
		date: 1591879841712,
		sourceDate: "1591879836293",
		sourceLink: "https://twitter.com/AryaNagarjuna/status/1271062275340873730",
		sourceLikesFavorites: 0,
		profileImageUrl: "http://pbs.twimg.com/profile_images/1253345515/Nagarjuna_normal.jpg",
		platform: "twitter",
		mediaUrl: "http://pbs.twimg.com/media/EaO2qZEXQAEWPpx.jpg",
	},
	defaultEcho: {
		id: "123",
		sourceId: "0",
		text: "",
		echoLikes: 0,
		author: "",
		authorScreenName: "",
		date: 1591879841712,
		sourceDate: "",
		sourceLink: "",
		sourceLikesFavorites: 0,
		profileImageUrl: "",
		platform: "twitter",
		mediaUrl: undefined,
	},
};

describe("echo method", () => {
	const obligatoryEchoConstructorArg: EchoConstructorArg = {
		sourceId: "1271062275340873730",
		text: "TESTTESTTEST #test123456",
		author: "Nagarjuna",
		authorScreenName: "AryaNagarjuna",
		sourceDate: "1591879836293",
		sourceLikesFavorites: 0,
		profileImageUrl: "http://pbs.twimg.com/profile_images/1253345515/Nagarjuna_normal.jpg",
		sourceLink: constructTwitterUrl("AryaNagarjuna", "1271062275340873730"),
		echoLikes: 0,
		platform: "twitter",
		mediaUrl: undefined,
	};

	const obligatoryEchoConstructorArgWithMedia: EchoConstructorArg = {
		sourceId: "1271062275340873730",
		text: "TESTWITHIMAGE #test123456 https://t.co/x8ehyquajR",
		author: "Nagarjuna",
		authorScreenName: "AryaNagarjuna",
		sourceDate: "1591879836293",
		sourceLikesFavorites: 0,
		profileImageUrl: "http://pbs.twimg.com/profile_images/1253345515/Nagarjuna_normal.jpg",
		sourceLink: constructTwitterUrl("AryaNagarjuna", "1271062275340873730"),
		echoLikes: 0,
		platform: "twitter",
		mediaUrl: "http://pbs.twimg.com/media/EaO2qZEXQAEWPpx.jpg",
	};

	const obligatoryEchoConstructorArgScrambled: EchoConstructorArg = {
		text: "TESTTESTTEST #test123456",
		platform: "twitter",
		authorScreenName: "AryaNagarjuna",
		sourceId: "1271062275340873730",
		echoLikes: 0,
		sourceLikesFavorites: 0,
		sourceDate: "1591879836293",
		sourceLink: constructTwitterUrl("AryaNagarjuna", "1271062275340873730"),
		author: "Nagarjuna",
		profileImageUrl: "http://pbs.twimg.com/profile_images/1253345515/Nagarjuna_normal.jpg",
		mediaUrl: undefined,
	};

	it("should construct an echo if given arg object with obligatory keys", () => {
		const constructedEcho = echo.create(obligatoryEchoConstructorArg);
		// @ts-ignore
		constructedEcho.id = "123";
		// @ts-ignore
		constructedEcho.date = 1591879841712;

		expect(constructedEcho).toEqual(expectedEcho.withoutMedia);
	});

	it("should construct an echo if given arg object with obligatory keys in different order", () => {
		const constructedEcho = echo.create(obligatoryEchoConstructorArgScrambled);
		// @ts-ignore
		constructedEcho.id = "123";
		// @ts-ignore
		constructedEcho.date = 1591879841712;

		expect(constructedEcho).toEqual(expectedEcho.withoutMedia);
	});

	it("should construct an echo if given a mediaUrl key in the arg object", () => {
		const constructedEcho = echo.create(obligatoryEchoConstructorArgWithMedia);
		// @ts-ignore
		constructedEcho.id = "123";
		// @ts-ignore
		constructedEcho.date = 1591879841712;

		expect(constructedEcho).toEqual(expectedEcho.withMedia);
	});

	it(`should construct an echo with default values for keys in arg object 
		that are cased incorrectly`, () => {
		//@ts-ignore
		const constructedEcho = echo.create({
			sourceId: "1271062275340873730",
			//@ts-ignore
			Text: "TESTTESTTEST #test123456",
			author: "Nagarjuna",
			authorScreenName: "AryaNagarjuna",
			sourceDate: "1591879836293",
			SourceLikesFavorites: 0,
			profileImageUrl: "http://pbs.twimg.com/profile_images/1253345515/Nagarjuna_normal.jpg",
			SOURCELINK: constructTwitterUrl("AryaNagarjuna", "1271059951402864641"),
			echoLikes: 0,
			PLATFORm: "facebook",
			mediaUrl: undefined,
		});
		// @ts-ignore
		constructedEcho.id = "123";
		// @ts-ignore
		constructedEcho.date = 1591879841712;

		expect(constructedEcho).toEqual({
			id: "123",
			sourceId: "1271062275340873730",
			text: "",
			author: "Nagarjuna",
			authorScreenName: "AryaNagarjuna",
			echoLikes: 0,
			date: 1591879841712,
			sourceDate: "1591879836293",
			sourceLink: "",
			sourceLikesFavorites: 0,
			profileImageUrl: "http://pbs.twimg.com/profile_images/1253345515/Nagarjuna_normal.jpg",
			platform: "twitter",
			mediaUrl: undefined,
		});
	});

	it(`should ignore keys in arg object that does not match keys in 
        config.echoConstructorArgKeys and give back default values instead`, () => {
		//@ts-ignore
		const constructedEcho = echo.create({lol: 4, crazy: "cat", 5: true});
		// @ts-ignore
		constructedEcho.id = "123";
		// @ts-ignore
		constructedEcho.date = 1591879841712;

		expect(constructedEcho).toEqual(expectedEcho.defaultEcho);
	});
});
