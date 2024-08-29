import { auth } from "@/auth";
import { S3Client } from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";

export async function getUser() {
  const session = await auth();
  if (!session?.user) redirect("/");

  return session.user;
}

export const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
});

export function createImageS3Url(imageKey: string) {
  return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}/${imageKey}`;
}

export function getImageS3Key(imageUrl: string) {
  return imageUrl.split("/").pop();
}
