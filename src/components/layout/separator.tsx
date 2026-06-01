import { View, type ViewStyle } from 'react-native';
import { PlatformColors } from '@/constants/colors';

interface SeparatorProps {
  style?: ViewStyle;
  /** Indent from the left edge (e.g. to align with list row text). */
  inset?: number;
}

/** Thin horizontal separator line, matching iOS list row dividers. */
export function Separator({ inset = 0, style }: SeparatorProps) {
  return (
    <View
      style={[
        {
          height: 0.5,
          backgroundColor: PlatformColors.separator,
          marginLeft: inset,
        },
        style,
      ]}
    />
  );
}
