import { Text, type TextProps } from 'react-native';
import { PlatformColors } from '@/constants/colors';
import { Typography, type TypographyVariant } from '@/constants/typography';

interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant;
  /** Use secondaryLabel colour instead of primary label. */
  secondary?: boolean;
}

export function ThemedText({
  variant = 'body',
  secondary = false,
  style,
  ...props
}: ThemedTextProps) {
  return (
    <Text
      style={[
        Typography[variant],
        { color: secondary ? PlatformColors.secondaryLabel : PlatformColors.label },
        style,
      ]}
      {...props}
    />
  );
}
