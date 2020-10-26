import {Request, Response} from "express-serve-static-core";
import {startEchoStream} from "../utils/startEchoStream";

const echoStreamStartController = (req: Request, res: Response) => {
	const echoStream = startEchoStream(req);

	res.status(200).send(JSON.stringify(echoStream));
};

export default echoStreamStartController;
