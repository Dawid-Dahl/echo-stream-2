import React from "react";
import styled from "styled-components";
import {SocialMediaPlatforms} from "../../../types/types";
import PlatformLogo from "./PlatformLogo";
import EchoDate from "./EchoDate";
import ProfileName from "./ProfileName";
import ProfileImage from "./ProfileImage";

type Props = {
	author: string;
	authorScreenName: string;
	profileImageUrl: string | undefined;
	sourceDate: string;
	sourceLink: string | undefined;
	platform: SocialMediaPlatforms;
	date: number;
};

const EchoFooter: React.FC<Props> = ({
	author,
	authorScreenName,
	profileImageUrl,
	sourceDate,
	sourceLink,
	platform,
}) => {
	return (
		<>
			<Wrapper>
				<div>
					<ProfileImage sourceLink={sourceLink} profileImageUrl={profileImageUrl} />
					<div>
						<ProfileName author={author} authorScreenName={authorScreenName} />
						<EchoDate sourceDate={sourceDate} />
					</div>
				</div>
				<div>
					<PlatformLogo platform={platform} sourceLink={sourceLink} />
				</div>
			</Wrapper>
		</>
	);
};

export default EchoFooter;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 4em;
	width: 100%;
	color: white;

	> :nth-child(1) {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	> :nth-child(2) {
		display: flex;
		/* align-items: center; */
		justify-content: center;
	}
`;
