import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollShadow } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import AppButton from './ui/buttons/AppButton';
import PublicImageUpload from './ui/imageUpload/PublicImageUpload';
import PoppinsText from './ui/text/PoppinsText';
import Column from './layout/Column';

interface ImageUploadIMAGEProps {
    title: string;
    subtitle: string;
    imageUrl: string;
    writeUpData: string;
    setSubtitle: Dispatch<SetStateAction<string>>;
    setImageUrl: Dispatch<SetStateAction<string>>;
    setWriteUpData: Dispatch<SetStateAction<string>>;
    handleAddPost: () => void;
}

const ImageUploadIMAGE: React.FC<ImageUploadIMAGEProps> = ({
    title,
    subtitle,
    imageUrl,
    writeUpData,
    setSubtitle,
    setImageUrl,
    setWriteUpData,
    handleAddPost,
}) => {
    return (
        <View className='p-4 h-full overflow-clip'>
            <View>

                <ScrollShadow LinearGradientComponent={LinearGradient}>
                    <ScrollView>

                        <Column className='mt-16'>


                            {/* <PoppinsTextInput
                                value={title}
                                onChangeText={setTitle}
                                placeholder='Title'

                            /> */}
                            <PoppinsText>{title}</PoppinsText>

                            <PoppinsTextInput
                                value={subtitle}
                                onChangeText={setSubtitle}
                                placeholder='Subtitle'

                            />

                            <PublicImageUpload
                                url={imageUrl}
                                setUrl={setImageUrl}
                                buttonLabel='Upload image'
                                emptyLabel='No image uploaded yet.'
                            />



                            <PoppinsTextInput
                                value={writeUpData}
                                onChangeText={setWriteUpData}
                                placeholder='Write up content'
                                multiline
                                numberOfLines={4}
                                className='h-20'
                            />

                            <AppButton onPress={handleAddPost}>
                                <PoppinsText style={{ color: 'white' }}>Create Post</PoppinsText>
                            </AppButton>


                        </Column>
                    </ScrollView>

                </ScrollShadow>
                <PoppinsText className='text-primary-text text-lg font-bold absolute top-4 left-4'>{`< Back`}</PoppinsText>
            </View>
        </View>
    );
};

export default ImageUploadIMAGE;
