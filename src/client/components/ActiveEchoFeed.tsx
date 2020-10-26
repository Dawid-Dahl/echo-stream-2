import React, {useEffect, useState} from "react";
import styled from "styled-components";
import io from "socket.io-client";
import {useLocation} from "react-router";

const ActiveEchoFeed: React.FC = () => {
	const query = useLocation();

	const echoStreamId = query.pathname.split("/").slice(-1)[0];

	const [ioMessage, setIoMessage] = useState("");

	useEffect(() => {
		const socket = io(`${process.env.SERVER_URL}/${echoStreamId}`);

		socket.on("connect", () => {
			console.log("Socket connection opened!");

			socket.on("io-message", (data: any) => {
				console.log(data);
				setIoMessage(data.text);
			});
		});

		socket.on("disconnect", () => {
			console.log("Socket disconnected!");
		});

		return () => {
			console.log(`Closing socket: ${echoStreamId}`);
			socket.close();
		};
	}, []);

	return (
		<Wrapper>
			<p>{ioMessage}</p>
		</Wrapper>
	);
};

export default ActiveEchoFeed;

const Wrapper = styled.div``;
