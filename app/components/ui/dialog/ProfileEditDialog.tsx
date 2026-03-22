import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Image, Text } from 'react-native';
import { Dialog } from 'heroui-native';
import PoppinsText from '../text/PoppinsText';
import AppButton from '../buttons/AppButton';
import StatusButton from '../StatusButton';
import ModalAwareImageUpload from '../imageUpload/ModalAwareImageUpload';
import PoppinsTextInput from '../forms/PoppinsTextInput';
import { ConvexReactClient } from 'convex/react';
import { ConvexProvider } from 'convex/react';
import { useUserVariable } from '../../../../hooks/useUserVariable';
import type { ProfileData } from '../../../../types/profile';

interface ProfileEditDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onLoadingChange?: (loading: boolean) => void;
}

const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({
    isOpen,
    onOpenChange,
    onLoadingChange
}) => {
    const [profileData, setProfileData] = useUserVariable<ProfileData>({
        key: 'profileData',
        privacy: 'PUBLIC',
    });
    const [tempUsername, setTempUsername] = useState(profileData?.value?.username || '');
    const [tempPfpUrl, setTempPfpUrl] = useState(profileData?.value?.pfpUrl || '');
    const [tempBannerUrl, setTempBannerUrl] = useState(profileData?.value?.bannerUrl || '');
    const [pfpLoaded, setPfpLoaded] = useState(false);
    const [bannerLoaded, setBannerLoaded] = useState(false);
    const [loadingSequence, setLoadingSequence] = useState<'yes' | 'no' | 'yes-final'>('yes');
    const skipNextOpenResetRef = React.useRef(false);
    
    // Track when loading sequence should end
    const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);
    
    // Reset loading state when URLs change
    const [lastPfpUrl, setLastPfpUrl] = useState('');
    const [lastBannerUrl, setLastBannerUrl] = useState('');
    const resolvedTempPfpUrl = tempPfpUrl.trim();
    const profileValue = profileData?.value;
    const resolvedTempUsername = tempUsername.trim() || profileValue?.username || 'User';
    const displayName = profileValue?.name?.trim() || resolvedTempUsername;
    const profileInitial = displayName.charAt(0).toUpperCase();
    const isProfileDataReady = !profileData.state.isSyncing;
     
    // Check if images are loaded (both must be loaded)
    const imagesLoaded = pfpLoaded && bannerLoaded;
     
    // Check if save is allowed (yes-final state)
    const saveAllowed = isProfileDataReady && loadingSequence === 'yes-final';
     
    // Reset loading state when dialog opens and when new images are set
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        if (skipNextOpenResetRef.current) {
            skipNextOpenResetRef.current = false;
            return;
        }

        if (profileData.state.isSyncing) {
            return;
        }

        setTempUsername(profileValue?.username || '');
        setTempPfpUrl(profileValue?.pfpUrl || '');
        setTempBannerUrl(profileValue?.bannerUrl || '');
        setPfpLoaded(false);
        setBannerLoaded(false);
        setLoadingSequence('yes');
        setLastPfpUrl('');
        setLastBannerUrl('');
        
        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
            setLoadingTimeout(null);
        }
    }, [
        isOpen,
        loadingTimeout,
        profileData.state.isSyncing,
        profileValue?.username,
        profileValue?.pfpUrl,
        profileValue?.bannerUrl,
    ]);
    
    // Reset loading state when new images are set
    useEffect(() => {
        const currentPfpUrl = resolvedTempPfpUrl || '__blank__';
        if (currentPfpUrl !== lastPfpUrl) {
            setPfpLoaded(false);
            setLastPfpUrl(currentPfpUrl);
            
            // Start yes → no → yes sequence
            if (loadingSequence === 'yes-final') {
                setLoadingSequence('yes');
            }
            if (loadingSequence !== 'no') {
                setLoadingSequence('no');
                
                // Clear existing timeout
                if (loadingTimeout) {
                    clearTimeout(loadingTimeout);
                }
                
                // Set 3-second timeout to go to yes-final
                const timeout = setTimeout(() => {
                    setLoadingSequence('yes-final');
                    setLoadingTimeout(null);
                }, 3000);
                setLoadingTimeout(timeout);
            }
        }
    }, [resolvedTempPfpUrl, lastPfpUrl, loadingSequence]);

    useEffect(() => {
        if (!resolvedTempPfpUrl) {
            setPfpLoaded(true);
        }
    }, [resolvedTempPfpUrl]);
    
    useEffect(() => {
        if (tempBannerUrl !== lastBannerUrl) {
            setBannerLoaded(false);
            setLastBannerUrl(tempBannerUrl);
            
            // Start yes → no → yes sequence
            if (loadingSequence === 'yes-final') {
                setLoadingSequence('yes');
            }
            if (loadingSequence !== 'no') {
                setLoadingSequence('no');
                
                // Clear existing timeout
                if (loadingTimeout) {
                    clearTimeout(loadingTimeout);
                }
                
                // Set 3-second timeout to go to yes-final
                const timeout = setTimeout(() => {
                    setLoadingSequence('yes-final');
                    setLoadingTimeout(null);
                }, 3000);
                setLoadingTimeout(timeout);
            }
        }
    }, [tempBannerUrl, lastBannerUrl, loadingSequence]);
    
    // Create a new Convex client for the dialog since it renders outside the main provider
    const convexClient = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);
    
    const handlePickerOpen = () => {
        skipNextOpenResetRef.current = true;
        // Close dialog temporarily when opening image picker
        onLoadingChange?.(true);
        onOpenChange(false);
    };
    
    const handlePickerClose = () => {
        // Reopen dialog after image picker closes
        onLoadingChange?.(false);
        onOpenChange(true);
    };
    
    const handleSave = () => {
        if (!isProfileDataReady) {
            return;
        }

        const latestProfile = profileValue ?? profileData?.confirmedValue ?? { username: 'User' };
        const normalizedUsername = tempUsername.trim() || latestProfile.username || 'User';
        const updatedProfile: ProfileData = {
            ...latestProfile,
            username: normalizedUsername,
            pfpUrl: tempPfpUrl,
            bannerUrl: tempBannerUrl
        };
        setProfileData(updatedProfile);
        onOpenChange(false);
    };
    
    return (
        <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal className='bg-black/50'>
                <Dialog.Overlay />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Dialog.Content className="max-h-[80vh] w-[90vw] max-w-[500px] bg-background">
                        <Dialog.Close className='bg-grey'/>
                        <View className="mb-4 gap-2">
                            {/* <Dialog.Title>
                                <PoppinsText className="text-2xl font-bold">Edit Profile</PoppinsText>
                            </Dialog.Title> */}
                            {/* <Dialog.Description>
                                <PoppinsText className="text-muted-text">
                                    Update your username, profile picture and banner
                                </PoppinsText>
                            </Dialog.Description> */}
                        </View>

                        <View className="mb-4 gap-2">
                            <PoppinsText className="text-lg font-semibold">Username</PoppinsText>
                            <PoppinsTextInput
                                value={tempUsername}
                                onChangeText={setTempUsername}
                                placeholder="Username"
                                autoCapitalize="none"
                                autoCorrect={false}
                                className="w-full"
                            />
                        </View>
                        
                        <View className="mb-4">
                            <PoppinsText className="text-lg font-semibold mb-2">Preview</PoppinsText>
                            <View className="bg-inner-background rounded-lg overflow-hidden relative" style={{ aspectRatio: 16 / 9 }}>
                                {/* Banner */}
                                <Image
                                    source={{ 
                                        uri: tempBannerUrl || "https://via.placeholder.com/800x450/4A148C/FFFFFF?text=Banner"
                                    }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                    onLoad={() => setBannerLoaded(true)}
                                    onError={() => setBannerLoaded(true)} // Consider fallback as "loaded"
                                />
                                
                                {/* Profile Picture Overlay */}
                                <View className="absolute bottom-2 left-2">
                                    {resolvedTempPfpUrl ? (
                                        <Image
                                            source={{ 
                                                uri: resolvedTempPfpUrl
                                            }}
                                            style={{ 
                                                width: 60, 
                                                height: 60, 
                                                borderRadius: 30, 
                                                borderWidth: 2, 
                                                borderColor: "#A082FF" 
                                            }}
                                            onLoad={() => setPfpLoaded(true)}
                                            onError={() => setPfpLoaded(true)}
                                        />
                                    ) : (
                                        <View
                                            className="items-center justify-center bg-gray-500"
                                            style={{ 
                                                width: 60, 
                                                height: 60, 
                                                borderRadius: 30, 
                                                borderWidth: 2, 
                                                borderColor: "#A082FF" 
                                            }}
                                        >
                                            <Text className="text-white text-2xl font-bold">{profileInitial}</Text>
                                        </View>
                                    )}
                                </View>
                                
                                {/* Username */}
                                <View className="absolute bottom-2 right-2">
                                    <Text className="text-white text-2xl font-bold">
                                        {resolvedTempUsername}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        
                        {/* Upload Sections */}
                        <View >
                            <View>

                                <ConvexProvider client={convexClient}>
                                    <ModalAwareImageUpload
                                        url={tempPfpUrl}
                                        setUrl={setTempPfpUrl}
                                        buttonLabel="Change Profile"
                                        disabled={!isProfileDataReady}
                                        onPickerOpen={handlePickerOpen}
                                        onPickerClose={handlePickerClose}
                                    />
                                </ConvexProvider>
                            </View>
                            
                            <View className=''>
                                
                                <ConvexProvider client={convexClient}>
                                    <ModalAwareImageUpload
                                        url={tempBannerUrl}
                                        setUrl={setTempBannerUrl}
                                        buttonLabel="Change Banner"
                                        disabled={!isProfileDataReady}
                                        onPickerOpen={handlePickerOpen}
                                        onPickerClose={handlePickerClose}
                                    />
                                </ConvexProvider>
                            </View>
                        </View>

                        <View className="flex-row justify-end gap-3 mt-6">
                            {saveAllowed ? (
                                <AppButton 
                                    variant="primary" 
                                    onPress={handleSave}
                                    className="px-6"
                                >
                                    <PoppinsText>Save Changes</PoppinsText>
                                </AppButton>
                            ) : (
                                <StatusButton 
                                    buttonText="Save Changes" 
                                    buttonAltText="LOADING..." 
                                    className="px-6 w-full" 
                                />
                            )}
                        </View>
                    </Dialog.Content>
                </KeyboardAvoidingView>
            </Dialog.Portal>
        </Dialog>
    );
};

export default ProfileEditDialog;
