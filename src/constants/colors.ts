import { PlatformColor } from 'react-native';

/**
 * iOS semantic colors via PlatformColor with React Native fallbacks.
 * These automatically adapt to light/dark mode without manual theme switching.
 */
export const PlatformColors = {
  // Text
  label: PlatformColor('label', '#000000'),
  secondaryLabel: PlatformColor('secondaryLabel', '#3C3C4399'),
  tertiaryLabel: PlatformColor('tertiaryLabel', '#3C3C434C'),
  quaternaryLabel: PlatformColor('quaternaryLabel', '#3C3C432D'),

  // Backgrounds
  systemBackground: PlatformColor('systemBackground', '#FFFFFF'),
  secondarySystemBackground: PlatformColor('secondarySystemBackground', '#F2F2F7'),
  tertiarySystemBackground: PlatformColor('tertiarySystemBackground', '#FFFFFF'),
  systemGroupedBackground: PlatformColor('systemGroupedBackground', '#F2F2F7'),
  secondarySystemGroupedBackground: PlatformColor(
    'secondarySystemGroupedBackground',
    '#FFFFFF',
  ),
  tertiarySystemGroupedBackground: PlatformColor(
    'tertiarySystemGroupedBackground',
    '#F2F2F7',
  ),

  // Separators
  separator: PlatformColor('separator', '#C6C6C8'),
  opaqueSeparator: PlatformColor('opaqueSeparator', '#C6C6C8'),

  // System colors
  systemBlue: PlatformColor('systemBlue', '#007AFF'),
  systemRed: PlatformColor('systemRed', '#FF3B30'),
  systemGreen: PlatformColor('systemGreen', '#34C759'),
  systemOrange: PlatformColor('systemOrange', '#FF9500'),
  systemYellow: PlatformColor('systemYellow', '#FFCC00'),
  systemPurple: PlatformColor('systemPurple', '#AF52DE'),
  systemTeal: PlatformColor('systemTeal', '#32ADE6'),
  systemIndigo: PlatformColor('systemIndigo', '#5856D6'),
  systemPink: PlatformColor('systemPink', '#FF2D55'),

  // Fills
  systemFill: PlatformColor('systemFill', '#78788033'),
  secondarySystemFill: PlatformColor('secondarySystemFill', '#78788028'),
  tertiarySystemFill: PlatformColor('tertiarySystemFill', '#7676801E'),
  quaternarySystemFill: PlatformColor('quaternarySystemFill', '#74748014'),
} as const;

/** App brand colors (static, not theme-aware). */
export const BrandColors = {
  primary: '#0A84FF',
  primaryDark: '#0071E3',
} as const;
