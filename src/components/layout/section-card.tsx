import { View, type ViewProps } from 'react-native';
import { PlatformColors } from '@/constants/colors';
import { ThemedText } from '@/components/ui/themed-text';

interface SectionCardProps extends ViewProps {
  /** Optional uppercase label shown above the card (iOS list section header style). */
  title?: string;
  children: React.ReactNode;
}

/**
 * iOS grouped list section card.
 * Render content (rows, settings items, etc.) inside for a native-feel layout.
 */
export function SectionCard({ title, children, style, ...props }: SectionCardProps) {
  return (
    <View style={[{ gap: 4 }, style]} {...props}>
      {title ? (
        <ThemedText
          variant="footnote"
          secondary
          style={{
            paddingHorizontal: 16,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {title}
        </ThemedText>
      ) : null}
      <View
        style={{
          backgroundColor: PlatformColors.secondarySystemGroupedBackground,
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {children}
      </View>
    </View>
  );
}
