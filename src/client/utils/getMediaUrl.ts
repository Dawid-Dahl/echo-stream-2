import * as R from "rambda";
import {SocialMediaPlatforms} from "../types/types";
import {
	TwitterMedia,
	TwitterMediaVideo,
	TwitterMediaPhoto,
	TwitterMediaGif,
} from "./twitter-data/twitterData";

type UrlExtractor = (data: any) => string | undefined;

type GetMediaUrlConfig = {
	twitter?: UrlExtractor[] | [];
	instagram?: UrlExtractor[] | [];
	facebook?: UrlExtractor[] | [];
};

const config = {
	twitter: [
		//check for the presence of "extended_tweet"
		(data: any) =>
			R.view<any, string | undefined>(
				R.lensPath(["tweet", "extended_tweet", "entities", "media", 0, "media_url"]),
				data
			),
		//own uploaded photo or video
		(data: any) => {
			try {
				const extendedMedia = R.view<any, TwitterMedia | undefined>(
					R.lensPath(["tweet", "extended_entities", "media"]),
					data
				);

				if (!extendedMedia) return;

				return extendedMedia[0].type === "video"
					? (extendedMedia[0] as TwitterMediaVideo).video_info.variants.find(
							variant => variant.bitrate === 2176000
					  )?.url
					: extendedMedia[0].type === "photo"
					? (extendedMedia[0] as TwitterMediaPhoto).media_url
					: extendedMedia[0].type === "animated_gif"
					? (extendedMedia[0] as TwitterMediaGif).video_info.variants.find(
							variant => variant.bitrate === 0
					  )?.url
					: undefined;
			} catch (e) {
				return;
			}
		},
		//linked image or Youtube video
		/* (data: any) =>
			R.view<any, string | undefined>(
				R.lensPath(["tweet", "entities", "urls", 0, "expanded_url"]),
				data
			), */
	],
	instagram: [],
	facebook: [],
};

export const getMediaUrlUnconfigured = (config: GetMediaUrlConfig) => (
	platform: SocialMediaPlatforms,
	data: any
): string | undefined => {
	const urlExtractor = config[platform]?.find(urlExtractor => urlExtractor(data));
	return urlExtractor && urlExtractor(data);
};

export const getMediaUrl = getMediaUrlUnconfigured(config);
