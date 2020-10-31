import {SocialMediaPlatforms} from "../types/types";
import {defaultEcho} from "./echo";
import {Echo} from "../components/echo/Echo";

type DefaultEchoKeys = typeof defaultEcho;

export type DefaultEcho = {
	[K in keyof DefaultEchoKeys]: K extends "id"
		? string
		: K extends "date"
		? number
		: DefaultEchoKeys[K];
};

export type EchoConstructorArg = {
	sourceId: string;
	text: string;
	author: string;
	authorScreenName: string;
	sourceDate: string;
	sourceLikesFavorites: number;
	profileImageUrl: string;
	sourceLink: string;
	echoLikes: number;
	platform: SocialMediaPlatforms;
	mediaUrl: string | undefined;
};

export type EchoConstructorConfig = {
	generateId: () => string;
	echoConstructorArgKeys: Array<keyof EchoConstructorArg>;
};
