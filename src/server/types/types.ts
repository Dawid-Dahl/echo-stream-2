export type ValueOf<T> = T[keyof T];

export type SocialMediaPlatforms = "facebook" | "twitter" | "instagram";

export type Hashtag = string;

export type SocketUri = string;

export type JsonResponse = {
	success: boolean;
	payload?: string | NodeJS.ReadableStream | undefined;
};

export type ParsedJsonResponsePayload = {message: string; hashtag: string; emittedEvent: string};
