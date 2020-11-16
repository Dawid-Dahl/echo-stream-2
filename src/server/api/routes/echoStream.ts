import express from "express";
import {store} from "../../server";
import echoStreamGetAllController from "../controllers/echoStreamGetAllController";
import echoStreamGetController from "../controllers/echoStreamGetController";
import echoStreamStartController from "../controllers/echoStreamStartController";
import echoStreamStopController from "../controllers/echoStreamStopController";
import {removeAllStreamsFromServerState} from "../utils/serverStoreActions";

const echoStreamRouter = express.Router();

echoStreamRouter.get("/get", echoStreamGetController);

echoStreamRouter.get("/get-all", echoStreamGetAllController);

echoStreamRouter.post("/start", echoStreamStartController);

echoStreamRouter.delete("/stop", echoStreamStopController);

echoStreamRouter.delete("/clear-server-state", (req, res) => {
	removeAllStreamsFromServerState(store)();

	res.status(200).send("Server state cleared.");
});

export default echoStreamRouter;
