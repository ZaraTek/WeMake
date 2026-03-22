import { ImagePickerAsset } from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Platform } from 'react-native';

export type UploadThingReactNativeFile = {
    uri: string;
    name: string;
    size: number;
    type: string;
    lastModified: number;
    file?: File;
};

const MAX_DIMENSION = 720;
const JPEG_COMPRESS_QUALITY = 0.72;

const ensureJpegFileName = (fileName?: string) => {
    const baseName = fileName?.replace(/\.[^.]+$/, '') || `upload-${Date.now()}`;
    return `${baseName}.jpg`;
};

const getFileSizeFromUri = async (uri: string) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob.size;
    } catch {
        return 0;
    }
};

export const prepareImageForUpload = async (
    asset: ImagePickerAsset,
): Promise<UploadThingReactNativeFile> => {
    if (asset.file && Platform.OS === 'web') {
        return {
            uri: asset.file.name,
            name: asset.file.name,
            size: asset.file.size,
            type: asset.file.type,
            lastModified: asset.file.lastModified,
            file: asset.file,
        };
    }

    const width = asset.width ?? 0;
    const height = asset.height ?? 0;
    const longestSide = Math.max(width, height);
    const shouldResize = longestSide > MAX_DIMENSION;

    const actions: ImageManipulator.Action[] = [];

    if (shouldResize) {
        if (width >= height) {
            actions.push({ resize: { width: MAX_DIMENSION } });
        } else {
            actions.push({ resize: { height: MAX_DIMENSION } });
        }
    }

    const manipulatedImage = await ImageManipulator.manipulateAsync(
        asset.uri,
        actions,
        {
            compress: JPEG_COMPRESS_QUALITY,
            format: ImageManipulator.SaveFormat.JPEG,
        },
    );

    const size = (await getFileSizeFromUri(manipulatedImage.uri)) || asset.fileSize || 0;

    return {
        uri: manipulatedImage.uri,
        name: ensureJpegFileName(asset.fileName || undefined),
        size,
        type: 'image/jpeg',
        lastModified: Date.now(),
    };
};
