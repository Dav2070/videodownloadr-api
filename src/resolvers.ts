import * as youtubeResolvers from "./resolvers/youtube.js"

export const resolvers = {
	Query: {
		retrieveYoutubeVideoInfo: youtubeResolvers.retrieveYoutubeVideoInfo,
		downloadYoutubeVideo: youtubeResolvers.downloadYoutubeVideo
	}
}
