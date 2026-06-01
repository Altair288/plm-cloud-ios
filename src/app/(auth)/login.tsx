import { View } from 'react-native';
import { PlatformColors } from '@/constants/colors';
import { ThemedText } from '@/components/ui/themed-text';

/**
 * Login screen.
 * Implementation pending – auth flow, RSA encryption and API integration
 * will be added in a dedicated feature sprint.
 */
export default function LoginScreen() {
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
      <ThemedText variant="title2">PLM Cloud</ThemedText>
      <ThemedText variant="body" secondary>
        登录页面（待实现）
      </ThemedText>
    </View>
  );
}
