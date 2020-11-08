export type ClientEchoStream = {
	id: string;
	hashtag: string;
	creator: string;
	active: boolean;
};

export const clientEchoStream = (
	id: string,
	hashtag: string,
	creator: string,
	active: boolean
): ClientEchoStream => ({
	id,
	hashtag,
	creator,
	active,
});
