import express from "express";
import echoStreamStartController from "../controllers/echoStreamStartController";
import echoStreamStopController from "../controllers/echoStreamStopController";
import {killAllChildProcesses, removeAllStreamsFromServerState} from "../utils/util";

const echoStreamRouter = express.Router();

echoStreamRouter.get("/", (req, res) => {
	res.send("Hello, you!");
});

echoStreamRouter.post("/start", echoStreamStartController);

echoStreamRouter.delete("/stop", echoStreamStopController);

echoStreamRouter.delete("/clear-server-state", (req, res) => {
	removeAllStreamsFromServerState(req);

	killAllChildProcesses(req);

	res.status(200).send("Server state cleared.");
});

export default echoStreamRouter;
