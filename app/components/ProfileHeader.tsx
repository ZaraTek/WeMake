import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import type { ProfileData } from "../../types/profile";
import { Edit } from "lucide-react-native";

interface ProfileHeaderProps {
  profileData?: ProfileData;
  className?: string;
  showEditButtons?: boolean;
  onEditPfp?: () => void;
  onEditBanner?: () => void;
  height?: number;
}

const ProfileHeader = ({ 
  profileData, 
  className = "", 
  showEditButtons = false,
  onEditPfp,
  onEditBanner,
  height = 80
}: ProfileHeaderProps) => {
  const fallbackBanner = "https://via.placeholder.com/800x450/4A148C/FFFFFF?text=Banner";
  const fallbackPfp = "https://via.placeholder.com/100x100/4A148C/FFFFFF?text=PFP";
  const fallbackUsername = "User";
  
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [pfpLoaded, setPfpLoaded] = useState(false);
  const [lastBannerUrl, setLastBannerUrl] = useState('');
  const [lastPfpUrl, setLastPfpUrl] = useState('');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  
  // Check if both images are loaded AND we've completed at least one load cycle
  const imagesLoaded = bannerLoaded && pfpLoaded && hasLoadedOnce;
  
  // Reset loading state when URLs change
  useEffect(() => {
    const currentBannerUrl = profileData?.bannerUrl || fallbackBanner;
    if (currentBannerUrl !== lastBannerUrl) {
      setBannerLoaded(false);
      setHasLoadedOnce(false);
      setLastBannerUrl(currentBannerUrl);
    }
  }, [profileData?.bannerUrl, lastBannerUrl, fallbackBanner]);
  
  useEffect(() => {
    const currentPfpUrl = profileData?.pfpUrl || fallbackPfp;
    if (currentPfpUrl !== lastPfpUrl) {
      setPfpLoaded(false);
      setHasLoadedOnce(false);
      setLastPfpUrl(currentPfpUrl);
    }
  }, [profileData?.pfpUrl, lastPfpUrl, fallbackPfp]);

  return (
    <View 
      className={`w-full bg-inner-background overflow-hidden mb-4 pt-0 -mt-16 ${className}`}
      
    >
      {/* Banner + overlay content */}
      <View className="w-full">
        <Image
          source={{ uri: profileData?.bannerUrl || fallbackBanner }}
          // className="w-full"
          style={{ height, aspectRatio: 16 / 9 }}
          resizeMode="cover"
          onLoad={() => {
            setBannerLoaded(true);
            if (pfpLoaded) {
              setHasLoadedOnce(true);
            }
          }}
          onError={() => {
            setBannerLoaded(true);
            if (pfpLoaded) {
              setHasLoadedOnce(true);
            }
          }} // Consider fallback as "loaded"
        />
        {showEditButtons && imagesLoaded && (
          <TouchableOpacity
            onPress={onEditBanner}
            className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-full z-50"
            style={{ zIndex: 50 }}
          >
            <Edit size={16} color="white" />
          </TouchableOpacity>
        )}

        {/* Avatar + Info overlaid on banner */}
        <View className="absolute bottom-0 left-0 right-0 px-4 pb-3 flex-row items-end">
          <View className="relative">
            <Image
              source={{ uri: profileData?.pfpUrl || fallbackPfp }}
              style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: "#A082FF" }}
              onLoad={() => {
                setPfpLoaded(true);
                if (bannerLoaded) {
                  setHasLoadedOnce(true);
                }
              }}
              onError={() => {
                setPfpLoaded(true);
                if (bannerLoaded) {
                  setHasLoadedOnce(true);
                }
              }} // Consider fallback as "loaded"
            />
            {showEditButtons && imagesLoaded && (
              <TouchableOpacity
                onPress={onEditPfp}
                className="absolute bottom-0 right-0 bg-black/50 p-1.5 rounded-full z-50"
                style={{ zIndex: 50 }}
              >
                <Edit size={12} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex-1 mb-1 items-end">
            <Text className="text-text text-5xl" numberOfLines={1}>{profileData?.username || fallbackUsername}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;