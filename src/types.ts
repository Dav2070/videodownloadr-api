import { S3Client } from "@aws-sdk/client-s3"

export interface ResolverContext {
	s3: S3Client
}
