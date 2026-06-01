import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { Config } from '@/constants/config';
import type { ApiResponse } from '@/types/api';

/**
 * Central Axios instance for all PLM Cloud backend calls.
 *
 * Request interceptor  – attaches the platform token and workspace token from
 *                        the auth store using their dynamic header names returned
 *                        by the login response.
 *
 * Response interceptor – unwraps the ApiResponse envelope and converts non-zero
 *                        business codes into rejections. Triggers auth clear on 401.
 */
const http: AxiosInstance = axios.create({
  baseURL: Config.apiBaseUrl,
  timeout: Config.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Lazy import to break the circular dependency: store → http → store
function getAuthState() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useAuthStore } = require('@/store/auth') as typeof import('@/store/auth');
  return useAuthStore.getState();
}

// ── Request: attach auth tokens ────────────────────────────────────────────────
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { platformToken, platformTokenName, workspaceToken, workspaceTokenName } =
    getAuthState();

  if (platformToken && platformTokenName) {
    config.headers[platformTokenName] = platformToken;
  }
  if (workspaceToken && workspaceTokenName) {
    config.headers[workspaceTokenName] = workspaceToken;
  }
  return config;
});

// ── Response: unwrap envelope and normalise errors ─────────────────────────────
http.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const envelope = response.data;
    if (
      envelope &&
      typeof envelope.code === 'string' &&
      envelope.code !== '0' &&
      envelope.code !== 'SUCCESS' &&
      envelope.code !== 'OK'
    ) {
      const err = new Error(envelope.message ?? 'Request failed') as Error & {
        apiCode: string;
        traceId?: string;
      };
      err.apiCode = envelope.code;
      err.traceId = envelope.traceId;
      return Promise.reject(err);
    }
    return response;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      getAuthState().clearAuth();
    }
    return Promise.reject(error);
  },
);

export default http;
