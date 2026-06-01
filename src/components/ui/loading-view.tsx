import { ActivityIndicator, View } from 'react-native';
import { PlatformColors } from '@/constants/colors';
import { ThemedText } from './themed-text';

interface LoadingViewProps {
  message?: string;
  /** Expand to fill the parent (flex: 1). */
  fullscreen?: boolean;
}

export function LoadingView({ message, fullscreen = false }: LoadingViewProps) {
  return (
    <View
      style={{
        flex: fullscreen ? 1 : 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        gap: 12,
        backgroundColor: PlatformColors.systemBackground,
      }}
    >
      <ActivityIndicator color={PlatformColors.systemBlue} />
      {message ? (
        <ThemedText variant="footnote" secondary>
          {message}
        </ThemedText>
      ) : null}
    </View>
  );
}
