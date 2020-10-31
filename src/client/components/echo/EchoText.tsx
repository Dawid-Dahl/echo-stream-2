import React from "react";
import styled from "styled-components";

type Props = {
	text: string;
};

const EchoText: React.FC<Props> = ({text}) => {
	return (
		<>
			<Wrapper>{text.length < 70 ? <h2>{text}</h2> : <p>{text}</p>}</Wrapper>
		</>
	);
};

export default EchoText;

const Wrapper = styled.div`
	color: white;
	width: 100%;

	p {
		padding: 1em 1em 0.5em 1em;
		margin: 0;
		text-align: center;
	}

	h2 {
		padding: 1em 1em 0.5em 1em;
		margin: 0;
		text-align: center;
	}
`;
