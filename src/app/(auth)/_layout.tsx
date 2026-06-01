import { Stack } from 'expo-router/stack';
import { PlatformColor } from 'react-native';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerTitleStyle: { color: PlatformColor('label') as unknown as string },
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="workspace-select" options={{ title: '选择工作空间' }} />
    </Stack>
  );
}
