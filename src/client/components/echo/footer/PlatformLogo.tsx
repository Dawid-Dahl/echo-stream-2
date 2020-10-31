import React from "react";
import styled from "styled-components";
import {SocialMediaPlatforms} from "../../../types/types";
import {socialMediaIcons} from "../../../media/icons";
import {Platforms} from "../../../types/enums";

type Props = {
	platform: SocialMediaPlatforms;
	sourceLink: string | undefined;
};

const PlatformLogo: React.FC<Props> = ({platform, sourceLink}) => {
	return (
		<>
			<Wrapper>
				{platform === Platforms.twitter.toLowerCase() ? (
					<a href={sourceLink} target="_blank" rel="noopener noreferrer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="48"
							height="48"
							viewBox="0 0 172 172"
						>
							<g
								fill="none"
								fillRule="nonzero"
								stroke="none"
								strokeWidth="1"
								strokeLinecap="butt"
								strokeLinejoin="miter"
								strokeMiterlimit="10"
								strokeDasharray=""
								strokeDashoffset="0"
								fontFamily="none"
								fontWeight="none"
								fontSize="none"
								textAnchor="none"
							>
								<path d="M0,172v-172h172v172z" fill="none"></path>
								<g fill="#ffffff">
									<path d="M157.66667,28.6595c-5.59,3.31817 -16.80583,7.84033 -23.39917,9.14467c-0.1935,0.05017 -0.35117,0.11467 -0.5375,0.16483c-5.8265,-5.74767 -13.81017,-9.3095 -22.64667,-9.3095c-17.80917,0 -32.25,14.44083 -32.25,32.25c0,0.93883 -0.07883,2.666 0,3.58333c-24.02983,0 -42.31917,-12.58467 -55.43417,-28.66667c-1.42617,3.58333 -2.04967,9.245 -2.04967,14.56267c0,10.0405 7.8475,19.90183 20.06667,26.015c-2.25033,0.5805 -4.73,0.99617 -7.31,0.99617c-4.16383,0 -8.57133,-1.0965 -12.60617,-4.42183c0,0.12183 0,0.2365 0,0.3655c0,14.03233 14.89233,23.5855 28.13633,26.24433c-2.6875,1.58383 -8.1055,1.7415 -10.75,1.7415c-1.86333,0 -8.45667,-0.85283 -10.21967,-1.1825c3.68367,11.5025 16.97067,17.96683 29.63417,18.19617c-9.90433,7.76867 -16.77717,10.64967 -37.05883,10.64967h-6.90867c12.814,8.213 29.1325,14.3405 45.48683,14.3405c53.24833,0 83.51317,-40.58483 83.51317,-78.8405c0,-0.61633 -0.01433,-1.90633 -0.03583,-3.2035c0,-0.129 0.03583,-0.25083 0.03583,-0.37983c0,-0.1935 -0.05733,-0.37983 -0.05733,-0.57333c-0.0215,-0.97467 -0.043,-1.88483 -0.0645,-2.35783c5.66167,-4.085 10.57083,-9.1805 14.45517,-14.9855c-5.19583,2.30767 -10.7715,3.85567 -16.62667,4.558c5.977,-3.58333 14.4695,-12.126 16.62667,-18.89133z"></path>
								</g>
							</g>
						</svg>
					</a>
				) : platform === Platforms.instagram.toLowerCase() ? (
					<a href={sourceLink} target="_blank" rel="noopener noreferrer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="24"
							height="24"
							viewBox="0 0 172 172"
						>
							<g
								fill="none"
								fillRule="nonzero"
								stroke="none"
								strokeWidth="1"
								strokeLinecap="butt"
								strokeLinejoin="miter"
								strokeMiterlimit="10"
								strokeDasharray=""
								strokeDashoffset="0"
								fontFamily="none"
								fontWeight="none"
								fontSize="none"
								textAnchor="none"
							>
								<path d="M0,172v-172h172v172z" fill="none"></path>
								<g fill="#ffffff">
									<path d="M57.33333,21.5c-19.78717,0 -35.83333,16.04617 -35.83333,35.83333v57.33333c0,19.78717 16.04617,35.83333 35.83333,35.83333h57.33333c19.78717,0 35.83333,-16.04617 35.83333,-35.83333v-57.33333c0,-19.78717 -16.04617,-35.83333 -35.83333,-35.83333zM129,35.83333c3.956,0 7.16667,3.21067 7.16667,7.16667c0,3.956 -3.21067,7.16667 -7.16667,7.16667c-3.956,0 -7.16667,-3.21067 -7.16667,-7.16667c0,-3.956 3.21067,-7.16667 7.16667,-7.16667zM86,50.16667c19.78717,0 35.83333,16.04617 35.83333,35.83333c0,19.78717 -16.04617,35.83333 -35.83333,35.83333c-19.78717,0 -35.83333,-16.04617 -35.83333,-35.83333c0,-19.78717 16.04617,-35.83333 35.83333,-35.83333zM86,64.5c-11.87412,0 -21.5,9.62588 -21.5,21.5c0,11.87412 9.62588,21.5 21.5,21.5c11.87412,0 21.5,-9.62588 21.5,-21.5c0,-11.87412 -9.62588,-21.5 -21.5,-21.5z"></path>
								</g>
							</g>
						</svg>
					</a>
				) : Platforms.facebook.toLowerCase() ? (
					""
				) : (
					""
				)}
			</Wrapper>
		</>
	);
};

export default PlatformLogo;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1em;

	img {
		color: red;
	}
`;
