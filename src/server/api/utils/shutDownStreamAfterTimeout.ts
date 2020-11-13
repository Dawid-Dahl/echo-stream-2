import {ServerEchoStream} from "./serverEchoStream";

const shutDownStreamAfterTimeout = (time: number, id: ServerEchoStream["id"]) => {
	setTimeout(() => {}, time);
};

export default shutDownStreamAfterTimeout;
