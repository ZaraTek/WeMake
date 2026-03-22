import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useUserVariable } from '../hooks/useUserVariable';

type FriendsContextValue = {
    friendIds: string[];
    isSyncing: boolean;
    addFriend: (userId: string) => void;
    removeFriend: (userId: string) => void;
    toggleFriend: (userId: string) => void;
    isFriend: (userId: string) => boolean;
    setFriendIds: (userIds: string[]) => void;
};

const FriendsContext = createContext<FriendsContextValue | null>(null);

const normalizeFriendIds = (userIds: string[]) => Array.from(new Set(userIds.map((userId) => userId.trim()).filter(Boolean)));

export const FriendsProvider = ({ children }: PropsWithChildren) => {
    const [friendsRecord, setFriendsRecord] = useUserVariable<string[]>({
        key: 'friends',
        defaultValue: [],
        privacy: 'PRIVATE',
    });

    const friendIds = useMemo(() => normalizeFriendIds(friendsRecord.value ?? []), [friendsRecord.value]);

    const setFriendIds = (userIds: string[]) => {
        setFriendsRecord(normalizeFriendIds(userIds));
    };

    const addFriend = (userId: string) => {
        if (!userId.trim()) {
            return;
        }

        setFriendIds([...friendIds, userId]);
    };

    const removeFriend = (userId: string) => {
        setFriendIds(friendIds.filter((friendId) => friendId !== userId));
    };

    const toggleFriend = (userId: string) => {
        if (friendIds.includes(userId)) {
            removeFriend(userId);
            return;
        }

        addFriend(userId);
    };

    const isFriend = (userId: string) => friendIds.includes(userId);

    const value = useMemo<FriendsContextValue>(() => ({
        friendIds,
        isSyncing: friendsRecord.state.isSyncing,
        addFriend,
        removeFriend,
        toggleFriend,
        isFriend,
        setFriendIds,
    }), [friendIds, friendsRecord.state.isSyncing]);

    return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
};

export const useFriends = () => {
    const context = useContext(FriendsContext);

    if (!context) {
        throw new Error('useFriends must be used within a FriendsProvider');
    }

    return context;
};
