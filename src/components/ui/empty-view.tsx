import { View } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from './themed-text';

interface EmptyViewProps {
  title?: string;
  description?: string;
  /** SF Symbol name to display above the title. */
  icon?: string;
}

export function EmptyView({
  title = '暂无数据',
  description,
  icon,
}: EmptyViewProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        gap: 8,
      }}
    >
      {icon ? (
        <Image
          source={`sf:${icon}`}
          style={{ width: 48, height: 48, opacity: 0.35 }}
          contentFit="contain"
        />
      ) : null}
      <ThemedText variant="headline" style={{ textAlign: 'center' }}>
        {title}
      </ThemedText>
      {description ? (
        <ThemedText variant="subheadline" secondary style={{ textAlign: 'center' }}>
          {description}
        </ThemedText>
      ) : null}
    </View>
  );
}
