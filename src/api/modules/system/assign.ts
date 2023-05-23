import type { AllocatedParams, CancelParams, SelectUserParams } from './types/assign';
import { defHttp } from '@/api';

enum Api {
  Cancel = '/system/role/authUser/cancel',
  AllocatedList = '/system/role/authUser/allocatedList',
  UnAllocatedList = '/system/role/authUser/unallocatedList',
  SelectAll = 'system/role/authUser/selectAll',
  CancelAll = '/system/role/authUser/cancelAll',
}

// 获取已分配列表
export const getAllocatedList = async (params: AllocatedParams) =>
  defHttp.get({ url: Api.AllocatedList, params });

// 获取未分配列表
export const getUnAllocatedList = async (params: AllocatedParams) =>
  defHttp.get({ url: Api.UnAllocatedList, params });

// 取消分配用户
export const cancel = (params: CancelParams) => defHttp.put({ url: Api.Cancel, params });
// 分配用户
export const selectUser = (params: SelectUserParams) => defHttp.put({ url: Api.SelectAll, params });
// 取消选中的分配用户
export const cancelAll = (params: SelectUserParams) => defHttp.put({ url: Api.CancelAll, params });
