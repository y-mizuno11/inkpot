import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const client = new S3Client({})

export async function putObject(bucket: string, key: string, body: Uint8Array) {
  await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body }))
  return `/media/${key}`
}
