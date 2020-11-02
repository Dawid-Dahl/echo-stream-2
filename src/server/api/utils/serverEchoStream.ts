export type ServerEchoStream = {
	id: string;
	hashtag: string;
	active: boolean;
};

export const serverEchoStream = (
	id: string,
	hashtag: string,
	active: boolean
): ServerEchoStream => ({
	id,
	hashtag,
	active,
});
