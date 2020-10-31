import {generateId} from "../utils/utils";
import {EchoConstructorArg, EchoConstructorConfig} from "./echoTypes";
import {Echo} from "../components/echo/Echo";

export const defaultEcho = {
	id: "0",
	sourceId: "0",
	text: "",
	echoLikes: 0,
	author: "",
	authorScreenName: "",
	date: 0,
	sourceDate: "",
	sourceLink: "",
	sourceLikesFavorites: 0,
	profileImageUrl: "",
	platform: "twitter",
	mediaUrl: undefined,
} as const;

const unconfiguredEcho = (config: EchoConstructorConfig) => ({
	create(echoConstructorArg: EchoConstructorArg): Echo {
		return Object.entries(echoConstructorArg).reduce(
			(acc, [k, v]) =>
				config.echoConstructorArgKeys.includes(k as keyof EchoConstructorArg)
					? {...acc, [k]: v}
					: acc,
			{
				...defaultEcho,
				id: config.generateId(),
				date: Date.now(),
			}
		);
	},
});

const echoConstructorArgKeys = Object.keys(defaultEcho) as Array<keyof EchoConstructorArg>;

const echo = unconfiguredEcho({
	generateId,
	echoConstructorArgKeys: echoConstructorArgKeys,
});

export default echo;
