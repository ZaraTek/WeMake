import type { UserVariableRecord } from '../../hooks/useUserVariable';
import type { ProfileData } from '../../types/profile';
import type { UserData } from '../../types/userData';
import React from 'react';

export type PersonRecord = {
    userId: string;
    name: string;
    username: string;
    pfpUrl?: string;
    bannerUrl?: string;
    profile?: ProfileData;
    userData?: UserData;
};

const fallbackUsername = (name?: string, userId?: string) => {
    const firstName = name?.trim().split(/\s+/)[0];

    if (firstName) {
        return firstName;
    }

    if (userId) {
        return userId.slice(0, 8);
    }

    return 'beanpal';
};

const getUserIdFromUserRecord = (record?: UserVariableRecord<UserData>) => record?.value?.userId ?? record?.userToken ?? '';
const getUserIdFromProfileRecord = (record?: UserVariableRecord<ProfileData>) => record?.userToken ?? '';

export const mergePeopleRecords = ({
    profileRecords = [],
    userRecords = [],
    excludeUserIds = [],
}: {
    profileRecords?: UserVariableRecord<ProfileData>[];
    userRecords?: UserVariableRecord<UserData>[];
    excludeUserIds?: string[];
}) => {
    const excluded = new Set(excludeUserIds);
    const peopleMap = new Map<string, PersonRecord>();

    userRecords.forEach((record) => {
        const userId = getUserIdFromUserRecord(record);

        if (!userId || excluded.has(userId)) {
            return;
        }

        peopleMap.set(userId, {
            userId,
            name: record.value?.name?.trim() || '',
            username: fallbackUsername(record.value?.name, userId),
            userData: record.value,
        });
    });

    profileRecords.forEach((record) => {
        const userId = getUserIdFromProfileRecord(record);

        if (!userId || excluded.has(userId)) {
            return;
        }

        const existing = peopleMap.get(userId);
        const profileName = record.value?.name?.trim() || existing?.name || '';
        const username = record.value?.username?.trim() || existing?.username || fallbackUsername(profileName, userId);

        peopleMap.set(userId, {
            userId,
            name: profileName,
            username,
            pfpUrl: record.value?.pfpUrl || existing?.pfpUrl,
            bannerUrl: record.value?.bannerUrl || existing?.bannerUrl,
            profile: record.value,
            userData: existing?.userData,
        });
    });

    return Array.from(peopleMap.values());
};

export const sortPeopleByQuery = (people: PersonRecord[], query: string) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return [...people].sort((left, right) => (left.name || left.username).localeCompare(right.name || right.username));
    }

    const scorePerson = (person: PersonRecord) => {
        const name = person.name.toLowerCase();
        const username = person.username.toLowerCase();

        if (username === normalizedQuery || name === normalizedQuery) {
            return 4;
        }

        if (username.startsWith(normalizedQuery) || name.startsWith(normalizedQuery)) {
            return 3;
        }

        if (username.includes(normalizedQuery)) {
            return 2;
        }

        if (name.includes(normalizedQuery)) {
            return 1;
        }

        return 0;
    };

    return [...people].sort((left, right) => {
        const scoreDifference = scorePerson(right) - scorePerson(left);

        if (scoreDifference !== 0) {
            return scoreDifference;
        }

        return (left.name || left.username).localeCompare(right.name || right.username);
    });
};

// Default export to satisfy routing warning
export default function PeopleUtility() {
    return null;
}
