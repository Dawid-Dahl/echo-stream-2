import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

type Props = {};

const OfflineMessage: React.FC<Props> = () => {
	return (
		<Wrapper>
			<h2>This Echo Stream is no longer active!</h2>
			<h3>
				Click <Link to="/">here</Link> to go back to the dashboard.
			</h3>
		</Wrapper>
	);
};

export default OfflineMessage;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 1em;
	padding: 1em;
	color: black;
	h1 {
		margin: 0.4em;
		text-align: center;
	}
	h2 {
		margin: 0.4em;
		text-align: center;
	}
	h3 {
		margin: 0.4em;
		text-align: center;
	}
`;
