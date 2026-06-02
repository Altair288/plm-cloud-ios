import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { BrandColors, PlatformColors } from '@/constants/colors';
import { ThemedText } from '@/components/ui/themed-text';
import { useHaptics } from '@/hooks/use-haptics';
import { useAuthStore } from '@/store/auth';

export default function LoginScreen() {
  const [loginId, setLoginId] = useState('admin@plm.cloud');
  const [password, setPassword] = useState('plmcloud');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const haptics = useHaptics();
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  const handleLogin = () => {
    if (!loginId.trim() || !password.trim()) {
      setErrorMessage('请输入账号和密码');
      haptics.error();
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    haptics.selection();

    setTimeout(() => {
      const workspaceToken = `mock-workspace-token-${Date.now()}`;

      setTokens({
        platformToken: `mock-platform-token-${Date.now()}`,
        platformTokenName: 'PLM_PLATFORM_TOKEN',
        workspaceToken,
        workspaceTokenName: 'PLM_WORKSPACE_TOKEN',
      });
      setUserInfo({
        userId: 'mock-user-001',
        displayName: '平台管理员',
        email: loginId.trim(),
        principalType: 'PLATFORM_ADMIN',
        firstLogin: false,
        currentWorkspace: {
          workspaceId: 'mock-workspace-001',
          workspaceCode: 'PLM-DEMO',
          workspaceName: 'PLM Cloud 演示空间',
          workspaceToken,
          workspaceTokenName: 'PLM_WORKSPACE_TOKEN',
          roleCode: 'OWNER',
          roleName: '空间管理员',
        },
      });
      setIsSubmitting(false);
      haptics.success();
      router.replace('/home' as never);
    }, 650);
  };

  return (
    <KeyboardAvoidingView
      behavior={process.env.EXPO_OS === 'ios' ? 'padding' : undefined}
      style={{
        flex: 1,
        backgroundColor: PlatformColors.systemBackground,
      }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 24,
          gap: 28,
        }}
      >
        <View style={{ gap: 16 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              borderCurve: 'continuous',
              backgroundColor: BrandColors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 24px rgba(10, 132, 255, 0.24)',
            }}
          >
            <Image
              source="sf:cube.transparent"
              style={{ width: 34, height: 34, tintColor: '#FFFFFF' }}
              contentFit="contain"
            />
          </View>
          <View style={{ gap: 6 }}>
            <ThemedText variant="largeTitle">PLM Cloud</ThemedText>
            <ThemedText variant="body" secondary>
              登录到移动工作台，查看产品、任务与数据建设进度。
            </ThemedText>
          </View>
        </View>

        <View
          style={{
            backgroundColor: PlatformColors.secondarySystemGroupedBackground,
            borderRadius: 18,
            borderCurve: 'continuous',
            overflow: 'hidden',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
          }}
        >
          <View style={{ padding: 16, gap: 8 }}>
            <ThemedText variant="footnote" secondary>
              账号
            </ThemedText>
            <TextInput
              value={loginId}
              onChangeText={setLoginId}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="邮箱或用户名"
              placeholderTextColor={PlatformColors.tertiaryLabel as unknown as string}
              style={{
                minHeight: 32,
                color: PlatformColors.label,
                fontSize: 17,
              }}
            />
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: PlatformColors.separator,
              opacity: 0.45,
              marginLeft: 16,
            }}
          />
          <View style={{ padding: 16, gap: 8 }}>
            <ThemedText variant="footnote" secondary>
              密码
            </ThemedText>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="请输入密码"
              placeholderTextColor={PlatformColors.tertiaryLabel as unknown as string}
              style={{
                minHeight: 32,
                color: PlatformColors.label,
                fontSize: 17,
              }}
            />
          </View>
        </View>

        <Pressable
          onPress={() => {
            setRememberMe((value) => !value);
            haptics.selection();
          }}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            opacity: pressed ? 0.72 : 1,
          })}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 7,
              borderCurve: 'continuous',
              backgroundColor: rememberMe ? BrandColors.primary : PlatformColors.tertiarySystemFill,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {rememberMe ? (
              <Image
                source="sf:checkmark"
                style={{ width: 14, height: 14, tintColor: '#FFFFFF' }}
                contentFit="contain"
              />
            ) : null}
          </View>
          <ThemedText variant="callout">记住登录状态</ThemedText>
        </Pressable>

        {errorMessage ? (
          <ThemedText
            variant="footnote"
            selectable
            style={{ color: PlatformColors.systemRed }}
          >
            {errorMessage}
          </ThemedText>
        ) : null}

        <Pressable
          disabled={isSubmitting}
          onPress={handleLogin}
          style={({ pressed }) => ({
            minHeight: 54,
            borderRadius: 16,
            borderCurve: 'continuous',
            backgroundColor: isSubmitting ? PlatformColors.systemFill : BrandColors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.86 : 1,
          })}
        >
          {isSubmitting ? (
            <ActivityIndicator color={PlatformColors.secondaryLabel as unknown as string} />
          ) : (
            <ThemedText variant="headline" style={{ color: '#FFFFFF' }}>
              模拟登录
            </ThemedText>
          )}
        </Pressable>

        <ThemedText variant="footnote" secondary selectable>
          当前为本地模拟登录，暂未接入后端接口。
        </ThemedText>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
