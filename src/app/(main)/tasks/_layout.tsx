import { Stack } from 'expo-router/stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const sharedScreenOptions: NativeStackNavigationOptions = {
  headerLargeTitle: true,
  headerTransparent: true,
  headerShadowVisible: false,
  headerLargeTitleShadowVisible: false,
  headerLargeStyle: { backgroundColor: 'transparent' },
  headerBlurEffect: 'systemMaterial',
  headerBackButtonDisplayMode: 'minimal',
};

export default function TasksLayout() {
  return (
    <Stack screenOptions={sharedScreenOptions}>
      <Stack.Screen name="index" options={{ title: '任务' }} />
    </Stack>
  );
}
