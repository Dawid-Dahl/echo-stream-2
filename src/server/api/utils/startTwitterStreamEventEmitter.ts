import {EventEmitter} from "events";
import T from "../../config/twitConfig";

const returnTwitterStreamEventEmitter = (hashtag: string) => {
	const emitter = new EventEmitter();

	const twitStreamEmitter = T.stream("statuses/filter", {
		track: `#${hashtag}` ?? "#BACKUPHASHTAG",
	});

	twitStreamEmitter.on("tweet", tweet => {
		emitter.emit!(tweet);
	});

	return emitter;
};

export default returnTwitterStreamEventEmitter;
