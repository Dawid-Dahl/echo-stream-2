import React, {useState} from "react";
import styled from "styled-components";
import Button from "./inputs/Button";
import {useDispatch} from "react-redux";
import {asyncAddEchoStream} from "../actions/echoStreamActions";
import {removeHashtagAndSpacesFromString} from "../utils/utils";

const StreamStarter: React.FC = () => {
	const dispatch = useDispatch();

	const [hashtag, setHashtag] = useState("");

	const handleClick = (e: React.FormEvent) => {
		e.preventDefault();

		if (hashtag.length === 0) {
			alert("Choose a hashtag first!");
			return;
		}

		dispatch(asyncAddEchoStream(removeHashtagAndSpacesFromString(hashtag)));
		setHashtag("");
	};

	return (
		<>
			<StyledForm onSubmit={handleClick}>
				<input
					type="text"
					name="hashtag"
					placeholder="Hashtag?"
					value={hashtag}
					onChange={e => setHashtag(e.target.value)}
				/>
				<Button title="Start Stream!" kind="normal" type="submit" />
			</StyledForm>
		</>
	);
};

export default StreamStarter;

const StyledForm = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-wrap: wrap;
	margin-bottom: 2em;
	width: 100%;
	border-radius: var(--border-radius);
	background-color: var(--main-color);

	input {
		padding: 1em;
		margin: 1em;
		min-width: 80px;
		border-radius: var(--border-radius);
		border: none;
		outline: none;
		font-size: 1em;

		@media only screen and (max-width: 427px) {
			width: 70%;
			margin: 1em 1em 0 1em;
		}
	}
`;
