import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useUserVariableGet } from '../../../hooks/useUserVariableGet';
import type { ProfileData } from '../../../types/profile';
import type { UserData } from '../../../types/userData';
import { mergePeopleRecords, sortPeopleByQuery } from '../../lib/people';
import Column from '../layout/Column';
import PoppinsText from '../ui/text/PoppinsText';
import PersonListItem from './PersonListItem';

interface FollowingListProps {
    friendIds: string[];
    currentUserId: string;
    onSelectUser: (userId: string) => void;
}

const FollowingList = ({ friendIds, currentUserId, onSelectUser }: FollowingListProps) => {
    const scopedFriendIds = friendIds.length > 0 ? friendIds : ['__NO_FRIENDS__'];

    const followingProfiles = useUserVariableGet<ProfileData>({
        key: 'profileData',
        userIds: scopedFriendIds,
    });

    const followingUsers = useUserVariableGet<UserData>({
        key: 'userData',
        userIds: scopedFriendIds,
    });

    const people = useMemo(() => sortPeopleByQuery(mergePeopleRecords({
        profileRecords: followingProfiles,
        userRecords: followingUsers,
        excludeUserIds: [currentUserId],
    }), ''), [currentUserId, followingProfiles, followingUsers]);

    if (friendIds.length === 0) {
        return (
            <View className="rounded-3xl border border-dashed border-border bg-inner-background/60 px-4 py-5">
                <PoppinsText weight="medium" color="white">Your little orbit is empty.</PoppinsText>
                <PoppinsText varient="subtext" color="white">Pull down and search for somebody delightful to follow.</PoppinsText>
            </View>
        );
    }

    return (
        <Column gap={3}>
            {people.map((person) => (
                <PersonListItem
                    key={person.userId}
                    person={person}
                    isFriend={true}
                    onPress={onSelectUser}
                />
            ))}
        </Column>
    );
};

export default FollowingList;
