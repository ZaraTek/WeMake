import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import PoppinsText from './ui/text/PoppinsText';
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
    const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');

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

    const handleTemplateSelect = (template: 'Image' | 'Text' | 'Video' | 'Audio') => {
        setNavigationDirection('forward');
        setSelectedTemplate(template);
    };

    const handleBackFromTemplate = () => {
        setNavigationDirection('backward');
        setSelectedTemplate(null);
    };

    // If a template is selected, show the full template view
    if (selectedTemplate) {
        return (
            <AnimatedWrapper direction={navigationDirection}>
                <View className='pt-12'>
                    {selectedTemplate === 'Image' ? (
                        <WithTemplateIMAGE title={title} onBackToFeed={onBackToFeed} />
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
                                                                    onPress={() => handleTemplateSelect(template.type)}
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
            </>
        </AnimatedWrapper>
    );
};

export default PickTemplate;
