/* import React from "react";
import styled from "styled-components";
import StreamHeader from "./StreamHeader";

type Props = {};

const Stream: React.FC<Props> = () => {
	return (
		<Wrapper>
			<StreamHeader text="DELTA I KONVERSATIONEN PÅ TWITTER" hashtag={hashtag} />
			{echoes.length === 0 ? (
				<WelcomeMessage hashtag={hashtag} />
			) : (
				echoes.map(echo => (
					<Echo
						key={echo.id}
						text={echo.text}
						sourceId={echo.sourceId}
						sourceDate={echo.sourceDate}
						sourceLink={echo.sourceLink}
						echoLikes={echo.echoLikes}
						author={echo.author}
						authorScreenName={echo.authorScreenName}
						date={echo.date}
						platform={echo.platform}
						sourceLikesFavorites={echo.sourceLikesFavorites}
						profileImageUrl={echo.profileImageUrl}
						mediaUrl={echo.mediaUrl}
					/>
				))
			)}
		</Wrapper>
	);
};

export default Stream;

const Wrapper = styled.div`
	position: relative;
	height: 99.8vh;
	overflow: auto;
`;
 */
