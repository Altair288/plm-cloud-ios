import * as SecureStore from 'expo-secure-store';

/** Persist a JSON-serialisable value in the device keychain. */
export async function setSecureItem<T>(key: string, value: T): Promise<void> {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

/** Retrieve and deserialise a value from the device keychain. Returns null if absent or malformed. */
export async function getSecureItem<T>(key: string): Promise<T | null> {
  try {
    const raw = await SecureStore.getItemAsync(key);
    if (raw == null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** Delete a value from the device keychain. */
export async function removeSecureItem(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}

/**
 * Async storage adapter compatible with Zustand `createJSONStorage`.
 * Backed by expo-secure-store so all persisted state lives in the keychain.
 */
export const secureStoreAdapter = {
  getItem: (name: string): Promise<string | null> => SecureStore.getItemAsync(name),
  setItem: (name: string, value: string): Promise<void> =>
    SecureStore.setItemAsync(name, value),
  removeItem: (name: string): Promise<void> => SecureStore.deleteItemAsync(name),
};
