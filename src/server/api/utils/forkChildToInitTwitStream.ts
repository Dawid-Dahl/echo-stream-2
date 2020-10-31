import T from "../../config/twitConfig";

process.on("message", hashtag => {
	console.log(`CHILD PROCESS STARTED WITH PID: ${process.pid}`);

	const twitStreamEmitter = T.stream("statuses/filter", {track: hashtag ?? "#BACKUPHASHTAG"});

	twitStreamEmitter.on("tweet", tweet => {
		process.send!(tweet);
	});
});
