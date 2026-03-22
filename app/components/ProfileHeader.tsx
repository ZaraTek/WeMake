import { View, Text, Image } from "react-native";
import type { ProfileData } from "../../types/profile";

const ProfileHeader = ({ profileData, className = "" }: { profileData: ProfileData; className?: string }) => {
  return (
    <View className={`w-full bg-inner-background overflow-hidden mb-4 pt-0 -mt-16 ${className}`}>
      {/* Banner + overlay content */}
      <View className="w-full">
        {profileData.bannerUrl && (
          <Image
            source={{ uri: profileData.bannerUrl }}
            className="w-full"
            style={{ aspectRatio: 16 / 9 }}
            resizeMode="cover"
          />
        )}

        {/* Avatar + Info overlaid on banner */}
        <View className="absolute bottom-0 left-0 right-0 px-4 pb-3 flex-row items-end">
          <Image
            source={{ uri: profileData.pfpUrl }}
            style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: "#A082FF" }}
          />
          <View className="flex-1 mb-1 items-end">
            <Text className="text-text text-5xl" numberOfLines={1}>{profileData.username}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;