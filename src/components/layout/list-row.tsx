import { Pressable, View, type PressableProps, type ViewStyle } from 'react-native';
import { PlatformColors } from '@/constants/colors';
import { ThemedText } from '@/components/ui/themed-text';
import { Image } from 'expo-image';

interface ListRowProps extends Omit<PressableProps, 'style'> {
  label: string;
  /** Secondary text on the right. */
  value?: string;
  /** SF Symbol name for the leading icon. */
  icon?: string;
  /** Tint colour for the icon background pill. */
  iconTint?: string;
  /** Show a disclosure chevron on the right. Default true when onPress is provided. */
  chevron?: boolean;
  /** Style for the outer container. */
  style?: ViewStyle;
}

/**
 * A single tappable row in a SectionCard, styled after iOS Settings.
 */
export function ListRow({
  label,
  value,
  icon,
  iconTint = PlatformColors.systemBlue as unknown as string,
  chevron,
  style,
  onPress,
  ...pressableProps
}: ListRowProps) {
  const showChevron = chevron ?? !!onPress;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 12,
          backgroundColor: pressed
            ? PlatformColors.systemFill
            : 'transparent',
        },
        style,
      ]}
      {...pressableProps}
    >
      {icon ? (
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            backgroundColor: iconTint,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={`sf:${icon}`}
            style={{ width: 18, height: 18, tintColor: '#FFFFFF' }}
            contentFit="contain"
          />
        </View>
      ) : null}

      <ThemedText variant="body" style={{ flex: 1 }}>
        {label}
      </ThemedText>

      {value ? (
        <ThemedText variant="body" secondary>
          {value}
        </ThemedText>
      ) : null}

      {showChevron ? (
        <Image
          source="sf:chevron.right"
          style={{ width: 12, height: 12, opacity: 0.3 }}
          contentFit="contain"
        />
      ) : null}
    </Pressable>
  );
}
