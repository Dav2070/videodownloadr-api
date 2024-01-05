export const typeDefs = `#graphql
	type Query {
		retrieveYoutubeVideoInfo(url: String!): YoutubeVideoInfo
		downloadYoutubeVideo(url: String!): YoutubeDownloadResult
	}

	type YoutubeVideoInfo {
		title: String
		thumbnailUrl: String
		channelName: String
		videoUrl: String
	}

	type YoutubeDownloadResult {
		url: String
	}
`
