import { ListObjectsCommand, PutObjectCommand, S3Client, type S3ClientConfig } from "@aws-sdk/client-s3";
import { env } from "~/env.mjs";

const s3Config: S3ClientConfig = {
    region: env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
        secretAccessKey: env.NEXT_PUBLIC_AWS_S3_SECRET_KEY,
        accessKeyId: env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY,
    }
}

const pattern = /\s+/g;
const replacement = '+';
const newFileName = (fileName: string) => fileName.replace(pattern, replacement);

export const s3 = new S3Client(s3Config)

export const getImages = async () => {
    const command = new ListObjectsCommand({
        Bucket: env.NEXT_PUBLIC_AWS_S3_BUCKET,
    })

    const result = await s3.send(command)
    return result.Contents?.map((item) => {
        return {
            key: item.Key,
            url: `https://${env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${(item.Key)}`,
        }
    })
}

export const uploadImage = async (
    file: File,
    fileName: string
) => {
    const fileType = file.type.split('/')[1]

    const command = new PutObjectCommand({
        Bucket: env.NEXT_PUBLIC_AWS_S3_BUCKET,
        Key: fileName,
        Body: file,
        // ACL: 'public-read',
        ContentType: `image/${fileType}`,
    })

    return await s3.send(command)
        .then((data) => {
            const url = `https://${env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${newFileName(fileName)}`
            return url
        }).catch((err) => {
            console.log(err)
            throw new Error('Failed to upload file to S3')
        })
}