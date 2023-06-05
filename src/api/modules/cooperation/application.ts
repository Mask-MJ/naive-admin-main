import type { UploadCustomRequestOptions } from 'naive-ui';
import type {
  AppListParams,
  Applist,
  SetApplicationParams,
  EnableStatusParams,
  GroupListReault,
  AddGroupParams,
  GroupListParams,
} from './types/application';
import { defHttp } from '@/api';

export enum Api {
  addApp = '/system/partner/app/add', //新增app
  updateApp = '/system/partner/app/update/', //修改app
  deleteApp = '/system/partner/app/delete/', //删除app
  enableStatus = '/system/partner/app/enableStatus/', //修改app启用状态
  appList = '/system/partner/app/list', //app列表查询
  uploadIcon = '/system/partner/app/uploadIcon', //图标上传接口
  groupList = '/system/partner/appGroup/list', //分组列表查询
  addGroup = '/system/partner/appGroup/add', //添加分组
  deleteGroup = '/system/partner/appGroup/delete/', //删除分组
}

// app列表查询
export const getAppList = (params: Partial<AppListParams>) =>
  defHttp.get<Applist[]>({ url: Api.appList, params });

export const addApp = (params: SetApplicationParams) => defHttp.post({ url: Api.addApp, params });
export const updateApp = (params: SetApplicationParams) =>
  defHttp.put({ url: Api.updateApp + params.id, params });
export const deleteApp = (id: string) => defHttp.delete({ url: Api.deleteApp + id });

// 分组列表查询
export const getGroupList = (params?: GroupListParams) =>
  defHttp.get<GroupListReault>({ url: Api.groupList, params });
// 新增分组
export const addGroup = (params: AddGroupParams) => defHttp.post({ url: Api.addGroup, params });
// 删除分组
export const deleteGroup = (id: string) => defHttp.delete({ url: Api.deleteGroup + id });

// 改变app启用状态
export const changeStatus = ({ id, enable }: EnableStatusParams) =>
  defHttp.put({ url: `${Api.enableStatus}/${id}/${enable}` });

export const uploadIcon = (params: UploadCustomRequestOptions) =>
  defHttp.uploadFile({ url: Api.uploadIcon }, params);
