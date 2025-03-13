import {
    DeleteObjectsCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import {
    AWS_DATA_STORAGE_BUCKET_NAME,
    AWS_MEDIA_STORAGE_BUCKET_NAME,
    AWS_S3_REGION_NAME,
    mediaCloudFrontHeader,
} from "./S3Config";

export const generateUniqueKey = (prefix: string, fileType: string) => {
    return `${prefix}${uuidv4()}.${fileType}`;
};

export const compressImage = async (imageFile: File, maxSize: number) => {
    const options = {
        maxSizeMB: 0.8,
        maxWidthOrHeight: maxSize ?? 1920,
        preserveAspectRatio: true,
        useWebWorker: true,
    };
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
};


export const uploadImageToS3 = async (imagePaths: File, isMedia: boolean, pathKey: string) => {
    const accessKey = sessionStorage.getItem("AWS_SECRET_ACCESS_KEY");
    const keyId = sessionStorage.getItem("AWS_ACCESS_KEY_ID");

    const client = new S3Client({
        region: AWS_S3_REGION_NAME,
        credentials: {
            accessKeyId: keyId || "",
            secretAccessKey: accessKey || "",
        },
        useAccelerateEndpoint: true,
    });
    const headCommand = new PutObjectCommand({
        Bucket: isMedia ? AWS_MEDIA_STORAGE_BUCKET_NAME : AWS_DATA_STORAGE_BUCKET_NAME,
        Key: pathKey,
        Body: new Uint8Array(await imagePaths?.arrayBuffer()),
        ContentType: imagePaths.type,
    });
    try {
        await client.send(headCommand);
        console.log("Successfully uploaded", pathKey);
        return `${mediaCloudFrontHeader}${pathKey}`;
    } catch (error) {
        console.error("Error uploading file", error);
        return "";
    }
};

export const deleteImageToS3 = async (isMedia: boolean, pathKey: string) => {
    const accessKey = sessionStorage.getItem("AWS_SECRET_ACCESS_KEY");
    const keyId = sessionStorage.getItem("AWS_ACCESS_KEY_ID");

    const client = new S3Client({
        region: AWS_S3_REGION_NAME,
        credentials: {
            accessKeyId: keyId || "",
            secretAccessKey: accessKey || "",
        },
        useAccelerateEndpoint: true,
    });
    try {
        const listCommand = new ListObjectsV2Command({
            Bucket: isMedia ? AWS_MEDIA_STORAGE_BUCKET_NAME : AWS_DATA_STORAGE_BUCKET_NAME,
            Prefix: pathKey, // Prefix is the folder path
        });

        const listResponse = await client.send(listCommand);
        const objectsToDelete = listResponse.Contents?.map((item) => ({ Key: item.Key }));

        if (objectsToDelete?.length === 0) {
            console.log("No objects found in the specified folder.");
            return;
        }

        // 2. Delete all objects listed
        const deleteCommand = new DeleteObjectsCommand({
            Bucket: isMedia ? AWS_MEDIA_STORAGE_BUCKET_NAME : AWS_DATA_STORAGE_BUCKET_NAME,
            Delete: {
                Objects: objectsToDelete,
                Quiet: true,
            },
        });

        await client.send(deleteCommand);
        console.log(`Successfully deleted folder: ${pathKey}`);
    } catch (error) {
        console.error("Error deleting folder", error);
    }
};

