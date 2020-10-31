import React from "react";
import styled from "styled-components";

type Props = {
	author: string;
	authorScreenName: string;
};

const ProfileName: React.FC<Props> = ({author, authorScreenName}) => {
	return (
		<>
			<Wrapper>
				<p>{`${author} (${authorScreenName})`}</p>
			</Wrapper>
		</>
	);
};

export default ProfileName;

const Wrapper = styled.div`
	p {
		margin: 0;
	}
`;
