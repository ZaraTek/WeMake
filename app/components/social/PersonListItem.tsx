import React from 'react';
import { Image, Pressable, View } from 'react-native';
import type { PersonRecord } from '../../lib/people';
import { useUserVariableGet } from '../../../hooks/useUserVariableGet';
import type { ProfileData } from '../../../types/profile';
import AppButton from '../ui/buttons/AppButton';
import Row from '../layout/Row';
import Column from '../layout/Column';
import PoppinsText from '../ui/text/PoppinsText';

interface PersonListItemProps {
    person: PersonRecord;
    isFriend: boolean;
    onToggleFriend?: (userId: string) => void;
    onPress?: (userId: string) => void;
    ctaLabel?: string;
    currentUserId?: string;
}

const PersonListItem = ({
    person,
    isFriend,
    onToggleFriend,
    onPress,
    ctaLabel,
    currentUserId,
}: PersonListItemProps) => {
    const profileRecord = useUserVariableGet<ProfileData>({
        key: 'profileData',
        userIds: [person.userId],
    });
    const profile = profileRecord?.[0]?.value;
    const pfpUrl = person.pfpUrl || profile?.pfpUrl;

    const displayName = person.name || person.username;
    const displayHandle = person.username || displayName;
    const buttonLabel = ctaLabel ?? (isFriend ? 'Following' : 'Follow');

    return (
        <Column>
            <Row className="items-center justify-between rounded-3xl border border-subtle-border bg-inner-background/90 px-4 py-3" gap={3}>
                <Pressable className="flex-1" onPress={() => onPress?.(person.userId)}>
                    <Row className="items-center" gap={3}>
                        {pfpUrl ? (
                            <Image
                                source={{ uri: pfpUrl }}
                                className="h-14 w-14 rounded-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="h-14 w-14 items-center justify-center rounded-full bg-primary-accent/20 border border-primary-accent/30">
                                <PoppinsText weight="bold" color="white">{displayHandle.slice(0, 1).toUpperCase()}</PoppinsText>
                            </View>
                        )}

                        <Column gap={0} className="flex-1">
                            <PoppinsText weight="bold" color="white">{displayName}</PoppinsText>
                            <PoppinsText varient="subtext" color="white">@{displayHandle}</PoppinsText>
                            {/* <PoppinsText varient="subtext" color="white" className="text-xs">{pfpUrl || 'no pfpUrl'}</PoppinsText>
                            <PoppinsText varient="subtext" color="white" className="text-xs">userId: {person.userId}</PoppinsText> */}
                        </Column>
                    </Row>
                </Pressable>

                {onToggleFriend && (
                    <AppButton
                        variant={isFriend ? 'outline' : 'primary'}
                        className="w-20"
                        onPress={() => onToggleFriend(person.userId)}
                    >
                        <PoppinsText color="white">{buttonLabel}</PoppinsText>
                    </AppButton>
                )}
            </Row>
        </Column>
    );
};

export default PersonListItem;
