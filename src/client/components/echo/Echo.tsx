import React from "react";
import styled from "styled-components";
import {SocialMediaPlatforms} from "../../types/types";
import EchoMedia from "./EchoMedia";
import EchoText from "./EchoText";
import EchoFooter from "./footer/EchoFooter";

export type Echo = Readonly<{
	id: string;
	sourceId: string;
	text: string;
	echoLikes: number;
	sourceLikesFavorites: number;
	author: string;
	authorScreenName: string;
	date: number;
	sourceDate: string;
	sourceLink: string | undefined;
	mediaUrl: string | undefined;
	profileImageUrl: string | undefined;
	platform: SocialMediaPlatforms;
}>;

type Props = Omit<Echo, "id">;

const Echo: React.FC<Props> = ({
	text,
	mediaUrl,
	author,
	date,
	authorScreenName,
	profileImageUrl,
	sourceDate,
	platform,
	sourceLink,
}) => {
	return (
		<Wrapper>
			<EchoMedia mediaUrl={mediaUrl} sourceLink={sourceLink} />
			<EchoText text={text} />
			<EchoFooter
				date={date}
				author={author}
				authorScreenName={authorScreenName}
				profileImageUrl={profileImageUrl}
				sourceDate={sourceDate}
				sourceLink={sourceLink}
				platform={platform}
			/>
		</Wrapper>
	);
};

export default Echo;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 1em;
	border-radius: var(--border-radius);
	background-color: var(--main-grey-color);
	overflow: hidden;
`;
