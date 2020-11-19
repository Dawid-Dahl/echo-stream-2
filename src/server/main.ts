import {server} from "./server";
import io from "socket.io";
import effectContainer from "./effectContainer";

const app = server(effectContainer);

const PORT = process.env.PORT || 5000;

const expressServer = app.listen(PORT, () => console.log(`Server now listening at port: ${PORT}`));

export const ioServer = io.listen(expressServer);
