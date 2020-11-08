import express from "express";
import apiRouter from "./api/routes/api";
import "dotenv/config";
import cors from "cors";
import errorhandler from "errorhandler";
import morgan from "morgan";
import io from "socket.io";
import redis from "redis";
import session from "express-session";
import TwitterStream from "./api/utils/TwitterStream";
import path from "path";

export const app = express();

const PORT = process.env.PORT || 5000;

const RedisStore = require("connect-redis")(session);

if (!process.env.REDIS_URL) {
	throw new Error("REDIS_URL not found.");
}

export const redisClient = redis.createClient(process.env.REDIS_URL);

app.use(
	session({
		store: new RedisStore({client: redisClient}),
		secret: process.env.SESSION_STORE_SECRET as string,
		saveUninitialized: true,
		resave: false,
	})
);

app.use(function (req, res, next) {
	if (!req.session) {
		return next(new Error("Couldn't start a session. Is Redis server active?"));
	}
	next();
});
app.use(express.json());
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("dist/client"));

	app.get("/*", (req, res) => {
		res.sendFile("dist/client/index.html");
	});
}

redisClient.set("echoStreamServerState", JSON.stringify([]));

app.use("/api", apiRouter);

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
	app.use(errorhandler());
}

const server = app.listen(PORT, () => console.log(`Server now listening at port: ${PORT}`));

export const twitterStream = new TwitterStream();

export const ioServer = io.listen(server);
