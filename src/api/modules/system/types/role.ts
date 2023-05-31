export interface RoleParams {
  pageNum: number;
}

export interface RoleList {
  admin: boolean;
  roleId: string;
  status: string;
  roleName: string;
  roleKey: string;
  roleSort: number;
  createTime: string;
}

export interface SetRoleParams {
  roleName: string;
  roleKey: string;
  roleSort: string;
  status: string;
  menuIds: string;
}

export interface ScopeParams {
  roleId: number;
  userIds?: string;
  userId?: string;
}

export interface SetRoleStatusParams {
  roleId: string;
  status: string;
}
