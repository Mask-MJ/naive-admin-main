import { defHttp } from '@/api';
import {
  SearchParams,
  ListResult,
  UserAppList,
  UserListParams,
  UserIDParams,
  UserPermissionParams,
} from './types/appPermission';

enum Api {
  list = '/system/partner/user-app/list', //应用列表查询
  listByUser = '/system/partner/user-app/listByUser', //根据userId进行列表查询
  updatePermission = '/system/partner/user-app/update/', //更新用户权限
  deleteApp = '/system/partner/user-app/delete/', //删除操作
  userList = '/system/user/listByUserName', //用户列表
}

export const getList = (params?: SearchParams) =>
  defHttp.get<ListResult[]>({ url: Api.list, params });

// 根据userID进行列表查询
export const getListByUserID = (params?: UserIDParams) =>
  defHttp.get<UserAppList>({ url: Api.listByUser, params });

// 更新用户权限
export const updateUserPermission = (params: UserPermissionParams) =>
  defHttp.put({ url: Api.updatePermission + params.id, params: params.appIds });

export const deletePermittedApp = (id: string) => defHttp.delete({ url: Api.deleteApp + id });

// 获取用户列表
export const getUserList = (params: UserListParams) => defHttp.get({ url: Api.userList, params });
