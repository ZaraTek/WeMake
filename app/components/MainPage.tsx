import React, { PropsWithChildren, useState } from 'react';
import { Button } from 'heroui-native/button';
import { Dialog } from 'heroui-native/dialog';
import { View } from 'react-native';
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
import FakeConvexWrapper from './Post/FakeConvexWrapper';



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
        <View className='w-full h-full p-4'>
            {/* <AppButton variant="outline" className="h-14 w-14" onPress={() => signOut()}>
                <UserIcon size={24} color={"white"} />
            </AppButton> */}

            <FakeConvexWrapper></FakeConvexWrapper>
{/*        
            <PoppinsText weight='medium' color='white'>Main Page</PoppinsText>
            <PoppinsText weight='medium' color='white'>Current User ID: {currentUserId}</PoppinsText>



            {activePage === "feed" && <Feed />}
            {activePage === "profile" && <Profile currentUserId={currentUserId} />}
            {activePage === "newPost" && <NewPost />}



            <Row gap={3} className='absolute bottom-0 left-0 right-0 p-4 items-center justify-center'>
                <Row className='w-min '>

                    <AppButton variant='primary' className='w-30' onPress={() => setActivePage("feed")}>
                        <PoppinsText weight='medium' color='white'>Feed</PoppinsText>
                    </AppButton>
                    <AppButton variant='primary' className='w-30' onPress={() => setActivePage("profile")}>
                        <PoppinsText weight='medium' color='white'>Profile</PoppinsText>
                    </AppButton>
                    <AppButton variant='primary' className='w-30' onPress={() => setActivePage("newPost")}>
                        <PoppinsText weight='medium' color='white'>New Post</PoppinsText>
                    </AppButton>
                </Row>
            </Row>

             */}

        </View>
    );
};

export default MainPage;
