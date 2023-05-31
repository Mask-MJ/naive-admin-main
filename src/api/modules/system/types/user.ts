export interface RoleStatus {
  status: string;
  userId: string;
}

export interface AccountParams {
  userName: string;
  phonenumber: number;
  status: string;
  userType: string;
  ['[beginTime, endTime]']: [Date, Date];
}

export interface AccountList {
  status: string;
  userId: string;
  userName: string;
  nickName: string;
  email: string;
  createTime: string;
  ['dept.deptName']: string;
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
