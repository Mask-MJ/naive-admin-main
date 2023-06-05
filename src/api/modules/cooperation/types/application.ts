export interface AppListParams {
  appName: string;
  enable: boolean;
  groupId: string;
}

export interface Applist {
  appName: string;
  createBy: string;
  createTime: string;
  enable: boolean;
  groupName: string;
  icon: string;
  id: string;
  sort: number;
  updateTime: string;
  url: string;
}

export interface SetApplicationParams {
  id?: string;
  enable: boolean;
  groupId: string;
  icon: string;
  name: string;
  sort: number;
  url: string;
}

export interface EnableStatusParams {
  id: string;
  enable: number;
}

export interface GroupListReault {
  rows: {
    id: string;
    sort: number;
    name: string;
  }[];
}

export interface AddGroupParams {
  name: string;
  sort: number;
}
