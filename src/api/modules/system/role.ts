import type {
  RoleParams,
  RoleList,
  SetRoleParams,
  ScopeParams,
  SetRoleStatusParams,
} from './types/role';
import { defHttp } from '@/api';

enum Api {
  GetRoleList = '/system/role/list',
  GetTreeSelect = '/system/menu/treeselect',
  ControlRole = '/system/role/',
  SetRoleStatus = '/system/role/changeStatus',
  RoleMenuTree = '/system/menu/roleMenuTreeselect/',
  RoleDeptTree = '/system/dept/roleDeptTreeselect/',
  AllocatedList = '/system/role/authUser/allocatedList',
  DataScope = '/system/role/dataScope',
}

export const getRoleList = (params: RoleParams) =>
  defHttp.get<RoleList[]>({ url: Api.GetRoleList, params });

// 获取角色列表
export const getTreeSelect = () => defHttp.get({ url: Api.GetTreeSelect });
// 获取设置的 role
export const getRole = (id: string) => defHttp.get({ url: Api.ControlRole + id });
// 获取用户对应的菜单权限
export const getRoleMenuTree = (id: string) => defHttp.get({ url: Api.RoleMenuTree + id });
// 新建对应的角色
export const addRole = (params: SetRoleParams) => defHttp.post({ url: Api.ControlRole, params });
// 修改对应的角色
export const setRole = (params: SetRoleParams) => defHttp.put({ url: Api.ControlRole, params });
// 修改数据权限范围
export const setDataScope = (params: ScopeParams) => defHttp.put({ url: Api.DataScope, params });
// 获取对应的数据权限列表
export const getRoleDeptTree = (id: string) => defHttp.get({ url: Api.RoleDeptTree + id });
// 删除对应的用户
export const deleteUser = (id: string) => defHttp.delete({ url: Api.ControlRole + id });
// 修改用户对应的状态
export const setRoleStatus = (params: SetRoleStatusParams) =>
  defHttp.put({ url: Api.SetRoleStatus, params });
