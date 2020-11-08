import React from "react";
import styled from "styled-components";
import Ripples from "react-ripples";

type Props = {
	dataAttribute?: {key: string; value: string};
	title: string;
	kind: "normal" | "delete";
	type: "button" | "submit";
	onClickHandler?: (args: any) => any;
};

const Button: React.FC<Props> = ({dataAttribute, title, kind, type, onClickHandler}) => {
	return (
		<Wrapper kind={kind}>
			<Ripples>
				<button
					{...{[`data-${dataAttribute?.key}`]: dataAttribute?.value}}
					className="ripple"
					type={type}
					onClick={onClickHandler}
				>
					{title}
				</button>
			</Ripples>
		</Wrapper>
	);
};

export default Button;

type WrapperProps = Pick<Props, "kind">;

const Wrapper = styled.div<WrapperProps>`
	border-radius: var(--border-radius);
	margin: 1em;
	overflow: hidden;

	button {
		padding: 0.8em;
		border: none;
		transition: all 0.3s;
		text-align: center;
		outline: none;
		font-family: "Nunito", sans-serif;
		overflow: hidden;
		color: white;
		font-weight: bold;
		background-color: ${props =>
			props.kind === "normal" ? "var(--button-color);" : "var(--delete-color);"};
		font-size: 1em;
		border-radius: var(--border-radius);

		:hover {
			background-color: ${props =>
				props.kind === "normal"
					? "var(--button-color-hover);"
					: "var(--delete-color-hover);"};
		}
	}
`;
