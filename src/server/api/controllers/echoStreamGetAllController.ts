import {Request, Response} from "express-serve-static-core";
import {redisClient} from "../../server";
import {clientEchoStream} from "../utils/clientEchoStream";
import {getEchoStreamServerState} from "../utils/redisActions";

const echoStreamGetAllController = async (req: Request, res: Response) => {
	try {
		const echoStreamServerState = await getEchoStreamServerState(redisClient)();

		if (echoStreamServerState) {
			const echoStreamClientState = echoStreamServerState.map(
				({id, hashtag, creator, active}) =>
					clientEchoStream(id, hashtag, creator, active, new Date(Date.now()))
			);

			if (echoStreamClientState) {
				res.status(200).json(JSON.stringify(echoStreamClientState));
			} else {
				res.status(500).json({message: "Couldn't get the echo stream server state"});
			}
		} else {
			res.status(500).json({message: "Couldn't get the echo stream server state"});
		}
	} catch (e) {
		console.log(e);
	}
};

export default echoStreamGetAllController;
