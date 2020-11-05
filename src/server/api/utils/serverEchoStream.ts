export type ServerEchoStream = {
	id: string;
	hashtag: string;
	creator: string;
	active: boolean;
};

export const serverEchoStream = (
	id: string,
	hashtag: string,
	creator: string,
	active: boolean
): ServerEchoStream => ({
	id,
	hashtag,
	creator,
	active,
});
