import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useUserVariableGet } from '../../../hooks/useUserVariableGet';
import { useUserVariable } from '../../../hooks/useUserVariable';
import type { ProfileData } from '../../../types/profile';
import type { UserData } from '../../../types/userData';
import { mergePeopleRecords, sortPeopleByQuery } from '../../lib/people';
import Column from '../layout/Column';
import PoppinsText from '../ui/text/PoppinsText';
import PoppinsTextInput from '../ui/forms/PoppinsTextInput';
import PersonListItem from './PersonListItem';

const isNonEmptyString = (value: string | undefined | null): value is string => typeof value === 'string' && value.length > 0;

interface UserSearchPanelProps {
    currentUserId: string;
    onSelectUser: (userId: string) => void;
    query: string;
    onQueryChange: (query: string) => void;
    hideInput?: boolean;
}

const UserSearchPanel = ({
    currentUserId,
    onSelectUser,
    query,
    onQueryChange,
    hideInput = false,
}: UserSearchPanelProps) => {
    const [currentUserRecord] = useUserVariable<UserData>({
        key: 'userData',
        defaultValue: {},
        privacy: 'PUBLIC',
    });
    const [friendsRecord, setFriendsRecord] = useUserVariable<string[]>({
        key: 'friends',
        defaultValue: [],
        privacy: 'PRIVATE',
    });
    const normalizedQuery = query.trim();
    const [debouncedQuery, setDebouncedQuery] = useState(normalizedQuery);
    const resolvedCurrentUserId = currentUserId === 'LOADING'
        ? (currentUserRecord.value?.userId ?? currentUserId)
        : currentUserId;
    const friendIds = Array.from(new Set((friendsRecord.value ?? []).filter(Boolean)));
    const scopedFriendIds = friendIds.length > 0 ? friendIds : ['__NO_FRIENDS__'];

    useEffect(() => {
        if (!normalizedQuery) {
            setDebouncedQuery('');
            return;
        }

        const timeoutId = setTimeout(() => {
            setDebouncedQuery(normalizedQuery);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [normalizedQuery]);

    const debouncedNormalizedQuery = debouncedQuery.trim();
    const isSearchMode = normalizedQuery.length > 0;

    const toggleFriend = (userId: string) => {
        if (!userId.trim()) {
            return;
        }

        if (friendIds.includes(userId)) {
            setFriendsRecord(friendIds.filter((friendId) => friendId !== userId));
            return;
        }

        setFriendsRecord([...friendIds, userId]);
    };

    const isFriend = (userId: string) => friendIds.includes(userId);

    const profileSearchResults = useUserVariableGet<ProfileData>({
        key: 'profileData',
        searchFor: debouncedNormalizedQuery || undefined,
        returnTop: 30,
    });

    const userSearchResults = useUserVariableGet<UserData>({
        key: 'userData',
        searchFor: debouncedNormalizedQuery || undefined,
        returnTop: 30,
    });

    const searchResultUserIds = useMemo(() => {
        if (!debouncedNormalizedQuery) {
            return [] as string[];
        }

        return Array.from(new Set([
            ...(profileSearchResults ?? []).map((record) => record.userToken).filter(isNonEmptyString),
            ...(userSearchResults ?? []).map((record) => record.value?.userId ?? record.userToken).filter(isNonEmptyString),
        ]));
    }, [debouncedNormalizedQuery, profileSearchResults, userSearchResults]);

    const scopedSearchResultUserIds = searchResultUserIds.length > 0 ? searchResultUserIds : ['__NO_RESULTS__'];

    const searchedProfiles = useUserVariableGet<ProfileData>({
        key: 'profileData',
        userIds: scopedSearchResultUserIds,
    });

    const searchedUsers = useUserVariableGet<UserData>({
        key: 'userData',
        userIds: scopedSearchResultUserIds,
    });

    const followingProfiles = useUserVariableGet<ProfileData>({
        key: 'profileData',
        userIds: scopedFriendIds,
    });

    const followingUsers = useUserVariableGet<UserData>({
        key: 'userData',
        userIds: scopedFriendIds,
    });

    const searchResults = useMemo(() => sortPeopleByQuery(mergePeopleRecords({
        profileRecords: searchedProfiles,
        userRecords: searchedUsers,
        excludeUserIds: [resolvedCurrentUserId],
    }), debouncedNormalizedQuery), [debouncedNormalizedQuery, resolvedCurrentUserId, searchedProfiles, searchedUsers]);

    const followingPeople = useMemo(() => sortPeopleByQuery(mergePeopleRecords({
        profileRecords: followingProfiles,
        userRecords: followingUsers,
        excludeUserIds: [resolvedCurrentUserId],
    }), ''), [followingProfiles, followingUsers, resolvedCurrentUserId]);

    const visiblePeople = (isSearchMode ? searchResults : followingPeople).filter(
        (person) => person.userId && person.userId !== resolvedCurrentUserId,
    );

    return (
        <View className="rounded-[32px] bg-slate-900/80 px-4 py-4">
            <Column gap={3}>
                {/* <Column gap={1}>
                    <PoppinsText weight="bold" color="white">Pull down to search</PoppinsText>
                    <PoppinsText varient="subtext" color="white">
                        {normalizedQuery ? 'Find a bean to follow or visit.' : 'Your orbit lives here when the query is empty.'}
                    </PoppinsText>
                </Column> */}

                {!hideInput && (
                    <PoppinsTextInput
                        value={query}
                        onChangeText={onQueryChange}
                        placeholder="Search for users"
                        autoCapitalize="none"
                        autoCorrect={false}
                        className="rounded-2xl border border-border bg-background px-4 py-3 text-white"
                    />
                )}

                <Column gap={2}>
                    <PoppinsText weight="medium" color="white">
                        {isSearchMode ? 'Search results' : 'People you follow'}
                    </PoppinsText>

                    {visiblePeople.length > 0 ? (
                        visiblePeople.map((person) => (
                            <PersonListItem
                                key={person.userId}
                                person={person}
                                isFriend={isFriend(person.userId)}
                                onToggleFriend={toggleFriend}
                                onPress={onSelectUser}
                                currentUserId={resolvedCurrentUserId}
                            />
                        ))
                    ) : (
                        <View className="rounded-3xl border border-dashed border-border px-4 py-4">
                            <PoppinsText weight="medium" color="white">
                                {isSearchMode ? 'No one found.' : 'No follows yet. Try a search and build your crew.'}
                            </PoppinsText>
                        </View>
                    )}
                </Column>
            </Column>
        </View>
    );
};

export default UserSearchPanel;
