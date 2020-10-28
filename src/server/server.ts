import express from "express";
import apiRouter from "./api/routes/api";
import "dotenv/config";
import cors from "cors";
import errorhandler from "errorhandler";
import morgan from "morgan";
import io from "socket.io";
import redis from "redis";
import session from "express-session";

export const app = express();

const PORT = process.env.PORT || 5000;

const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

app.use(
	session({
		store: new RedisStore({client: redisClient}),
		secret: "8374639847563",
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
app.use(cors());
app.use(morgan("dev"));

//holding state for echoStream child processes.
app.locals.echoStreamServerState = [];

app.use("/api", apiRouter);

if (process.env.NODE_ENV === "development") {
	app.use(errorhandler());
}

const server = app.listen(PORT, () => console.log(`Server now listening at port: ${PORT}`));

export const ioServer = io.listen(server);
