import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {SocialMediaPlatforms} from "../../types/types";
import {Link} from "react-router-dom";

export type Echo = {
	id: string;
	text: string;
	likes: number;
	author: string;
	date: Date | string;
	imageUrl?: string | null;
	profileImageUrl?: string | null;
	platform: SocialMediaPlatforms;
};

type Props = {
	hashtag: string | null;
};

const WelcomeMessage: React.FC<Props> = ({hashtag}) => {
	return hashtag ? (
		<Wrapper>
			<h2>Welcome to the event!</h2>
			<h3>See your message displayed here by posting to the hashtag:</h3>
			<h1>{`${hashtag}`}</h1>
		</Wrapper>
	) : (
		<Wrapper>
			<h2>No Echo Stream could be found!</h2>
			<h3>
				Click <Link to="/">here</Link> to go back to the dashboard.
			</h3>
		</Wrapper>
	);
};

export default WelcomeMessage;

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
