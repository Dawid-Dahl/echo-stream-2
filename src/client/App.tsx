import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {asyncGetAllEchoStreams} from "./actions/echoStreamActions";
import {asyncGetSessionId} from "./actions/sessionActions";
import Streams from "./components/Streams";
import StreamStarter from "./components/StreamStarter";

const App: React.FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(asyncGetSessionId());
	}, []);

	useEffect(() => {
		dispatch(asyncGetAllEchoStreams());
	}, []);

	return (
		<OuterWrapper>
			<Wrapper>
				<Header>Hello! Start an Echo Stream!</Header>
				<StreamStarter />
				<Streams />
			</Wrapper>
		</OuterWrapper>
	);
};

const OuterWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	max-width: 30em;
	margin: 0 1em;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Header = styled.h1`
	padding: 1em;
	text-align: center;

	@media only screen and (max-width: 474px) {
		font-size: 1.5em;
	}
`;

export default App;
