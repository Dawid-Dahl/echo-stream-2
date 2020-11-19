import express from "express";
import {EffectContainer} from "../../effectContainer";
import echoStreamGetAllController from "../controllers/echoStreamGetAllController";
import echoStreamGetController from "../controllers/echoStreamGetController";
import echoStreamStartController from "../controllers/echoStreamStartController";
import echoStreamStopController from "../controllers/echoStreamStopController";
import {removeAllStreamsFromServerState} from "../utils/serverStoreActions";

const echoStreamRouter = (effectContainer: EffectContainer) => {
	const router = express.Router();

	router.get("/get", echoStreamGetController);

	router.get("/get-all", echoStreamGetAllController);

	router.post("/start", echoStreamStartController(effectContainer));

	router.delete("/stop", echoStreamStopController);

	router.delete("/clear-server-state", (req, res) => {
		removeAllStreamsFromServerState(effectContainer.store)();

		res.status(200).send("Server state cleared.");
	});

	return router;
};

export default echoStreamRouter;
