import React from 'react';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import Column from './layout/Column';
import Row from './layout/Row';
import PoppinsText from './ui/text/PoppinsText';
import { FeedIcon } from './ui/icons/FeedIcon';
import { ProfileIcon } from './ui/icons/ProfileIcon';
import { NewPostIcon } from './ui/icons/NewPostIcon';
import AppButton from './ui/buttons/AppButton';

type Page = "feed" | "profile" | "newPost";

interface BottomNavBarProps {
    activePage: Page;
    setActivePage: (page: Page) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
    activePage,
    setActivePage,
}) => {
    return (
        <Row className='z-10 absolute bottom-0 left-0 right-0 items-center justify-center rounded justify-between mx-6'>
            <View className='overflow-hidden rounded-2xl shadow-lg shadow-black/30'>
                <BlurView intensity={20} tint='dark' className='w-min px-3 p-1 rounded-2xl'>
                    <Row gap={3}>
                        <AppButton variant='transparent' className='w-12 h-12' onPress={() => setActivePage("feed")} selected={activePage === "feed"}>
                            <Column gap={0} className='justify-center items-center'>
                                <FeedIcon size={20}/>
                                <PoppinsText weight='medium' varient='tiny-subtext' color='white'>Feed</PoppinsText>
                            </Column>
                        </AppButton>
                        <AppButton variant='transparent' className='w-12 h-12' onPress={() => setActivePage("profile")} selected={activePage === "profile"}>
                            <Column gap={0} className='justify-center items-center'>
                                <ProfileIcon size={20} />
                                <PoppinsText weight='medium' varient='tiny-subtext' color='white'>Profile</PoppinsText>
                            </Column>
                        </AppButton>
                    </Row>
                </BlurView>
            </View>
            <View className='overflow-hidden rounded-2xl shadow-lg shadow-black/30'>
                <BlurView intensity={20} tint='dark' className='w-min rounded-2xl'>
                    <Row gap={3}>
                        <AppButton variant='primary' className='w-30 h-12 shadow-md shadow-black/20' onPress={() => setActivePage("newPost")} selected={activePage === "newPost"}>
                            <Row gap={2} className='justify-center items-center'>
                                <NewPostIcon />
                                <PoppinsText weight='medium' color='white'>New Post</PoppinsText>
                            </Row>
                        </AppButton>
                    </Row>
                </BlurView>
            </View>
        </Row>
    );
};

export default BottomNavBar;
