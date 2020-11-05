import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router";
import styled from "styled-components";
import {RootState} from "../../store/store";
import {ValueOf} from "../../types/types";
import echoConverter from "../../utils/echoConverter";
import {twitterData} from "../../utils/twitter-data/twitterData";
import {Echo} from "../echo/Echo";
import StreamHeader from "./StreamHeader";
import WelcomeMessage from "./WelcomeMessage";
import io from "socket.io-client";

type Props = {};

const Stream: React.FC<Props> = () => {
	const query = useLocation();
	//const echoStreams = useSelector((state: RootState) => state.echoStreamReducer.echoStreams);

	const echoStreamId = query.pathname.split("/").slice(-2)[0];

	const hashtag = query.pathname.split("/").slice(-1)[0];

	const [echoes, setEchoes] = useState<Echo[]>([]);

	useEffect(() => {
		const socket = io(`${process.env.SERVER_URL}/${echoStreamId}/${hashtag}`);

		socket.on("connect", () => {
			console.log("Socket connection opened!");

			socket.on("io-message", (data: ValueOf<typeof twitterData>) => {
				setEchoes(echoes =>
					echoes.length >= 10000 ? echoes : [echoConverter("twitter", data), ...echoes]
				);
			});
		});

		socket.on("disconnect", () => {
			console.log("Socket disconnected!");
		});

		return () => {
			console.log(`Closing socket. Id: ${echoStreamId}, hashtag: ${hashtag}`);
			socket.close();
		};
	}, []);

	return (
		<Wrapper>
			<StreamHeader text="DELTA I KONVERSATIONEN PÅ TWITTER" hashtag={hashtag} />
			{echoes.length === 0 ? (
				<WelcomeMessage hashtag={hashtag} />
			) : (
				echoes.map(echo => (
					<Echo
						key={echo.id}
						text={echo.text}
						sourceId={echo.sourceId}
						sourceDate={echo.sourceDate}
						sourceLink={echo.sourceLink}
						echoLikes={echo.echoLikes}
						author={echo.author}
						authorScreenName={echo.authorScreenName}
						date={echo.date}
						platform={echo.platform}
						sourceLikesFavorites={echo.sourceLikesFavorites}
						profileImageUrl={echo.profileImageUrl}
						mediaUrl={echo.mediaUrl}
					/>
				))
			)}
		</Wrapper>
	);
};

export default Stream;

const Wrapper = styled.div`
	position: relative;
	height: 99.8vh;
	overflow: auto;
`;
