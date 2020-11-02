import T from "../../config/twitConfig";

process.on("message", hashtag => {
	try {
		console.log(`CHILD PROCESS STARTED WITH PID: ${process.pid}`);

		const twitStreamEmitter = T.stream("statuses/filter", {
			track: `#${hashtag}` ?? "#BACKUPHASHTAG",
		});

		twitStreamEmitter.on("tweet", tweet => {
			console.log("TWEET: ", tweet);
			process.send!(tweet);
		});
	} catch (e) {
		console.error(e);
	}
});
