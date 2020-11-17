import {store} from "../../main";
import {ServerEchoStream} from "./serverEchoStream";
import {removeEchoStreamFromServerState} from "./serverStoreActions";
import stopEchoStream from "./stopEchoStream";

const shutDownStreamAfterTimeout = (time: number, id: ServerEchoStream["id"]) => {
	setTimeout(async () => {
		await removeEchoStreamFromServerState(store)(id);
		await stopEchoStream(store)(id);
	}, time);
};

export default shutDownStreamAfterTimeout;
