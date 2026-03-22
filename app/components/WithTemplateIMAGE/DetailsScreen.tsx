import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import AppButton from '../ui/buttons/AppButton';
import StatusButton from '../ui/StatusButton';
import PoppinsText from '../ui/text/PoppinsText';
import Column from '../layout/Column';
import DateFieldDialog from '../ui/dialog/DateFieldDialog';
import TextFieldDialog from '../ui/dialog/TextFieldDialog';
import WriteUpDialog from '../ui/dialog/WriteUpDialog';
import AnimatedWrapper from '../ui/AnimatedWrapper';

interface DetailsScreenProps {
    title: string;
    subtitle: string;
    setSubtitle: (subtitle: string) => void;
    writeUpData: string;
    setWriteUpData: (writeUp: string) => void;
    profileDate: string;
    setProfileDate: (date: string) => void;
    imageTemplateVersion: 'collage' | 'slideshow';
    onTemplateVersionChange: (version: 'collage' | 'slideshow') => void;
    onCreatePost: () => void;
    onBack: () => void;
    isValid: boolean;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({
    subtitle,
    setSubtitle,
    writeUpData,
    setWriteUpData,
    profileDate,
    setProfileDate,
    onCreatePost,
    onBack,
    isValid,
}) => {
    const [isWriteUpDialogOpen, setIsWriteUpDialogOpen] = useState(false);
    const [isSubtitleDialogOpen, setIsSubtitleDialogOpen] = useState(false);
    const [isProfileDateDialogOpen, setIsProfileDateDialogOpen] = useState(false);

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

    const handleOpenProfileDateDialog = () => {
        setIsProfileDateDialogOpen(true);
    };

    const handleCloseProfileDateDialog = () => {
        setIsProfileDateDialogOpen(false);
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

                        <Pressable
                            onPress={handleOpenProfileDateDialog}
                            className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
                        >
                            <PoppinsText className='text-muted-text'>
                                {profileDate.trim() ? profileDate : 'Project Date'}
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

            <TextFieldDialog
                isOpen={isSubtitleDialogOpen}
                onOpenChange={handleCloseSubtitleDialog}
                value={subtitle}
                onChangeText={setSubtitle}
                placeholder='Subtitle (optional)'
                inputHeight={getSubtitleInputHeight()}
            />

            <DateFieldDialog
                isOpen={isProfileDateDialogOpen}
                onOpenChange={handleCloseProfileDateDialog}
                value={profileDate}
                onChangeText={setProfileDate}
                placeholder='Project Date'
            />
        </>
    );
};

export default DetailsScreen;
