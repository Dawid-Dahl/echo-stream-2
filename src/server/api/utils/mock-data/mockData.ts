import {ServerEchoStream} from "../serverEchoStream";

export const oneStream = JSON.stringify([
	{
		id: "07439bd5325021aa5bf5fe3b",
		hashtag: "trump",
		creator: "e-3nIqppuGySQw93UKi12epbJihfyqJG",
		active: true,
		createdAt: "2020-11-12T18:00:00.042Z",
	},
]);

export const manyStreams = JSON.stringify([
	{
		id: "cdc0445266ff5d6db207b4b8",
		hashtag: "dogs",
		creator: "fIHq07b6LHiu5EI3Ami1VBDfuoi7ZtxQ",
		active: true,
		createdAt: "2020-11-09T17:37:19.000Z",
	},
	{
		id: "cb7acb574c3319fc2346dd8a",
		hashtag: "cats",
		creator: "fIHq07b6LHiu5EI3Ami1VBDfuoi7ZtxQ",
		active: true,
		createdAt: "2020-11-09T17:37:19.000Z",
	},
]);

export const noStreams = JSON.stringify([]);

export const oneStreamJustAdded = [
	{
		id: "07439bd5325021aa5bf5fe3b",
		hashtag: "trump",
		creator: "e-3nIqppuGySQw93UKi12epbJihfyqJG",
		active: true,
		createdAt: "2020-12-12T12:00:00.000Z",
	},
];
export const twoStreamsAddedEarlier = [
	{
		id: "cdc0445266ff5d6db207b4b8",
		hashtag: "dogs",
		creator: "fIHq07b6LHiu5EI3Ami1VBDfuoi7ZtxQ",
		active: true,
		createdAt: "2020-12-12T12:00:00.000Z",
	},
	{
		id: "cb7acb574c3319fc2346dd8a",
		hashtag: "cats",
		creator: "fIHq07b6LHiu5EI3Ami1VBDfuoi7ZtxQ",
		active: true,
		createdAt: "2020-12-12T12:00:00.000Z",
	},
];

export const threeStreamsOneCreatedNowTwoCreatedTwoMinutesAgo: ServerEchoStream[] = [
	...oneStreamJustAdded,
	...twoStreamsAddedEarlier.map(stream => ({
		...stream,
		createdAt: new Date(new Date(stream.createdAt).getTime() - 1000 * 60 * 2),
	})),
];

export const threeStreamsOneCreatedNowTwoCreatedTwoHoursAgo: ServerEchoStream[] = [
	...oneStreamJustAdded,
	...twoStreamsAddedEarlier.map(stream => ({
		...stream,
		createdAt: new Date(new Date(stream.createdAt).getTime() - 1000 * 60 * 60 * 2),
	})),
];
export const threeStreamsOneCreatedNowTwoCreatedTwoDaysAgo: ServerEchoStream[] = [
	...oneStreamJustAdded,
	...twoStreamsAddedEarlier.map(stream => ({
		...stream,
		createdAt: new Date(new Date(stream.createdAt).getTime() - 1000 * 60 * 60 * 24 * 2),
	})),
];
