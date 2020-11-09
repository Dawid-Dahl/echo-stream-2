import React from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {asyncRemoveEchoStream} from "../actions/echoStreamActions";
import Button from "./inputs/Button";
import LinkButton from "./inputs/LinkButton";

type Props = {
	id: string;
	hashtag: string;
	creator: string;
	active: boolean;
	createdAt: Date;
};

const EchoStream: React.FC<Props> = ({id, hashtag}) => {
	const dispatch = useDispatch();

	const onRemoveHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		const echoStreamId = e.currentTarget.dataset["echostreamId"];

		dispatch(asyncRemoveEchoStream(echoStreamId));
	};

	return (
		<>
			<Wrapper data-id={id}>
				<p>{`#${hashtag}`}</p>
				<ButtonWrapper>
					<LinkButton
						dataAttribute={{key: "echostream-id", value: id}}
						title="Go!"
						linkTo={`/streams/${id}/${hashtag}`}
						kind="normal"
					/>
					<Button
						dataAttribute={{key: "echostream-id", value: id}}
						title="Remove"
						kind="delete"
						type="button"
						onClickHandler={onRemoveHandler}
					/>
				</ButtonWrapper>
			</Wrapper>
		</>
	);
};

export default EchoStream;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	margin: 0.5em 0 0.5em 0;
	width: 100%;
	border-radius: var(--border-radius);
	background-color: var(--main-color);
	color: white;

	p {
		font-size: 1.5em;
		text-align: center;
		margin: 1em;
		font-weight: 700;
	}

	@media only screen and (max-width: 427px) {
		display: block;

		p {
			margin: 0.3em 0 0 0;
		}
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	@media only screen and (max-width: 427px) {
		justify-content: space-evenly;
	}
`;
