// import { BasicPageParams, BasicResult } from '@/api/model/baseModel';
export type AccountParams = {
  account?: string;
  nickname?: string;
};
export interface RoleStatus {
  status: string;
  userId: string;
}

export interface AccountList {
  status: string;
  userId: string;
}

export interface UserInfoParams {
  userName: string;
  nickName: string;
  password: string;
  email: string;
  phonenumber: number;
}

export interface resetPwdParams {
  userId: string;
  newPassword: string;
}

export interface setProfileParams {
  nickName: string;
  email: string;
  phonenumber: number;
  sex: string;
}
