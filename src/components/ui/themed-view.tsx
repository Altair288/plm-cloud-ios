import { View, type ViewProps } from 'react-native';
import { PlatformColors } from '@/constants/colors';

interface ThemedViewProps extends ViewProps {
  /** Apply systemGroupedBackground instead of the default systemBackground. */
  grouped?: boolean;
  /** Apply secondarySystemBackground (e.g. a card nested in a list). */
  secondary?: boolean;
}

export function ThemedView({
  grouped = false,
  secondary = false,
  style,
  ...props
}: ThemedViewProps) {
  const bg = grouped
    ? PlatformColors.systemGroupedBackground
    : secondary
      ? PlatformColors.secondarySystemBackground
      : PlatformColors.systemBackground;

  return <View style={[{ backgroundColor: bg }, style]} {...props} />;
}
