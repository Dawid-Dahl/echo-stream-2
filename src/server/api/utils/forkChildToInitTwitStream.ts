import T from "../../config/twitConfig";

process.on("message", hashtag => {
	console.log(`CHILD PROCESS STARTED WITH PID: ${process.pid}`);
	console.log("MSG", hashtag);

	const twitStreamEmitter = T.stream("statuses/filter", {track: hashtag ?? "#BACKUPHASHTAG"});

	twitStreamEmitter.on("tweet", tweet => {
		//console.log("tweet", tweet);
	});
});
