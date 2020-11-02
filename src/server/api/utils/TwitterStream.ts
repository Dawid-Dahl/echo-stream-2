import {EventEmitter} from "events";
import Twit from "twit";
import T from "../../config/twitConfig";

class TwitterStream extends EventEmitter {
	twitStream: Twit.Stream | null;

	constructor() {
		super();
		this.twitStream = null;

		this.on("stopTwitStream", () => {
			this.stopTwitterStream();
		});
	}

	startTwitterStream(hashtag: string) {
		this.stopTwitterStream();

		console.log("Starting the Twit Stream");

		this.twitStream = T.stream("statuses/filter", {
			track: `#${hashtag}` ?? "#BACKUPHASHTAG",
		});

		this.twitStream.on("tweet", tweet => {
			this.emit("tweet", tweet);
		});
	}

	stopTwitterStream() {
		console.log("Stopping the Twit Stream");

		this.twitStream?.stop();
	}
}

export default TwitterStream;
