export interface Workspace {
  workspaceId: string;
  workspaceCode: string;
  workspaceName: string;
  workspaceType: string;
  memberCount?: number;
  createdAt?: string;
}

export interface CreateWorkspaceRequest {
  workspaceName: string;
  workspaceType: string;
  defaultLocale?: string;
  defaultTimezone?: string;
  rememberAsDefault?: boolean;
}

export interface WorkspaceState {
  currentWorkspace: import('./auth').WorkspaceSession | null;
  workspaceList: Workspace[];
}
