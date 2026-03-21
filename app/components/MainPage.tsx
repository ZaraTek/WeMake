import React, { PropsWithChildren, useState } from 'react';
import { Button } from 'heroui-native/button';
import { Dialog } from 'heroui-native/dialog';
import { View } from 'react-native';
import Column from './layout/Column';
import PoppinsText from './ui/text/PoppinsText';
import { useUserVariable } from 'hooks/useUserVariable';
import { useUserListGet } from 'hooks/useUserListGet';
import { useUserListSet } from 'hooks/useUserListSet';
import { GameInfo } from 'types/games';
import TopSiteBar from './layout/TopSiteBar';
import PoppinsTextInput from './ui/forms/PoppinsTextInput';
import JoinHandler from './ui/forms/JoinHandler';
import FakeConvexWrapper from './Post/FakeConvexWrapper';



type FontWeight = 'regular' | 'medium' | 'bold';

interface MainPageProps extends PropsWithChildren {
    className?: string;
}

const MainPage: React.FC<MainPageProps> = ({
    className = '',
}) => {
    const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);

    interface UserData {
        email?: string;
        name?: string;
        userId?: string
    };

    const [userData, setUserData] = useUserVariable<UserData>({
        key: "userData",
        defaultValue: {},
        privacy: "PUBLIC",
        searchKeys: ["name"],
    });

    const userId = userData.value.userId || "";

    const myGames = useUserListGet<GameInfo>({
        key: "games",
        userIds: [userId],
    });

    const [activeGameId, setActiveGameId] = useUserVariable<string>({
        key: "activeGameId",
        defaultValue: "",
    });

    const generateGameId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    const addNewGame = () => {
        const newGameId = generateGameId();

        setUserListItem({
            key: "games",
            itemId: newGameId,
            value: {
                id: newGameId,
                name: "Game 1",
                description: "Description 1",
            },
            filterKey: "id",
            privacy: "PUBLIC",
        });
    }

    const setUserListItem = useUserListSet();
    const isInAGame = activeGameId.value !== "";

    // Game-related functionality removed - game components were cleared
    // You can add new game-specific components here as needed

    return (
        <View className=' justify-between w-full h-full'>
            <View className='absolute right-4 top-20 z-10'>
                
            </View>

            <TopSiteBar isInAGame={false} setActiveGameId={setActiveGameId} />
            
            <FakeConvexWrapper />
            <View className='flex-1 justify-center items-center'>
                <PoppinsText className='text-lg text-center mb-4'>
                    Welcome to your base project!
                    
                </PoppinsText>
                <PoppinsText className='text-sm text-center text-gray-600'>
                    Game components have been removed. Add your custom components here.
                </PoppinsText>
            </View>
        </View>
    );
};

export default MainPage;
