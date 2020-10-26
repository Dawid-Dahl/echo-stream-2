export type ClientEchoStream = {
	id: string;
	hashtag: string;
	active: boolean;
};

export const clientEchoStream = (
	id: string,
	hashtag: string,
	active: boolean
): ClientEchoStream => ({
	id,
	hashtag,
	active,
});
