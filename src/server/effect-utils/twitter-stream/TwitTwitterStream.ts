import {EventEmitter} from "events";
import Twit from "twit";
import {
	IShutDownAndCleanUpAfterEchoStream,
	IStartTwitterStream,
	IStopTwitterStream,
} from "../../types/interfaces";

class TwitTwitterStream
	extends EventEmitter
	implements IStartTwitterStream, IStopTwitterStream, IShutDownAndCleanUpAfterEchoStream {
	private twitterLib: Twit | null;
	private twitStream: Twit.Stream | null;

	constructor(twitterLib: Twit | null = null) {
		super();
		this.twitterLib = twitterLib ? twitterLib : null;
		this.twitStream = null;

		this.on("stopTwitStream", () => {
			this.stopTwitterStream();
		});
	}

	startTwitterStream(hashtag: string[]) {
		try {
			if (this.twitterLib) {
				console.log("Starting the Twit Stream");

				this.twitStream = this.twitterLib.stream("statuses/filter", {
					track: hashtag.map(hashtag => `#${hashtag}`),
				});

				this.twitStream.on("tweet", tweet => {
					this.emit("tweet", tweet);
				});
			} else {
				console.log(
					"No Twitter Library is used. Inject it when constructing the TwitTwitterStream."
				);
			}
		} catch (e) {
			console.log(e);
		}
	}

	stopTwitterStream() {
		if (!this.twitStream) {
			console.log("No twitter stream is active!");

			return;
		} else {
			console.log("Stopping the Twit Stream");

			this.twitStream.stop();
			this.twitStream = null;
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

export default TwitTwitterStream;
