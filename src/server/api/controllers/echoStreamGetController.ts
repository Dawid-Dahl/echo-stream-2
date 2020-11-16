import {Request, Response} from "express-serve-static-core";
import {store} from "../../server";
import {clientEchoStream} from "../utils/clientEchoStream";
import {getEchoStreamServerState} from "../utils/serverStoreActions";

const echoStreamGetController = async (req: Request, res: Response) => {
	try {
		const echoStreamId = req.query.id as string;

		const echoStreamServerState = await getEchoStreamServerState(store)();

		if (echoStreamServerState) {
			const foundEchoStream = echoStreamServerState.find(
				echoStream => echoStream.id === echoStreamId
			);

			if (foundEchoStream) {
				const {id, hashtag, creator, active} = foundEchoStream;

				res.status(200).json(
					JSON.stringify(
						clientEchoStream(id, hashtag, creator, active, new Date(Date.now()))
					)
				);
			} else {
				res.status(404).json({message: "Couldn't find the echo stream"});
			}
		} else {
			res.status(500).json({message: "Couldn't get the echo stream server state"});
		}
	} catch (e) {
		console.log(e);
	}
};

export default echoStreamGetController;
