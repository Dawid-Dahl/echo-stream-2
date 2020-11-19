import express from "express";
import apiRouter from "./api/routes/api";
import "dotenv/config";
import cors from "cors";
import errorhandler from "errorhandler";
import morgan from "morgan";
import session from "express-session";
import path from "path";
import {EffectContainer} from "./effectContainer";

export const server = (effectContainer: EffectContainer) => {
	const {store, redisClient} = effectContainer;

	const app = express();

	const RedisStore = require("connect-redis")(session);

	if (!process.env.REDIS_URL) {
		throw new Error("REDIS_URL not found.");
	}

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
		app.use(express.static(path.join(__dirname, "..", "client")));

		app.get(/^\/(?!api).*/, (req, res) => {
			res.sendFile(path.join(__dirname, "..", "client", "index.html"));
		});
	}

	store.write("echoStreamServerState", JSON.stringify([]));

	app.use("/api", apiRouter(effectContainer));

	if (process.env.NODE_ENV === "development") {
		app.use(morgan("dev"));
		app.use(errorhandler());
	}

	if (process.env.NODE_ENV !== "test") {
	}

	process.on("uncaughtException", err => {
		console.log("uncaught exception occurred");
		console.log(err);
	});

	return app;
};
