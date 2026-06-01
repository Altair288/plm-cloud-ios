/**
 * Runtime configuration.
 * Override API base URL with EXPO_PUBLIC_API_BASE_URL in .env.local
 */
export const Config = {
  /** PLM Cloud backend base URL. */
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:8080',
  /** HTTP request timeout in ms. */
  apiTimeout: 30_000,
  /** SecureStore key for persisted auth state. */
  authStorageKey: 'plm_auth_state',
  /** SecureStore key for persisted workspace state. */
  workspaceStorageKey: 'plm_workspace_state',
} as const;
