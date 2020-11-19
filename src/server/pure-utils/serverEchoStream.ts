export type ServerEchoStream = {
	id: string;
	hashtag: string;
	creator: string;
	active: boolean;
	createdAt: Date | string;
};

export const serverEchoStream = (
	id: string,
	hashtag: string,
	creator: string,
	active: boolean,
	createdAt: Date
): ServerEchoStream => ({
	id,
	hashtag,
	creator,
	active,
	createdAt,
});
