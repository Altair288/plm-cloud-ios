import { Redirect } from 'expo-router';
import { LoadingView } from '@/components/ui/loading-view';
import { useAuthGuard } from '@/hooks/use-auth';

/**
 * Entry point. Redirects based on auth + workspace state.
 *
 *  Not hydrated yet  → loading screen (prevents flash-of-login)
 *  No platform token → /(auth)/login
 *  No workspace      → /(auth)/workspace-select
 *  Ready             → /(main)
 */
export default function Index() {
  const { isReady, redirectTo } = useAuthGuard();

  if (!isReady) return <LoadingView fullscreen />;
  if (redirectTo) return <Redirect href={redirectTo as never} />;
  return <Redirect href={'/home' as never} />;
}
