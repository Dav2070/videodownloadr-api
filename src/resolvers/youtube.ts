import ytdl from "ytdl-core"
import { Upload } from "@aws-sdk/lib-storage"
import { ResolverContext } from "../types.js"

export async function retrieveYoutubeVideoInfo(
	parent: any,
	args: { url: string },
	context: ResolverContext
) {
	let info = await ytdl.getBasicInfo(args.url)

	// Find the best format
	let formats = info.formats.filter(
		item => item.mimeType.includes("video/mp4") && item.url != null
	)

	let sortedFormats = formats.sort((a, b) => {
		return a.width + a.height > b.width + b.height ? -1 : 1
	})

	let url = null

	if (sortedFormats.length > 0) {
		url = sortedFormats[0].url
	}

	return {
		url
	}
}

export async function downloadYoutubeVideo(
	parent: any,
	args: { url: string },
	context: ResolverContext
) {
	let info = await ytdl.getBasicInfo(args.url)
	let fileName = `${info.videoDetails.title}.mp4`

	try {
		let upload = new Upload({
			client: context.s3,
			params: {
				Bucket: "videodownloadr",
				Key: fileName,
				ACL: "public-read",
				Body: ytdl(args.url)
			}
		})
		await upload.done()
	} catch (error) {
		console.error("Error", error)
		return { url: null }
	}

	return {
		url: `https://videodownloadr.fra1.cdn.digitaloceanspaces.com/${fileName}`
	}
}
