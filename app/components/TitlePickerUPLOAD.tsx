import React, { useState, useEffect } from 'react';
import PoppinsText from './ui/text/PoppinsText';
import Column from './layout/Column';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import Row from './layout/Row';
import AppButton from './ui/buttons/AppButton';
import StatusButton from './ui/StatusButton';
import { View } from 'react-native';

interface TitlePickerUPLOADProps {
    title: string;
    setTitle: (title: string) => void;
    onNext: () => void;
    onBackToFeed: () => void;
}

const TitlePickerUPLOAD: React.FC<TitlePickerUPLOADProps> = ({ title, setTitle, onNext, onBackToFeed }) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(title.trim().length > 0);
    }, [title]);

    return (
        <Column className='items-center justify-center w-full h-full'>
            <View className='absolute top-0 left-0 p-4'>
                <AppButton variant='transparent' className='absolute top-4 left-4' onPress={onBackToFeed}>
                    <PoppinsText className='text-primary-text text-lg font-bold'>{`< Back`}</PoppinsText>
                </AppButton>
            </View>
            <PoppinsText className='text-primary-text text-2xl font-bold'>What's Your Project?</PoppinsText>
            <Row className='py-4 px-8'>
                <PoppinsTextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Title'
                    className='w-full'
                />
            </Row>
            {isValid ? (
                <AppButton
                    variant='primary'
                    className='w-30'
                    onPress={onNext}

                >
                    <PoppinsText weight='medium'>{`Next >`}</PoppinsText>
                </AppButton>
            ) : (
                <StatusButton buttonText={`Next >`} buttonAltText='BLANK' className='w-30' />

            )}
        </Column>
    );
};

export default TitlePickerUPLOAD;
