import React from "react";
import styled from "styled-components";
import {stringTrimmer} from "../../../utils/utils";

type Props = {
	profileImageUrl: string | undefined;
};

//profile images get higher res if you remove _normal from the URL.

const ProfileImage: React.FC<Props> = ({profileImageUrl}) => {
	return (
		<>
			<Wrapper>
				{profileImageUrl ? (
					<img
						src={profileImageUrl && stringTrimmer("_normal", profileImageUrl)}
						alt="profile image"
					/>
				) : (
					<div></div>
				)}
			</Wrapper>
		</>
	);
};

export default ProfileImage;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1em;

	img {
		border-radius: 50%;
		height: 3em;
		width: 3em;
	}

	/* div {
		height: 300px;
		width: 300px;
		border-radius: 50%;
	} */
`;
