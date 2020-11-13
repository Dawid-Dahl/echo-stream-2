import Twit from "twit";
import {config} from "dotenv";

config({
	path: ".env",
});

const T = new Twit({
	consumer_key: process.env.TWITTER_API_KEY ?? "",
	consumer_secret: process.env.TWITTER_API_SECRET_KEY ?? "",
	access_token: process.env.TWITTER_ACCESS_TOKEN ?? "",
	access_token_secret: process.env.TWITTER_TOKEN_SECRET ?? "",
	timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
});

export default T;
