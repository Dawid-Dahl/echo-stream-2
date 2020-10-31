import React from "react";
import styled from "styled-components";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

type Props = {
	sourceDate: string;
};

const EchoDate: React.FC<Props> = ({sourceDate}) => {
	return (
		console.log(sourceDate),
		(
			<>
				<Wrapper>{dayjs(parseInt(sourceDate)).fromNow()}</Wrapper>
			</>
		)
	);
};

export default EchoDate;

const Wrapper = styled.div``;
