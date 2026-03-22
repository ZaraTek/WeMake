import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import ConvexDialog from './ui/dialog/ConvexDialog';
import AppButton from './ui/buttons/AppButton';
import PoppinsText from './ui/text/PoppinsText';
import OtherUserProfile from './OtherUserProfile';

type ClerkAuthSnapshot = {
    isLoaded: boolean;
    isSignedIn: boolean | undefined;
    getToken: (options: { template?: 'convex'; skipCache?: boolean }) => Promise<string | null>;
    orgId: string | undefined | null;
    orgRole: string | undefined | null;
};

interface OtherUserDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    userId: string | null;
    auth: ClerkAuthSnapshot;
    onBackToSearch: () => void;
}

const OtherUserDialog = ({ isOpen, onOpenChange, userId, auth, onBackToSearch }: OtherUserDialogProps) => {
    return (
        <ConvexDialog.Root isOpen={isOpen} onOpenChange={onOpenChange}>
            <ConvexDialog.Portal>
                <ConvexDialog.Overlay />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ConvexDialog.Content auth={auth} className="w-[92vw] max-w-[700px] bg-background max-h-[85vh] px-0 py-0">
                        <View className="absolute top-2 right-2 z-50">
                            <View className="flex-row items-center justify-end">
                                <AppButton onPress={onBackToSearch} className="w-12" variant="transparent">
                                    <PoppinsText color="white">✕</PoppinsText>
                                </AppButton>
                            </View>
                        </View>
                        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} className=' h-[70vh] w-full overflow-clip rounded-lg'>


                            {userId ? (
                                <OtherUserProfile userId={userId} onBack={() => onOpenChange(false)} showBackButton={false} />
                            ) : null}
                        </ScrollView>
                    </ConvexDialog.Content>
                </KeyboardAvoidingView>
            </ConvexDialog.Portal>
        </ConvexDialog.Root>
    );
};

export default OtherUserDialog;
