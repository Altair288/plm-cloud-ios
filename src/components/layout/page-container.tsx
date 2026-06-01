import { ScrollView, type ScrollViewProps } from 'react-native';

interface PageContainerProps extends ScrollViewProps {
  children: React.ReactNode;
}

/**
 * Standard full-page wrapper.
 * Uses ScrollView with `contentInsetAdjustmentBehavior="automatic"` so that
 * the large-title header and tab bar insets are handled automatically by iOS.
 */
export function PageContainer({
  children,
  style,
  contentContainerStyle,
  ...props
}: PageContainerProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[{ flex: 1 }, style]}
      contentContainerStyle={[{ padding: 16, gap: 12 }, contentContainerStyle]}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
