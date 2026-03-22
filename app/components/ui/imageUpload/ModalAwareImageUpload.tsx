import React, { useState } from 'react';
import { useAction } from 'convex/react';
import { ActivityIndicator, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../../../../convex/_generated/api';
import Column from '../../layout/Column';
import AppButton from '../buttons/AppButton';
import PoppinsText from '../text/PoppinsText';
import { prepareImageForUpload, UploadThingReactNativeFile } from '../../../../utils/imageCompression';

type UrlSetter = (url: string) => void;

interface UploadThingSignedUpload {
    url: string;
    key: string;
}

interface UploadThingUploadedFileResponse {
    url: string;
    appUrl: string;
    ufsUrl: string;
    fileHash: string;
    serverData?: {
        url?: string;
    };
}

interface ModalAwareImageUploadProps {
    url: string;
    setUrl: UrlSetter;
    buttonLabel?: string;
    onPickerOpen?: () => void;
    onPickerClose?: () => void;
}

const uploadFileToPresignedUrl = async (
    file: UploadThingReactNativeFile,
    signedUpload: UploadThingSignedUpload,
) => {
    return new Promise<UploadThingUploadedFileResponse>((resolve, reject) => {
        const formData = new FormData();

        if (file.file) {
            formData.append('file', file.file);
        } else {
            formData.append('file', {
                uri: file.uri,
                type: file.type,
                name: file.name,
            } as never);
        }

        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedUpload.url, true);
        xhr.setRequestHeader('Range', 'bytes=0-');
        xhr.setRequestHeader('x-uploadthing-version', '7.7.4');
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response as UploadThingUploadedFileResponse);
                return;
            }

            reject(new Error(`Upload failed with status ${xhr.status}.`));
        };
        xhr.onerror = () => reject(new Error('Upload request failed.'));
        xhr.send(formData);
    });
};

const ModalAwareImageUpload = ({
    url,
    setUrl,
    buttonLabel = 'Upload image',
    onPickerOpen,
    onPickerClose
}: ModalAwareImageUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const generatePublicImageUploadUrl = useAction(api.uploadthing.generatePublicImageUploadUrl);

    const handleUpload = async () => {
        setErrorMessage('');

        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            setErrorMessage('Media library permission is required to upload an image.');
            return;
        }

        // Close modal before opening image picker
        onPickerOpen?.();

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        // Reopen modal after picker closes
        onPickerClose?.();

        if (result.canceled || !result.assets?.length) {
            return;
        }

        try {
            setIsUploading(true);
            const file = await prepareImageForUpload(result.assets[0]);
            const signedUpload = await generatePublicImageUploadUrl({
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
            }) as UploadThingSignedUpload;
            const uploadedFile = await uploadFileToPresignedUrl(file, signedUpload);
            const publicUrl = uploadedFile.serverData?.url ?? uploadedFile.ufsUrl ?? uploadedFile.url;

            if (!publicUrl) {
                throw new Error('Upload completed but no public URL was returned.');
            }

            setUrl(publicUrl);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Image upload failed.';
            setErrorMessage(message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Column className='w-full p-4 border-b border-subtle-border bg-light/30'>
            <Column gap={3}>

                <AppButton variant='outline' className='w-40' onPress={handleUpload}>
                    {isUploading ? (
                        <ActivityIndicator color='white' />
                    ) : (
                        <PoppinsText weight='medium' color='white'>
                            {buttonLabel}
                        </PoppinsText>
                    )}
                </AppButton>

                {errorMessage ? (
                    <PoppinsText className='text-red-500'>{errorMessage}</PoppinsText>
                ) : null}

                {url ? (
                    <Column gap={2}>
                        {/* <PoppinsText varient='subtext'>
                            {url}
                        </PoppinsText> */}

                        {/* <View className='w-full h-56 overflow-hidden rounded-lg border border-subtle-border bg-background'>
                            <Image
                                source={{ uri: url }}
                                className='w-full h-full'
                                resizeMode='cover'
                            />
                        </View> */}
                    </Column>
                ) : (
                    // <PoppinsText varient='subtext'>{emptyLabel}</PoppinsText>
                    <></>
                )}
            </Column>
        </Column>
    );
};

export default ModalAwareImageUpload;
