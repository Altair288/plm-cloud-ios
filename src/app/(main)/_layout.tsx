import { Redirect } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { LoadingView } from '@/components/ui/loading-view';
import { useAuthGuard } from '@/hooks/use-auth';

/**
 * Main app layout – four native iOS tabs.
 * Protected: redirects to auth screens if the user is not ready.
 */
export default function MainLayout() {
  const { isReady, redirectTo } = useAuthGuard();

  if (!isReady) return <LoadingView fullscreen />;
  if (redirectTo) return <Redirect href={redirectTo as never} />;

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Icon sf="house" />
        <NativeTabs.Trigger.Label>工作台</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="products">
        <NativeTabs.Trigger.Icon sf="cube.box" />
        <NativeTabs.Trigger.Label>产品</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="tasks">
        <NativeTabs.Trigger.Icon sf="checkmark.circle" />
        <NativeTabs.Trigger.Label>任务</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon sf="person.circle" />
        <NativeTabs.Trigger.Label>我的</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

