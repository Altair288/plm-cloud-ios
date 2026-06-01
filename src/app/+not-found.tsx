import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { PlatformColors } from '@/constants/colors';
import { ThemedText } from '@/components/ui/themed-text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '页面不存在' }} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: PlatformColors.systemBackground,
          gap: 16,
        }}
      >
        <ThemedText variant="title3">页面不存在</ThemedText>
        <Link href={'/home' as never}>
          <ThemedText variant="callout" style={{ color: PlatformColors.systemBlue }}>
            返回首页
          </ThemedText>
        </Link>
      </View>
    </>
  );
}

