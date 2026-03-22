import React from 'react';
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
  const fallbackUsername = "User";

  const resolvedPfpUrl = profileData?.pfpUrl?.trim() || "";
  const displayName = profileData?.name?.trim() || profileData?.username || fallbackUsername;
  const profileInitial = displayName.charAt(0).toUpperCase();

  return (
    <View 
      className={`w-full bg-inner-background overflow-hidden mb-4 pt-0 -mt-16 ${className}`}
    >
      {/* Banner + overlay content */}
      <View className="w-full">
        <Image
          source={{ uri: profileData?.bannerUrl || fallbackBanner }}
          style={{ height, aspectRatio: 16 / 9 }}
          resizeMode="cover"
        />
        {showEditButtons && (
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
            {resolvedPfpUrl ? (
              <Image
                source={{ uri: resolvedPfpUrl }}
                style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: "#A082FF" }}
              />
            ) : (
              <View
                style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: "#A082FF" }}
                className="bg-gray-500 items-center justify-center"
              >
                <Text className="text-white text-4xl font-semibold">{profileInitial}</Text>
              </View>
            )}
            {showEditButtons && (
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