export interface CancelParams {
  userId: string;
  roleId: string;
}

export interface AllocatedParams {
  roleId: number;
}

export interface SelectUserParams {
  roleId: number;
  userIds?: string;
  userId?: string;
}
