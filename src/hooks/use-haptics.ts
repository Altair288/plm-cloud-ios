import * as Haptics from 'expo-haptics';

/**
 * Haptic feedback helpers.
 * All functions are no-ops on platforms other than iOS to avoid noise.
 */
export function useHaptics() {
  const trigger = (fn: () => void) => {
    if (process.env.EXPO_OS === 'ios') fn();
  };

  return {
    light: () =>
      trigger(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
    medium: () =>
      trigger(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
    heavy: () =>
      trigger(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)),
    success: () =>
      trigger(() =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
      ),
    error: () =>
      trigger(() =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
      ),
    warning: () =>
      trigger(() =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
      ),
    selection: () => trigger(() => Haptics.selectionAsync()),
  };
}
