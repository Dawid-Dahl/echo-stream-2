import {Echo} from "../components/echo/Echo";
import {ClientEchoStream} from "./clientEchoStream";

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

export const checkIfStreamIsActive = async (id: ClientEchoStream["id"]) => {
	const res = await fetch(`${process.env.SERVER_URL}/api/echo-stream/get?id=${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	//if an echo stream is returned, it is active. If a 404 response is returned, it is not active

	if (res.ok) {
		return true;
	} else {
		return false;
	}
};
