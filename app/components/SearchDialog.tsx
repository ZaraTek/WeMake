import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import PoppinsText from './ui/text/PoppinsText';
import AppButton from './ui/buttons/AppButton';
import StatusButton from './ui/StatusButton';
import UserSearchPanel from './social/UserSearchPanel';
import ConvexDialog from './ui/dialog/ConvexDialog';

type ClerkAuthSnapshot = {
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
    getToken: (options: { template?: 'convex'; skipCache?: boolean }) => Promise<string | null>;
    orgId: string | undefined | null;
    orgRole: string | undefined | null;
};

interface SearchDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSearch: (query: string) => void;
    currentUserId: string;
    onSelectUser: (userId: string) => void;
    auth: ClerkAuthSnapshot;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onOpenChange, onSearch, currentUserId, onSelectUser, auth }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            Keyboard.dismiss();
            onSearch(searchQuery.trim());
        }
    };

    const handleClose = () => {
        setSearchQuery('');
        onOpenChange(false);
    };

    return (
        <ConvexDialog.Root isOpen={isOpen} onOpenChange={onOpenChange}>
            <ConvexDialog.Portal>
                <ConvexDialog.Overlay />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ConvexDialog.Content auth={auth} className="w-[90vw] max-w-[500px] bg-background max-h-[80vh] px-4 py-4">
                        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                            <View className="gap-4">
                                <View className="flex-row items-center justify-between gap-2">
                                    <PoppinsText weight="bold" color="white">Search people</PoppinsText>
                                    <AppButton onPress={handleClose} className="w-12" variant="transparent">
                                        <PoppinsText color="white">✕</PoppinsText>
                                    </AppButton>
                                </View>

                                <View className="flex-row items-center gap-2">
                                    <TextInput
                                        ref={(input) => {
                                            if (input && isOpen) {
                                                setTimeout(() => input.focus(), 100);
                                            }
                                        }}
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        placeholder="Search..."
                                        placeholderTextColor="#888888"
                                        className="flex-1 rounded-lg border border-subtle-border bg-inner-background px-3 py-2 text-text"
                                    />
                                    {searchQuery.trim() ? (
                                        <AppButton 
                                            onPress={handleSearch}
                                            className="text-center justify-center w-20"
                                            variant='primary'
                                        >
                                            <PoppinsText className="text-white font-semibold">Search</PoppinsText>
                                        </AppButton>
                                    ) : (
                                        <StatusButton buttonText="Search" buttonAltText="Search" className=' w-20'/>
                                    )}
                                </View>

                                <UserSearchPanel
                                    currentUserId={currentUserId}
                                    query={searchQuery}
                                    onQueryChange={setSearchQuery}
                                    onSelectUser={(userId) => {
                                        onSelectUser(userId);
                                        handleClose();
                                    }}
                                    hideInput={true}
                                />
                            </View>
                        </ScrollView>
                    </ConvexDialog.Content>
                </KeyboardAvoidingView>
            </ConvexDialog.Portal>
        </ConvexDialog.Root>
    );
};

export default SearchDialog;
