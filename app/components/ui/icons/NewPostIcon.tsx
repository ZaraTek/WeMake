import Svg, { Path, G, Rect } from 'react-native-svg';

interface NewPostIconProps {
  size?: number;
  color?: string;
}

export function NewPostIcon({ size = 24, color = 'white' }: NewPostIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Icon from Feather Icons by Cole Bemis - https://github.com/feathericons/feather/blob/master/LICENSE */}
      <G fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <Rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <Path d="M12 8v8m-4-4h8" />
      </G>
    </Svg>
  );
}
