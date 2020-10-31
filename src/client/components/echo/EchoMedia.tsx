import React from "react";
import styled from "styled-components";

type Props = {
	mediaUrl: string | undefined;
	sourceLink: string | undefined;
};

const EchoMedia: React.FC<Props> = ({mediaUrl, sourceLink}) => {
	const isVideo = mediaUrl ? Boolean(mediaUrl.match(/video.twimg.com/)) : false;

	return (
		<>
			<Wrapper>
				{isVideo ? (
					<video src={mediaUrl} controls loop autoPlay={true} muted></video>
				) : mediaUrl ? (
					<a href={sourceLink} target="_blank" rel="noopener noreferrer">
						<img src={mediaUrl} alt="media image" />
					</a>
				) : (
					<div></div>
				)}
			</Wrapper>
		</>
	);
};

export default EchoMedia;

const Wrapper = styled.div`
	width: 100%;

	img {
		width: 100%;
		max-height: 25em;
		object-fit: cover;
		cursor: pointer;
	}

	video {
		width: 100%;
		max-height: 25em;
		object-fit: cover;
		cursor: pointer;
	}
`;
