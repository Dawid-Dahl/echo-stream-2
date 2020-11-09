export type ClientEchoStream = {
	id: string;
	hashtag: string;
	creator: string;
	active: boolean;
	createdAt: Date;
};

export const clientEchoStream = (
	id: string,
	hashtag: string,
	creator: string,
	active: boolean,
	createdAt: Date
): ClientEchoStream => ({
	id,
	hashtag,
	creator,
	active,
	createdAt,
});
