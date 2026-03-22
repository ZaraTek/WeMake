import React, { PropsWithChildren, useState } from 'react';
import { Button } from 'heroui-native/button';
import { Dialog } from 'heroui-native/dialog';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import Column from './layout/Column';
import PoppinsText from './ui/text/PoppinsText';
import { useUserVariable } from 'hooks/useUserVariable';
import { useUserListGet } from 'hooks/useUserListGet';
import { useUserListSet } from 'hooks/useUserListSet';
import { useSyncUserData } from 'hooks/useSyncUserData';
import { GameInfo } from 'types/games';
import { UserData } from 'types/userData';
import TopSiteBar from './layout/TopSiteBar';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import JoinHandler from './ui/forms/JoinHandler';
import Feed from './Feed';
import Profile from './Profile';
import NewPost from './NewPost';
import Row from './layout/Row';
import AppButton from './ui/buttons/AppButton';
import { UserIcon } from 'lucide-react-native';
import { useClerk } from '@clerk/clerk-expo';
import FakeImageCollageWrapper from './Post/FakeImageCollageWrapper';
import FakeAudioWrapper from './Post/FakeAudioWrapper';
import FakeVideoWrapper from './Post/FakeVideoWrapper';
import FakeTextWrapper from './Post/FakeTextWrapper';
import FakeImageSlideshowWrapper from './Post/FakeImageSlideshowWrapper';
import FakeConvexProfileHeader from './FakeConvexProfileHeader';



type FontWeight = 'regular' | 'medium' | 'bold';

interface MainPageProps extends PropsWithChildren {
    className?: string;
}

const MainPage: React.FC<MainPageProps> = ({
    className = '',
}) => {
    const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);

    const [userData, setUserData] = useUserVariable<UserData>({
        key: "userData",
        defaultValue: {},
        privacy: "PUBLIC",
        searchKeys: ["name"],
    });

    // useSyncUserData(userData.value, setUserData);

    const currentUserId = userData.value.userId || "LOADING";

    // useState for page state
    type Page = "feed" | "profile" | "newPost";
    const [activePage, setActivePage] = useState<Page>("feed");
    const { signOut } = useClerk();


    // Game-related functionality removed - game components were cleared
    // You can add new game-specific components here as needed

    return (
        <View>
            <FakeConvexProfileHeader className="-mt-12" />
            <ScrollView
                className="w-full h-full"
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="gap-4 p-4">
                    <FakeAudioWrapper />
                    <FakeVideoWrapper />
                    <FakeTextWrapper />
                    <FakeImageCollageWrapper />
                    <FakeImageSlideshowWrapper />
                </View>
            </ScrollView>
        </View>
    );
};

export default MainPage;
