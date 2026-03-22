import React, { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dialog, ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserListSet } from '../../hooks/useUserListSet';
import type { AudioPost, ImagePost, PostType, TextPost, VideoPost } from '../../types/postTypes';
import PoppinsText from './ui/text/PoppinsText';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import Column from './layout/Column';
import Row from './layout/Row';
import AppButton from './ui/buttons/AppButton';
import WithTemplateIMAGE from './WithTemplateIMAGE';
import WithTemplateTEXT from './WithTemplateTEXT';
import WithTemplateVIDEO from './WithTemplateVIDEO';
import WithTemplateAUDIO from './WithTemplateAUDIO';
import TemplatePreview from './TemplatePreview';
import AnimatedWrapper from './ui/AnimatedWrapper';

interface PickTemplateProps {
    title: string;
    onBack: () => void;
    onBackToFeed: () => void;
}

const PickTemplate: React.FC<PickTemplateProps> = ({
    title,
    onBack,
    onBackToFeed,
}) => {
    const [selectedTemplate, setSelectedTemplate] = useState<'Image' | 'Text' | 'Video' | 'Audio' | null>(null);
    const [selectedImageVariant, setSelectedImageVariant] = useState<'collage' | 'slideshow'>('collage');
    const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');
    const showDevPostObjectButtons = true;
    const [isObjectDialogOpen, setIsObjectDialogOpen] = useState(false);
    const [postObjectInput, setPostObjectInput] = useState('');
    const [postObjectError, setPostObjectError] = useState('');
    const setPost = useUserListSet<PostType>();

    const templates = [
        { type: 'Image' as const, label: 'Images' },
        { type: 'Text' as const, label: 'Big Text' },
        { type: 'Video' as const, label: 'Video' },
        { type: 'Audio' as const, label: 'Audio' },
    ];

    const imageTemplateVariants = [
        { version: 'collage' as const, label: 'Collage' },
        { version: 'slideshow' as const, label: 'Slideshow' },
    ];

    const handleTemplateSelect = (template: 'Image' | 'Text' | 'Video' | 'Audio', variant?: 'collage' | 'slideshow') => {
        setNavigationDirection('forward');
        setSelectedTemplate(template);
        if (template === 'Image' && variant) {
            setSelectedImageVariant(variant);
        }
    };

    const handleBackFromTemplate = () => {
        setNavigationDirection('backward');
        setSelectedTemplate(null);
    };

    const handleOpenObjectDialog = () => {
        setPostObjectError('');
        setIsObjectDialogOpen(true);
    };

    const handleCloseObjectDialog = () => {
        setPostObjectError('');
        setIsObjectDialogOpen(false);
    };

    const handleObjectDialogOpenChange = (open: boolean) => {
        if (open) {
            handleOpenObjectDialog();
            return;
        }

        handleCloseObjectDialog();
    };

    const submitPost = (postValue: PostType) => {
        const postId = Math.floor(Math.random() * 1000000000).toString();

        const searchKeys = postValue.postTemplate === 'Image'
            ? ['title', 'subtitle', 'imageUrls', 'writeUpData', 'profileDate']
            : postValue.postTemplate === 'Text'
                ? ['title', 'subtitle', 'highlight', 'writeUpData', 'profileDate']
                : postValue.postTemplate === 'Video'
                    ? ['title', 'subtitle', 'videoUrl', 'previewUrl', 'writeUpData', 'profileDate']
                    : ['title', 'subtitle', 'audioUrl', 'writeUpData', 'profileDate'];

        setPost({
            key: 'posts',
            itemId: postId,
            value: postValue,
            privacy: 'PUBLIC',
            searchKeys,
        });

        setPostObjectInput('');
        setPostObjectError('');
        handleCloseObjectDialog();
        onBackToFeed();
    };

    const normalizePostObject = (parsedInput: Partial<PostType> & { postTemplate?: string }): PostType => {
        switch (parsedInput.postTemplate) {
            case 'Image': {
                const normalizedPost: ImagePost = {
                    postTemplate: 'Image',
                    TemplateData: {
                        ImageUrl: parsedInput.TemplateData?.ImageUrl ?? [],
                        Title: parsedInput.TemplateData?.Title ?? title,
                        Subtitle: parsedInput.TemplateData?.Subtitle || undefined,
                        profileDate: parsedInput.TemplateData?.profileDate ?? new Date().toLocaleDateString('en-US'),
                    },
                    writeUpData: parsedInput.writeUpData || undefined,
                    imageTemplateVersion: parsedInput.imageTemplateVersion ?? 'collage',
                };

                if (!normalizedPost.TemplateData.Title.trim()) {
                    throw new Error('The object must include TemplateData.Title or use a non-empty screen title.');
                }

                if (!normalizedPost.TemplateData.ImageUrl.length) {
                    throw new Error('The object must include TemplateData.ImageUrl with at least one image URL.');
                }

                return normalizedPost;
            }
            case 'Text': {
                const normalizedPost: TextPost = {
                    postTemplate: 'Text',
                    TemplateData: {
                        Title: parsedInput.TemplateData?.Title ?? title,
                        Subtitle: parsedInput.TemplateData?.Subtitle || undefined,
                        Highlight: parsedInput.TemplateData?.Highlight ?? '',
                        profileDate: parsedInput.TemplateData?.profileDate ?? new Date().toLocaleDateString('en-US'),
                    },
                    writeUpData: parsedInput.writeUpData || undefined,
                };

                if (!normalizedPost.TemplateData.Title.trim()) {
                    throw new Error('The object must include TemplateData.Title or use a non-empty screen title.');
                }

                if (!normalizedPost.TemplateData.Highlight.trim()) {
                    throw new Error('The object must include TemplateData.Highlight.');
                }

                return normalizedPost;
            }
            case 'Video': {
                const normalizedPost: VideoPost = {
                    postTemplate: 'Video',
                    TemplateData: {
                        Title: parsedInput.TemplateData?.Title ?? title,
                        Subtitle: parsedInput.TemplateData?.Subtitle || undefined,
                        VideoUrl: parsedInput.TemplateData?.VideoUrl ?? '',
                        PreviewUrl: parsedInput.TemplateData?.PreviewUrl ?? '',
                        ThumbnailUrl: parsedInput.TemplateData?.ThumbnailUrl || undefined,
                        profileDate: parsedInput.TemplateData?.profileDate ?? new Date().toLocaleDateString('en-US'),
                    },
                    writeUpData: parsedInput.writeUpData || undefined,
                };

                if (!normalizedPost.TemplateData.Title.trim()) {
                    throw new Error('The object must include TemplateData.Title or use a non-empty screen title.');
                }

                if (!normalizedPost.TemplateData.VideoUrl.trim() || !normalizedPost.TemplateData.PreviewUrl.trim()) {
                    throw new Error('The object must include TemplateData.VideoUrl and TemplateData.PreviewUrl.');
                }

                return normalizedPost;
            }
            case 'Audio': {
                const normalizedPost: AudioPost = {
                    postTemplate: 'Audio',
                    TemplateData: {
                        Title: parsedInput.TemplateData?.Title ?? title,
                        Subtitle: parsedInput.TemplateData?.Subtitle || undefined,
                        AudioUrl: parsedInput.TemplateData?.AudioUrl ?? '',
                        CoverImageUrl: parsedInput.TemplateData?.CoverImageUrl || undefined,
                        profileDate: parsedInput.TemplateData?.profileDate ?? new Date().toLocaleDateString('en-US'),
                    },
                    writeUpData: parsedInput.writeUpData || undefined,
                };

                if (!normalizedPost.TemplateData.Title.trim()) {
                    throw new Error('The object must include TemplateData.Title or use a non-empty screen title.');
                }

                if (!normalizedPost.TemplateData.AudioUrl.trim()) {
                    throw new Error('The object must include TemplateData.AudioUrl.');
                }

                return normalizedPost;
            }
            default:
                throw new Error('The object must include a valid postTemplate of Image, Text, Video, or Audio.');
        }
    };

    const handleAddPostFromObject = () => {
        if (!postObjectInput.trim()) {
            setPostObjectError('Paste a post object first.');
            return;
        }

        try {
            const parsedInput = JSON.parse(postObjectInput) as Partial<PostType> & { postTemplate?: string };
            submitPost(normalizePostObject(parsedInput));
        } catch (jsonError) {
            try {
                const parsedInput = Function(`"use strict"; return (${postObjectInput});`)() as Partial<PostType> & { postTemplate?: string };
                submitPost(normalizePostObject(parsedInput));
            } catch (parseError) {
                const errorMessage = parseError instanceof Error ? parseError.message : jsonError instanceof Error ? jsonError.message : 'Could not parse that object. Paste valid JSON or a valid JS object literal.';
                setPostObjectError(errorMessage);
            }
        }
    };

    // If a template is selected, show the full template view
    if (selectedTemplate) {
        return (
            <AnimatedWrapper direction={navigationDirection}>
                <View className='pt-12'>
                    {selectedTemplate === 'Image' ? (
                        <WithTemplateIMAGE title={title} onBackToFeed={onBackToFeed} initialImageTemplateVersion={selectedImageVariant} />
                    ) : selectedTemplate === 'Text' ? (
                        <WithTemplateTEXT title={title} onBackToFeed={onBackToFeed} />
                    ) : selectedTemplate === 'Video' ? (
                        <WithTemplateVIDEO title={title} onBackToFeed={onBackToFeed} />
                    ) : selectedTemplate === 'Audio' ? (
                        <WithTemplateAUDIO title={title} onBackToFeed={onBackToFeed} />
                    ) : null}

                    <View className='absolute top-0 left-0 p-4 z-50'>
                        <AppButton variant='transparent' className='absolute top-4 left-4' onPress={handleBackFromTemplate}>
                            <PoppinsText className='text-primary-text text-lg font-bold'>{`< Back`}</PoppinsText>
                        </AppButton>
                    </View>
                </View>
            </AnimatedWrapper>
        );
    }

    // Show template selector
    return (
        <AnimatedWrapper direction={navigationDirection}>
            <>
                <View className='p-4 h-full overflow-clip'>
                    <View>
                        <ScrollShadow LinearGradientComponent={LinearGradient}>
                            <ScrollView>
                                <Column className='flex-1 items-center justify-center mt-16'>
                                    <PoppinsText className='text-primary-text text-2xl font-bold mb-8'>Choose Your Template</PoppinsText>
                                    {showDevPostObjectButtons ? (
                                        <View className='w-full px-4 mb-8'>
                                            <AppButton variant='grey' className='w-full' onPress={handleOpenObjectDialog}>
                                                <PoppinsText weight='medium'>Paste Full Post Object</PoppinsText>
                                            </AppButton>
                                        </View>
                                    ) : null}
                                    <Column className='space-y-4'>
                                        {templates.map((template) => (
                                            <Column key={template.type}>

                                                <Column className='w-screen p-4'>
                                                    <PoppinsText className='text-primary-text text-lg font-medium mb-3'>{template.label}</PoppinsText>
                                                    <Row className='w-full justify-between'>
                                                        {template.type === 'Image' ? (
                                                            imageTemplateVariants.map((variant) => (
                                                                <TouchableOpacity
                                                                    key={variant.version}
                                                                    onPress={() => handleTemplateSelect(template.type, variant.version)}
                                                                    className='h-56 w-[48%] items-center justify-center overflow-hidden rounded-xl border border-subtle-border bg-inner-background'
                                                                >
                                                                    <View className="touch-none" pointerEvents='none'>
                                                                        <TemplatePreview templateType={template.type} imageTemplateVersion={variant.version} />
                                                                    </View>
                                                                </TouchableOpacity>
                                                            ))
                                                        ) : (
                                                            <>
                                                                <TouchableOpacity
                                                                    onPress={() => handleTemplateSelect(template.type)}
                                                                    className='h-56 w-[48%] items-center justify-center overflow-hidden rounded-xl border border-subtle-border bg-inner-background'
                                                                >
                                                                    <View className="touch-none" pointerEvents='none'>
                                                                        <TemplatePreview templateType={template.type} />
                                                                    </View>
                                                                </TouchableOpacity>
                                                                <View className='h-56 w-[48%] items-center justify-center rounded-xl border border-dashed border-subtle-border bg-inner-background/60'>
                                                                    <PoppinsText className='text-muted-text text-base font-medium'>Coming Soon</PoppinsText>
                                                                </View>
                                                            </>
                                                        )}
                                                    </Row>
                                                </Column>
                                            </Column>
                                        ))}
                                    </Column>
                                </Column>
                            </ScrollView>
                        </ScrollShadow>

                    </View>

                </View>
                <View className='absolute top-0 left-0 p-4 z-50'>
                    <AppButton variant='transparent' className='absolute top-4 left-4' onPress={onBack}>
                        <PoppinsText className='text-primary-text text-lg font-bold'>{`< Back`}</PoppinsText>
                    </AppButton>
                </View>
                {showDevPostObjectButtons ? (
                    <Dialog isOpen={isObjectDialogOpen} onOpenChange={handleObjectDialogOpenChange}>
                        <Dialog.Portal className='bg-black/50'>
                            <Dialog.Overlay />
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                                <Dialog.Content className='max-h-[80vh] w-[90vw] max-w-[500px] bg-background'>
                                    <Dialog.Close className='bg-grey' />
                                    <View className='mb-4 gap-2'>
                                        <Dialog.Title>
                                            <PoppinsText className='text-2xl font-bold'>Paste Post Object</PoppinsText>
                                        </Dialog.Title>
                                        <Dialog.Description>
                                            <PoppinsText className='text-muted-text'>
                                                Paste a full image, text, video, or audio post object and create it in one step.
                                            </PoppinsText>
                                        </Dialog.Description>
                                    </View>
                                    <PoppinsTextInput
                                        value={postObjectInput}
                                        onChangeText={(text) => {
                                            setPostObjectInput(text);
                                            if (postObjectError) {
                                                setPostObjectError('');
                                            }
                                        }}
                                        placeholder={`{\n  "postTemplate": "Video",\n  "TemplateData": {\n    "Title": "My Project",\n    "VideoUrl": "https://...",\n    "PreviewUrl": "https://..."\n  }\n}`}
                                        multiline
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        className='min-h-[260px] border border-subtle-border rounded-lg bg-inner-background'
                                        style={{ textAlignVertical: 'top' }}
                                    />
                                    {postObjectError ? (
                                        <PoppinsText className='mt-3 text-red-400'>{postObjectError}</PoppinsText>
                                    ) : null}
                                    <View className='mt-6 flex-row justify-end gap-3'>
                                        <AppButton variant='transparent' onPress={handleCloseObjectDialog} className='px-6'>
                                            <PoppinsText>Cancel</PoppinsText>
                                        </AppButton>
                                        <AppButton variant='primary' onPress={handleAddPostFromObject} className='px-6'>
                                            <PoppinsText>Create Post</PoppinsText>
                                        </AppButton>
                                    </View>
                                </Dialog.Content>
                            </KeyboardAvoidingView>
                        </Dialog.Portal>
                    </Dialog>
                ) : null}
            </>
        </AnimatedWrapper>
    );
};

export default PickTemplate;
