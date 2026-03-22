
import React, { useState } from 'react';
import { View } from 'react-native';
import TitlePickerUPLOAD from './TitlePickerUPLOAD';
import PickTemplate from './PickTemplate';
import WithTemplateAUDIO from './WithTemplateAUDIO';
import AnimatedWrapper from './ui/AnimatedWrapper';


interface NewPostProps {
    onBackToFeed: () => void;
}

const NewPost = ({ onBackToFeed }: NewPostProps) => {
    const [title, setTitle] = useState('');
    const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');

    // state to track uploadStae
    const [uploadState, setUploadState] = useState<'Title' | 'TemplatePicker'>('Title');

    const handleNext = () => {
        setNavigationDirection('forward');
        setUploadState('TemplatePicker');
    };

    const handleBack = () => {
        setNavigationDirection('backward');
        setUploadState('Title');
    };






    return (
        <AnimatedWrapper direction={navigationDirection}>
            <View>
                {uploadState === 'Title' ? (
                    <TitlePickerUPLOAD title={title} setTitle={setTitle} onNext={handleNext} onBackToFeed={onBackToFeed} />
                    // <></>
                ) : (
                    <PickTemplate
                        title={title}
                        onBack={handleBack}
                    />
                )}

              


            </View>
        </AnimatedWrapper>

    );
};

export default NewPost;
