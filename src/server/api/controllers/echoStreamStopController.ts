import {ParamsDictionary, Request, Response} from "express-serve-static-core";
import QueryString from "qs";
import {killChildProcess, removeStreamFromServerState} from "../utils/util";

const echoStreamStopController = (
	req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>,
	res: Response<any, number>
) => {
	const echoStreamId = req.body.id as string;

	killChildProcess(req, echoStreamId);

	removeStreamFromServerState(req, echoStreamId);

	res.status(200).json({echoStreamId});
};

export default echoStreamStopController;
