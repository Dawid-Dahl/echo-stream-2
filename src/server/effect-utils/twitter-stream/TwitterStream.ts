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

	startTwitterStream(hashtag: string[]) {
		console.log("Starting the Twit Stream");

		this.twitStream = T.stream("statuses/filter", {
			track: hashtag.map(hashtag => `#${hashtag}`),
		});

		this.twitStream.on("tweet", tweet => {
			this.emit("tweet", tweet);
		});
	}

	stopTwitterStream() {
		if (!this.twitStream) {
			throw new Error("No twitter stream is active!");
		} else {
			console.log("Stopping the Twit Stream");

			this.twitStream.stop();
		}
	}

	shutDownAndCleanUpAfterEchoStream = () => {
		if (this.twitStream) {
			this.stopTwitterStream();
			this.removeAllListeners();
		} else {
			console.log("Twitter stream is not active, no need to shut down anything.");
		}
	};
}

export default TwitterStream;
