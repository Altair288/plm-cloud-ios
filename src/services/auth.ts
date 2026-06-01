import http from './http';
import type {
  EncryptionKeyResponse,
  LoginRequest,
  LoginResponse,
  UserInfo,
  WorkspaceSession,
} from '@/types/auth';
import type { ApiResponse } from '@/types/api';
import type { CreateWorkspaceRequest, Workspace } from '@/types/workspace';

/**
 * Auth service – wraps all /auth endpoints.
 *
 * Login flow:
 *  1. getEncryptionKey()       → fetch public RSA key
 *  2. encryptPassword()        → encrypt in utils/password-encryption.ts
 *  3. login(payload)           → obtain platform token
 *  4. getMe()                  → load user info + currentWorkspace
 */
export const authService = {
  /** GET /auth/public/security/password-encryption-key */
  getEncryptionKey: () =>
    http.get<ApiResponse<EncryptionKeyResponse>>(
      '/auth/public/security/password-encryption-key',
    ),

  /** POST /auth/public/login */
  login: (payload: LoginRequest) =>
    http.post<ApiResponse<LoginResponse>>('/auth/public/login', payload),

  /** POST /auth/logout */
  logout: () => http.post<ApiResponse<void>>('/auth/logout'),

  /** GET /auth/me */
  getMe: () => http.get<ApiResponse<UserInfo>>('/auth/me'),

  /** GET /auth/workspaces */
  getWorkspaces: () => http.get<ApiResponse<Workspace[]>>('/auth/workspaces'),

  /** POST /auth/workspace-session/switch */
  switchWorkspace: (workspaceId: string) =>
    http.post<ApiResponse<WorkspaceSession>>('/auth/workspace-session/switch', {
      workspaceId,
    }),

  /** POST /auth/workspaces */
  createWorkspace: (payload: CreateWorkspaceRequest) =>
    http.post<ApiResponse<Workspace>>('/auth/workspaces', payload),
};
