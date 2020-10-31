import {SocialMediaPlatforms, ValueOf} from "../types/types";
import {Echo} from "../components/echo/Echo";
import echo, {defaultEcho} from "../entities/echo";
import {getMediaUrl} from "./getMediaUrl";
import {twitterData} from "./twitter-data/twitterData";
import {constructTwitterUrl} from "./utils";
import {DefaultEcho} from "../entities/echoTypes";

const echoConverter = (
	platform: SocialMediaPlatforms,
	data: ValueOf<typeof twitterData>
): Echo | DefaultEcho => {
	if (platform === "twitter") {
		try {
			const media_url = getMediaUrl(platform, data);

			const {id_str, text, timestamp_ms, favorite_count} = data.tweet;
			const {name, screen_name, profile_image_url} = data.tweet.user;
			return echo.create({
				sourceId: id_str,
				text: text ?? "",
				author: name,
				authorScreenName: screen_name,
				sourceDate: timestamp_ms,
				sourceLikesFavorites: favorite_count,
				profileImageUrl: profile_image_url,
				sourceLink: constructTwitterUrl(screen_name, id_str),
				echoLikes: 0,
				platform: platform,
				mediaUrl: media_url,
			});
		} catch (e) {
			console.log(e);
			return defaultEcho as DefaultEcho;
		}
	} else {
		console.log("No platform selected");
		return defaultEcho as DefaultEcho;
	}
};

export default echoConverter;
