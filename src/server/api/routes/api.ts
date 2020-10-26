import express from "express";
import echoStreamRouter from "./echoStream";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res) => {
	console.log("SERVER STATE", req.app.locals.echoStreamServerState);

	res.send("Pong!");
});

apiRouter.use("/echo-stream", echoStreamRouter);

export default apiRouter;
