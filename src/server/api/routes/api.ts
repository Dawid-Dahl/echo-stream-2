import express from "express";
import redis from "redis";
import {redisClient} from "../../server";
import echoStreamRouter from "./echoStream";

const apiRouter = express.Router();

apiRouter.get("/ping", (req, res) => {
	redisClient.get("echoStreamServerState", redis.print);

	res.send("Pong!");
});

apiRouter.use("/echo-stream", echoStreamRouter);

export default apiRouter;
