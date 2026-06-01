import { View } from 'react-native';
import { PlatformColors } from '@/constants/colors';
import { ThemedText } from '@/components/ui/themed-text';

/**
 * Workspace selection screen.
 * Shown when the user is authenticated but has no active workspace session.
 * Implementation pending.
 */
export default function WorkspaceSelectScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PlatformColors.systemBackground,
        gap: 8,
      }}
    >
      <ThemedText variant="title3">选择工作空间</ThemedText>
      <ThemedText variant="body" secondary>
        工作空间选择（待实现）
      </ThemedText>
    </View>
  );
}
