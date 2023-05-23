import type { UploadFileParams } from '@/api/request/types';
import type {
  AccountParams,
  RoleStatus,
  AccountList,
  UserInfoParams,
  resetPwdParams,
  setProfileParams,
} from './types/user';

import { defHttp } from '@/api';
import { getAppEnvConfig } from '@/utils/env';

const { VITE_GLOB_UPLOAD_URL } = getAppEnvConfig();

enum Api {
  List = '/system/user/list',
  TreeSelect = '/system/dept/treeselect',
  ChangeStatus = '/system/user/changeStatus',
  User = '/system/user/',
  ResetPwd = '/system/user/resetPwd',
  AuthRole = '/system/user/authRole/',
  UploadAvatar = '/system/user/profile/avatar',
  Profile = '/system/user/profile',
  UpdatePwd = '/system/user/profile/updatePwd',
}

// 获取账户列表
export const getAccountList = (params?: AccountParams) =>
  defHttp.get<AccountList[]>({ url: Api.List, params });
// 修改用户状态
export const setRoleStatus = (params: RoleStatus) => defHttp.put({ url: Api.ChangeStatus, params });
// 获取部门关系树
export const getDeptList = (params?: string) =>
  defHttp.get({ url: Api.TreeSelect + (params ? '?status=' + params : '') });
// 获取用户信息
export const getUserInfo = (params: string) =>
  defHttp.get({ url: Api.User + params }, { isReturnNativeResponse: true });
// 新增用户信息
export const addUserInfo = (params: UserInfoParams) => defHttp.post({ url: Api.User, params });
// 修改用户信息
export const setUserInfo = (params: UserInfoParams) => defHttp.put({ url: Api.User, params });
// 删除用户
export const deleteUser = (params: string) => defHttp.delete({ url: Api.User + params });
// 修改密码
export const resetPwd = (params: resetPwdParams) => defHttp.put({ url: Api.ResetPwd, params });
// 获取分配角色
export const getAuthRole = (params: any) => defHttp.get({ url: Api.AuthRole + params.userId });
// 提交分配角色
export const setAutoRole = (params: string) => defHttp.put({ url: Api.AuthRole + params });
// 上传头像
export const uploadAvatar = (params: UploadFileParams) =>
  defHttp.uploadFile(
    { url: VITE_GLOB_UPLOAD_URL + Api.UploadAvatar },
    { name: 'avatarfile', file: params.file },
  );
// 获取基础信息
export const getProfile = () => defHttp.get({ url: Api.Profile });
// 修改基础信息
export const setProfile = (params: setProfileParams) => defHttp.put({ url: Api.Profile, params });
// 修改当前用户密码
export const updatePwd = (params: string) => defHttp.put({ url: Api.UpdatePwd + params });
