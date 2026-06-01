import { Pressable, View } from 'react-native';
import { PlatformColors } from '@/constants/colors';
import { ThemedText } from './themed-text';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorView({ message = '加载失败，请重试', onRetry }: ErrorViewProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        gap: 16,
      }}
    >
      <ThemedText
        variant="headline"
        style={{ color: PlatformColors.systemRed, textAlign: 'center' }}
      >
        {message}
      </ThemedText>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <ThemedText
            variant="callout"
            style={{ color: PlatformColors.systemBlue }}
          >
            重试
          </ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}
