import Svg, { Path, G } from 'react-native-svg';

interface FeedIconProps {
  size?: number;
  color?: string;
}

export function FeedIcon({ size = 24, color = 'white' }: FeedIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Icon from Feather Icons by Cole Bemis - https://github.com/feathericons/feather/blob/master/LICENSE */}
      <G fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <Path d="m3 9l9-7l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <Path d="M9 22V12h6v10" />
      </G>
    </Svg>
  );
}

export default FeedIcon;
