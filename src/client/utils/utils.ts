import {Echo} from "../components/echo/Echo";

export const removeHashtagAndSpacesFromString = (str: string) => str.replace(/#|\s/g, "");

export const sanitizeStringUnconfig = (...fns: Array<(x: string) => string>) => (
	str: string
): string => fns.reduce((acc, cur) => cur(acc), str);

export const sanitizeString = sanitizeStringUnconfig(
	removeHashtagAndSpacesFromString,
	(str: string) => str.toLocaleLowerCase()
);

export const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const constructTwitterUrl = (
	authorScreenName: Echo["authorScreenName"],
	sourceId: Echo["sourceId"]
) =>
	authorScreenName && sourceId
		? `https://twitter.com/${authorScreenName}/status/${sourceId}`
		: "";

export const stringTrimmer = (trimAway: string, str: string) =>
	str ? str.replace(new RegExp(trimAway), "") : "";
