import * as youtubeResolvers from "./resolvers/youtube.js"

export const resolvers = {
	Query: {
		hello: () => {
			return {
				test: "Hello World"
			}
		}
	}
}
