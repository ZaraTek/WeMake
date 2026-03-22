import Svg, { Path, G, Circle } from 'react-native-svg';

interface ProfileIconProps {
  size?: number;
  color?: string;
}

export function ProfileIcon({ size = 24, color = 'white' }: ProfileIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Icon from Feather Icons by Cole Bemis - https://github.com/feathericons/feather/blob/master/LICENSE */}
      <G fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <Circle cx="12" cy="7" r="4" />
      </G>
    </Svg>
  );
}

export default ProfileIcon;
