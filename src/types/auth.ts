export interface LoginRequest {
  loginId: string;
  /** RSA-OAEP SHA-256/MGF1-SHA1 encrypted password, base64 encoded. */
  passwordCiphertext: string;
  /** Key ID returned by /auth/public/security/password-encryption-key. */
  encryptionKeyId: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  platformToken: string;
  platformTokenName: string;
  platformTokenExpireInSeconds: number;
  rememberMe: boolean;
  principalType: 'PLATFORM_ADMIN' | 'WORKSPACE_USER';
  userId: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
}

export interface UserInfo {
  userId: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
  principalType: 'PLATFORM_ADMIN' | 'WORKSPACE_USER';
  firstLogin?: boolean;
  currentWorkspace?: WorkspaceSession;
}

export interface WorkspaceSession {
  workspaceId: string;
  workspaceCode: string;
  workspaceName: string;
  workspaceToken: string;
  workspaceTokenName: string;
  roleCode?: string;
  roleName?: string;
}

export interface EncryptionKeyResponse {
  keyId: string;
  publicKey: string;
}

export interface AuthState {
  /** Whether the Zustand persist store has finished rehydrating from SecureStore. */
  _hasHydrated: boolean;
  platformToken: string | null;
  platformTokenName: string | null;
  workspaceToken: string | null;
  workspaceTokenName: string | null;
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
}
