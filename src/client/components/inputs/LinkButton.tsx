import React from "react";
import styled from "styled-components";
import Ripples from "react-ripples";
import {Link} from "react-router-dom";

type Props = {
	dataAttribute?: {key: string; value: string};
	title: string;
	kind: "normal" | "delete";
	onClick?: () => void;
	linkTo: string;
};

const LinkButton: React.FC<Props> = ({dataAttribute, title, kind, linkTo, onClick}) => {
	return (
		<Wrapper kind={kind}>
			<Ripples>
				<Link to={linkTo} onClick={onClick}>
					<StyledDiv kind={kind}>{title}</StyledDiv>
				</Link>
			</Ripples>
		</Wrapper>
	);
};

export default LinkButton;

type WrapperProps = {
	kind: "normal" | "delete";
};

const Wrapper = styled.div<WrapperProps>`
	overflow: hidden;
	border-radius: var(--border-radius);
	margin: 1em;

	a {
		text-decoration: none;
	}
`;

type StyledProps = {
	kind: "normal" | "delete";
};

const StyledDiv = styled.div<StyledProps>`
	padding: 0.8em;
	border: none;
	transition: all 0.3s;
	text-align: center;
	font-family: "Nunito", sans-serif;
	outline: none;
	overflow: hidden;
	color: white;
	font-weight: bold;
	background-color: ${props =>
		props.kind === "normal" ? "var(--button-color);" : "var(--delete-color);"};
	font-size: 1em;

	:hover {
		background-color: ${props =>
			props.kind === "normal" ? "var(--button-color-hover);" : "var(--delete-color-hover);"};
	}
`;
