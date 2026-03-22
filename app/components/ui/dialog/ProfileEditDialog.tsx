import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Image, Text } from 'react-native';
import { Dialog } from 'heroui-native';
import PoppinsText from '../text/PoppinsText';
import AppButton from '../buttons/AppButton';
import StatusButton from '../StatusButton';
import ModalAwareImageUpload from '../imageUpload/ModalAwareImageUpload';
import { Dispatch, SetStateAction } from 'react';
import { ConvexReactClient } from 'convex/react';
import { ConvexProvider } from 'convex/react';
import type { ProfileData } from '../../../../types/profile';

interface ProfileEditDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    profileData?: ProfileData;
    onSave: (updatedProfile: ProfileData) => void;
    onLoadingChange?: (loading: boolean) => void;
}

const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({
    isOpen,
    onOpenChange,
    profileData,
    onSave,
    onLoadingChange
}) => {
    const [tempPfpUrl, setTempPfpUrl] = useState(profileData?.pfpUrl || '');
    const [tempBannerUrl, setTempBannerUrl] = useState(profileData?.bannerUrl || '');
    const [pfpLoaded, setPfpLoaded] = useState(false);
    const [bannerLoaded, setBannerLoaded] = useState(false);
    const [loadingSequence, setLoadingSequence] = useState<'yes' | 'no' | 'yes-final'>('yes');
    
    // Track when loading sequence should end
    const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);
    
    // Reset loading state when URLs change
    const [lastPfpUrl, setLastPfpUrl] = useState('');
    const [lastBannerUrl, setLastBannerUrl] = useState('');
    
    // Check if images are loaded (both must be loaded)
    const imagesLoaded = pfpLoaded && bannerLoaded;
    
    // Check if save is allowed (yes-final state)
    const saveAllowed = loadingSequence === 'yes-final';
    
    // Reset loading state when dialog opens and when new images are set
    React.useEffect(() => {
        if (isOpen) {
            setTempPfpUrl(profileData?.pfpUrl || '');
            setTempBannerUrl(profileData?.bannerUrl || '');
            // Reset loading state when dialog opens
            setPfpLoaded(false);
            setBannerLoaded(false);
            setLoadingSequence('yes'); // Start with yes
            setLastPfpUrl('');
            setLastBannerUrl('');
            
            // Clear any existing timeout
            if (loadingTimeout) {
                clearTimeout(loadingTimeout);
                setLoadingTimeout(null);
            }
        }
    }, [isOpen, profileData?.pfpUrl, profileData?.bannerUrl]);
    
    // Reset loading state when new images are set
    React.useEffect(() => {
        if (tempPfpUrl !== lastPfpUrl) {
            setPfpLoaded(false);
            setLastPfpUrl(tempPfpUrl);
            
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
    }, [tempPfpUrl, lastPfpUrl, loadingSequence]);
    
    React.useEffect(() => {
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
        const updatedProfile: ProfileData = {
            username: profileData?.username || '',
            pfpUrl: tempPfpUrl,
            bannerUrl: tempBannerUrl
        };
        onSave(updatedProfile);
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
                            <Dialog.Title>
                                <PoppinsText className="text-2xl font-bold">Edit Profile</PoppinsText>
                            </Dialog.Title>
                            <Dialog.Description>
                                <PoppinsText className="text-muted-text">
                                    Update your profile picture and banner
                                </PoppinsText>
                            </Dialog.Description>
                        </View>
                        
                        {/* Preview Section */}
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
                                    <Image
                                        source={{ 
                                            uri: tempPfpUrl || "https://via.placeholder.com/100x100/4A148C/FFFFFF?text=PFP"
                                        }}
                                        style={{ 
                                            width: 60, 
                                            height: 60, 
                                            borderRadius: 30, 
                                            borderWidth: 2, 
                                            borderColor: "#A082FF" 
                                        }}
                                        onLoad={() => setPfpLoaded(true)}
                                        onError={() => setPfpLoaded(true)} // Consider fallback as "loaded"
                                    />
                                </View>
                                
                                {/* Username */}
                                <View className="absolute bottom-2 right-2">
                                    <Text className="text-white text-2xl font-bold">
                                        {profileData?.username || "User"}
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
