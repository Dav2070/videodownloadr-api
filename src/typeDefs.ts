export const typeDefs = `#graphql
	type Query {
		retrieveYoutubeVideoInfo(url: String!): YoutubeVideoInfo
		downloadYoutubeVideo(url: String!): YoutubeDownloadResult
	}

	type YoutubeVideoInfo {
		url: String
	}

	type YoutubeDownloadResult {
		url: String
	}
`
