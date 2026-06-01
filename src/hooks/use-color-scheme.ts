import { useColorScheme as _useColorScheme } from 'react-native';

/** Returns the current colour scheme, defaulting to 'light' when unknown or unspecified. */
export function useColorScheme(): 'light' | 'dark' {
  const scheme = _useColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}
