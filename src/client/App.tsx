import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {asyncRemoveAllEchoStreams} from "./actions/echoStreamActions";
import Streams from "./components/Streams";
import StreamStarter from "./components/StreamStarter";
import {RootState} from "./store/store";

const App: React.FC = () => {
	const echoStreamReducer = useSelector(
		(state: RootState) => state.echoStreamReducer.echoStreams
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			if (echoStreamReducer.length === 0) {
				dispatch(asyncRemoveAllEchoStreams());
			}
		} else {
			//fetch active stream info from server and add to client state
		}
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
`;

export default App;
