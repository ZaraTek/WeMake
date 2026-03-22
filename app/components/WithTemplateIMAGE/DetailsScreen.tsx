import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
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

    const handleOpenWriteUpDialog = () => {
        setIsWriteUpDialogOpen(true);
    };

    const handleCloseWriteUpDialog = () => {
        setIsWriteUpDialogOpen(false);
    };

    return (
        <>
            <AnimatedWrapper>
                <Column className='flex-1 p-4 gap-6'>
                    <Column className='gap-2'>
                        <PoppinsText className='text-primary-text text-2xl font-bold'>{title}</PoppinsText>
                        <PoppinsText className='text-muted-text text-sm'>Add details and create your post</PoppinsText>
                    </Column>

                    <Column className='gap-6 flex-1'>
                        <PoppinsTextInput
                            value={subtitle}
                            onChangeText={setSubtitle}
                            placeholder='Subtitle (optional)'
                        />

                        <Column className='gap-2'>
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
                        </Column>

                        <TouchableOpacity
                            onPress={handleOpenWriteUpDialog}
                            className='p-4 border border-subtle-border rounded-lg bg-inner-background'
                        >
                            <PoppinsText className='text-muted-text'>
                                {writeUpData.trim() ? writeUpData.substring(0, 100) + (writeUpData.length > 100 ? '...' : '') : 'Tap to add write up content'}
                            </PoppinsText>
                        </TouchableOpacity>
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
        </>
    );
};

export default DetailsScreen;
