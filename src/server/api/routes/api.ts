import express from "express";
import echoStreamRouter from "./echoStream";
import util from "util";
import {getEchoStreamServerState} from "../utils/serverStoreActions";
import {store} from "../../server";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res) => res.json("Pong"));

apiRouter.get("/log-server-state", async (req, res) => {
	try {
		const echoStreamServerState = await getEchoStreamServerState(store)();

		if (echoStreamServerState) {
			console.log(`Number of active streams: ${echoStreamServerState.length}`);
			console.log(
				`Echo Stream Server State: ${util.inspect(echoStreamServerState, false, null)}`
			);

			res.status(200).json(
				JSON.stringify({
					activeStreamNumber: echoStreamServerState.length,
					serverState: echoStreamServerState,
				})
			);

			return;
		} else {
			res.status(404).send("Couldn't find any echo streams.");
		}
	} catch (e) {
		console.error(e);
		res.status(500).send("Couldn't access the server state.");
	}
});

apiRouter.get("/get-sid", (req, res) => res.json({sessionId: req.sessionID}));

apiRouter.use("/echo-stream", echoStreamRouter);

export default apiRouter;
