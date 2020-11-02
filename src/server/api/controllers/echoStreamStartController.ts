import {Request, Response} from "express-serve-static-core";
import {startEchoStream} from "../utils/startEchoStream";

const echoStreamStartController = async (req: Request, res: Response) => {
	const echoStream = await startEchoStream(req);

	if (echoStream) {
		res.status(200).json(JSON.stringify(echoStream));
	} else {
		res.status(500).json({message: "Could't start the Echo Stream"});
	}
};

export default echoStreamStartController;
