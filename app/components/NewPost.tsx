
import React, { useState } from 'react';
import { View } from 'react-native';
import TitlePickerUPLOAD from './TitlePickerUPLOAD';
import PickTemplate from './PickTemplate';
import WithTemplateAUDIO from './WithTemplateAUDIO';


interface NewPostProps {
    onBackToFeed: () => void;
}

const NewPost = ({ onBackToFeed }: NewPostProps) => {
    const [title, setTitle] = useState('');


    // state to track uploadStae
    const [uploadState, setUploadState] = useState<'Title' | 'TemplatePicker'>('Title');






    return (
        <View>
            {uploadState === 'Title' ? (
                <TitlePickerUPLOAD title={title} setTitle={setTitle} onNext={() => setUploadState('TemplatePicker')} onBackToFeed={onBackToFeed} />
                // <></>
            ) : (
                <PickTemplate
                    title={title}
                    onBack={() => setUploadState('Title')}
                />
            )}

          


        </View>

    );
};

export default NewPost;
