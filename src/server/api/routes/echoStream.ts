import express from "express";
import {redisClient} from "../../server";
import echoStreamStartController from "../controllers/echoStreamStartController";
import echoStreamStopController from "../controllers/echoStreamStopController";
import {removeAllStreamsFromServerState} from "../utils/util";

const echoStreamRouter = express.Router();

echoStreamRouter.post("/start", echoStreamStartController);

echoStreamRouter.delete("/stop", echoStreamStopController);

echoStreamRouter.delete("/clear-server-state", (req, res) => {
	removeAllStreamsFromServerState(redisClient)();

	res.status(200).send("Server state cleared.");
});

export default echoStreamRouter;
