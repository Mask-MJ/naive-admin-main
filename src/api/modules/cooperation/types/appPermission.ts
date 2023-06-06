export interface SearchParams {
  appName: string;
  enable: boolean;
  groupName: string;
  nickName: string;
  userName: string;
}

export interface ListResult {
  appName: string;
  createBy: string;
  createTime: string;
  groupName: string;
  iconPath: string;
  id: string;
  isEnable: boolean;
  nickName: string;
  sort: number;
  url: string;
  userName: string;
}

export interface UserAppList {
  id: string;
  flag: boolean;
  appName: string;
  groupName: string;
}

export interface UserListParams {
  userName: string;
}

export interface UserIDParams {
  userId: string;
}

export interface UserPermissionParams {
  appIds: string[];
  id: string;
}
