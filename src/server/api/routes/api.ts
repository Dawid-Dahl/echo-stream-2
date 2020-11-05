import express from "express";
import redis from "redis";
import {redisClient} from "../../server";
import echoStreamRouter from "./echoStream";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res) => {
	redisClient.get("echoStreamServerState", redis.print);

	res.json("Pong");
});

apiRouter.get("/get-sid", (req, res) => res.json({sessionId: req.sessionID}));

apiRouter.use("/echo-stream", echoStreamRouter);

export default apiRouter;
