import {
    DeleteObjectsCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import { getAPIKey } from "../api/login/auth";
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

export const checkAWSKey = async () => {
    const accessKey = sessionStorage.getItem("AWS_SECRET_ACCESS_KEY");
    const keyId = sessionStorage.getItem("AWS_ACCESS_KEY_ID");
    console.log("accessKey || !keyId1111", accessKey, keyId);

    if (!accessKey || !keyId) {
        const credentials = await getAPIKey();
        if (credentials.result) {
            const awsSecretAccessKey = credentials.data.AWS_SECRET_ACCESS_KEY;
            const awsAccessKeyId = credentials.data.AWS_ACCESS_KEY_ID;
            console.log("accessKey || !keyId333", accessKey, keyId);
            return { result: true, accessKey: awsSecretAccessKey, keyId: awsAccessKeyId };
        } else {
            return { result: false, accessKey: "", keyId: "" };
        }


    }
    console.log("accessKey || !keyId222", accessKey, keyId);
    return { result: true, accessKey, keyId };
}

export const uploadImageToS3 = async (imagePaths: File, isMedia: boolean, pathKey: string) => {
    let accessKey = sessionStorage.getItem("AWS_SECRET_ACCESS_KEY");
    let keyId = sessionStorage.getItem("AWS_ACCESS_KEY_ID");

    if (!accessKey || !keyId) {
        try {
            const credentials = await getAPIKey();
            if (credentials.result) {
                console.log("credentials", credentials);

                return uploadImage(imagePaths, isMedia, pathKey, credentials.data.AWS_SECRET_ACCESS_KEY, credentials.data.AWS_ACCESS_KEY_ID);
            } else {
                alert("AWS 설정 오류");
                return "";
            }
        } catch (error) {
            console.error("API 키 가져오기 실패:", error);
            alert("AWS 인증 정보를 가져오는 중 오류가 발생했습니다.");
            return "";
        }
    } else {
        if (!accessKey || !keyId) {
            console.error("AWS 인증 정보가 없습니다.");
            return "";
        }

        return uploadImage(imagePaths, isMedia, pathKey, accessKey, keyId);
    }

    // 키가 확보된 후에만 client 생성 및 업로드 진행

};
const uploadImage = async (imagePaths: File, isMedia: boolean, pathKey: string, accessKey: string, keyId: string) => {

    console.log("accessKey", accessKey);
    console.log("keyId", keyId);


    const client = new S3Client({
        region: AWS_S3_REGION_NAME,
        credentials: {
            accessKeyId: keyId,
            secretAccessKey: accessKey,
        },
        useAccelerateEndpoint: false,
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
}


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

