import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import { makeExecutableSchema } from "@graphql-tools/schema"
import express from "express"
import http from "http"
import cors from "cors"
import { S3Client } from "@aws-sdk/client-s3"
import { Dav, Environment } from "dav-js"
import { typeDefs } from "./src/typeDefs.js"
import { resolvers } from "./src/resolvers.js"
import "dotenv/config"

const port = process.env.PORT || 4020
const app = express()
const httpServer = http.createServer(app)

let schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

const s3Client = new S3Client({
	endpoint: "https://fra1.digitaloceanspaces.com",
	forcePathStyle: false,
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
		secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY
	}
})

const server = new ApolloServer({
	schema,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

await server.start()

// Init dav
let environment = Environment.Development

switch (process.env.ENVIRONMENT) {
	case "production":
		environment = Environment.Production
		break
	case "staging":
		environment = Environment.Staging
		break
}

new Dav({
	environment,
	server: true
})

app.use(
	"/",
	cors<cors.CorsRequest>(),
	express.json({ type: "application/json", limit: "50mb" }),
	expressMiddleware(server, {
		context: async ({ req }) => {
			return {
				s3: s3Client
			}
		}
	})
)

await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
console.log(`🚀 Server ready at http://localhost:${port}/`)

BigInt.prototype["toJSON"] = function () {
	return this.toString()
}
