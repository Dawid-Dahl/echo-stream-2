import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import EchoStream from "./EchoStream";

const Streams: React.FC = () => {
	const {echoStreams} = useSelector((state: RootState) => state.echoStreamReducer);
	const sessionId = useSelector((state: RootState) => state.sessionReducer.sessionId);

	return (
		<Wrapper>
			{echoStreams.map(
				({id, hashtag, creator, active, createdAt}) =>
					creator === sessionId && (
						<EchoStream
							key={id}
							id={id}
							hashtag={hashtag}
							creator={creator}
							active={active}
							createdAt={createdAt}
						/>
					)
			)}
		</Wrapper>
	);
};

export default Streams;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border-radius: 15px;
	padding: 1em;
	border: 5px var(--super-light-grey-color) solid;
	width: 100%;

	@media only screen and (max-width: 520px) {
		border: none;
		border-top: 5px var(--super-light-grey-color) solid;
		border-radius: 0;
	}
`;
