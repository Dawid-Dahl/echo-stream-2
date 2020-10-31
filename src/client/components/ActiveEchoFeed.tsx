import React, {useEffect, useState} from "react";
import styled from "styled-components";
import io from "socket.io-client";
import {useLocation} from "react-router";

const ActiveEchoFeed: React.FC = () => {
	const query = useLocation();

	const echoStreamId = query.pathname.split("/").slice(-1)[0];

	const [tweet, setTweet] = useState("");

	useEffect(() => {
		const socket = io(`${process.env.SERVER_URL}/${echoStreamId}`);

		socket.on("connect", () => {
			console.log("Socket connection opened!");

			socket.on("io-message", (data: any) => {
				console.log(data);
				setTweet(data);
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
			<p>{tweet}</p>
		</Wrapper>
	);
};

export default ActiveEchoFeed;

const Wrapper = styled.div``;
