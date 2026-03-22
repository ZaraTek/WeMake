import React, { useState } from 'react';
import { View, TouchableOpacity, Pressable, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import PoppinsTextInput from '../ui/forms/PoppinsTextInput';
import AppButton from '../ui/buttons/AppButton';
import StatusButton from '../ui/StatusButton';
import PoppinsText from '../ui/text/PoppinsText';
import Column from '../layout/Column';
import Row from '../layout/Row';
import WriteUpDialog from '../ui/dialog/WriteUpDialog';
import AnimatedWrapper from '../ui/AnimatedWrapper';
import { Dialog } from 'heroui-native';

interface DetailsScreenProps {
    title: string;
    subtitle: string;
    setSubtitle: (subtitle: string) => void;
    writeUpData: string;
    setWriteUpData: (writeUp: string) => void;
    imageTemplateVersion: 'collage' | 'slideshow';
    onTemplateVersionChange: (version: 'collage' | 'slideshow') => void;
    onCreatePost: () => void;
    onBack: () => void;
    isValid: boolean;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({
    title,
    subtitle,
    setSubtitle,
    writeUpData,
    setWriteUpData,
    imageTemplateVersion,
    onTemplateVersionChange,
    onCreatePost,
    onBack,
    isValid,
}) => {
    const [isWriteUpDialogOpen, setIsWriteUpDialogOpen] = useState(false);
    const [isSubtitleDialogOpen, setIsSubtitleDialogOpen] = useState(false);

    const handleOpenWriteUpDialog = () => {
        setIsWriteUpDialogOpen(true);
    };

    const handleCloseWriteUpDialog = () => {
        setIsWriteUpDialogOpen(false);
    };

    const handleOpenSubtitleDialog = () => {
        setIsSubtitleDialogOpen(true);
    };

    const handleCloseSubtitleDialog = () => {
        setIsSubtitleDialogOpen(false);
    };

    const handleSubtitlePost = () => {
        setIsSubtitleDialogOpen(false);
    };

    // Calculate dynamic height based on content
    const getWriteUpInputHeight = () => {
        const lines = writeUpData.split('\n').length;
        const baseHeight = 40;
        const lineHeight = 20;
        const maxHeight = 120;
        return Math.min(baseHeight + (lines - 1) * lineHeight, maxHeight);
    };

    const getSubtitleInputHeight = () => {
        const lines = subtitle.split('\n').length;
        const baseHeight = 40;
        const lineHeight = 20;
        const maxHeight = 80;
        return Math.min(baseHeight + (lines - 1) * lineHeight, maxHeight);
    };

    return (
        <>
            <AnimatedWrapper>
                <Column className='p-4 gap-6'>
                    {/* <Column className='gap-2'>
                        <PoppinsText className='text-primary-text text-2xl font-bold'>{title}</PoppinsText>
                        <PoppinsText className='text-muted-text text-sm'>Add details and create your post</PoppinsText>
                    </Column> */}

                    <Column className='gap-6'>
                        <Pressable
                            onPress={handleOpenSubtitleDialog}
                            className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                        >
                            <PoppinsText className='text-muted-text'>
                                {subtitle.trim() ? subtitle : 'Subtitle (optional)'}
                            </PoppinsText>
                        </Pressable>

                        {/* <Column className='gap-2'>
                            <PoppinsText className='text-primary-text text-base font-medium'>Template Version</PoppinsText>
                            <Row className='gap-2'>
                                <TouchableOpacity
                                    onPress={() => onTemplateVersionChange('collage')}
                                    className={`flex-1 p-3 rounded-lg border ${imageTemplateVersion === 'collage' ? 'border-primary bg-primary/20' : 'border-subtle-border bg-inner-background'}`}
                                >
                                    <PoppinsText className={`text-center ${imageTemplateVersion === 'collage' ? 'text-primary' : 'text-muted-text'}`}>Collage</PoppinsText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => onTemplateVersionChange('slideshow')}
                                    className={`flex-1 p-3 rounded-lg border ${imageTemplateVersion === 'slideshow' ? 'border-primary bg-primary/20' : 'border-subtle-border bg-inner-background'}`}
                                >
                                    <PoppinsText className={`text-center ${imageTemplateVersion === 'slideshow' ? 'text-primary' : 'text-muted-text'}`}>Slideshow</PoppinsText>
                                </TouchableOpacity>
                            </Row>
                        </Column> */}

                        <Pressable
                            onPress={handleOpenWriteUpDialog}
                            className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                        >
                            <PoppinsText className='text-muted-text'>
                                {writeUpData.trim() ? writeUpData.substring(0, 100) + (writeUpData.length > 100 ? '...' : '') : 'Tap to add write up content'}
                            </PoppinsText>
                        </Pressable>
                    </Column>

                    <Column className='gap-4'>
                        {isValid ? (
                            <AppButton variant='primary' className='w-full' onPress={onCreatePost}>
                                <PoppinsText weight='medium'>Create Post</PoppinsText>
                            </AppButton>
                        ) : (
                            <StatusButton buttonText='Create Post' buttonAltText='REQUIRED' className='w-full' />
                        )}
                        
                        <AppButton variant='transparent' className='w-full' onPress={onBack}>
                            <PoppinsText weight='medium'>← Back to Images</PoppinsText>
                        </AppButton>
                    </Column>
                </Column>
            </AnimatedWrapper>
            
            <WriteUpDialog
                isOpen={isWriteUpDialogOpen}
                onOpenChange={handleCloseWriteUpDialog}
                value={writeUpData}
                onChangeText={setWriteUpData}
                placeholder='Write up content for your image post'
            />
            
            <Dialog isOpen={isSubtitleDialogOpen} onOpenChange={handleCloseSubtitleDialog}>
                <Dialog.Portal className='bg-black/50'>
                    <Dialog.Overlay />
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <Dialog.Content className="w-[90vw] max-w-[500px] bg-background">
                            <Dialog.Close className='bg-grey' />
                            <View className="flex-row items-center gap-2">
                                <TextInput
                                    ref={(input) => {
                                        if (input && isSubtitleDialogOpen) {
                                            setTimeout(() => input.focus(), 100);
                                        }
                                    }}
                                    value={subtitle}
                                    onChangeText={setSubtitle}
                                    placeholder='Subtitle (optional)'
                                    className="flex-1 rounded-lg border border-subtle-border bg-inner-background px-3 py-2 text-text"
                                    style={{ height: getSubtitleInputHeight() }}
                                />
                                <Pressable
                                    onPress={handleSubtitlePost}
                                    className="rounded-lg bg-blue-500 px-4 py-2"
                                >
                                    <Text className="text-white font-semibold">Post</Text>
                                </Pressable>
                            </View>
                        </Dialog.Content>
                    </KeyboardAvoidingView>
                </Dialog.Portal>
            </Dialog>
        </>
    );
};

export default DetailsScreen;
