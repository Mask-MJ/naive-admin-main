import type {
  DictSearchParams,
  DictParams,
  DictDataListParams,
  DictListDetail,
} from './types/dict';

import { defHttp } from '@/api';

enum Api {
  DictList = '/system/dict/type/list', // 获取字典列表
  RefreshCache = '/system/dict/type/refreshCache', // 刷新缓存
  setDictList = '/system/dict/type/',
  DictDataList = '/system/dict/data/list', // 查询字典数据列表
  DictDetail = '/system/dict/data/', // 查询字典数据详细
  DictsData = '/system/dict/data/type/', // 根据字典类型查询字典数据信息
}

// 获取字典列表
export const getDictList = (params: DictSearchParams) => defHttp.get({ url: Api.DictList, params });
// 刷新缓存
export const refreshCache = () => defHttp.delete({ url: Api.RefreshCache });
// 字典详情
export const getDictDetail = (id: string) => defHttp.get({ url: Api.setDictList + id });
// 删除字典列
export const deleteDictList = (id: string) => defHttp.delete({ url: Api.setDictList + id });
// 新增字典列
export const addDictList = (params: DictParams) => defHttp.post({ url: Api.setDictList, params });
// 修改字典列
export const editDictList = (params: DictParams) => defHttp.put({ url: Api.setDictList, params });

// 获取字典数据列表
export const getDictDataList = (params: DictDataListParams) =>
  defHttp.get({ url: Api.DictDataList, params });
// 字典数据详情
export const getDictsData = (id: string) => defHttp.get({ url: Api.DictsData + id });
// 删除字典数据列
export const deleteDictDataList = (id: string) => defHttp.delete({ url: Api.DictDetail + id });
// 新增字典数据列
export const addDictDataList = (params: DictListDetail) =>
  defHttp.post({ url: Api.DictDetail, params });
// 修改字典数据列
export const editDictDataList = (params: DictListDetail) =>
  defHttp.put({ url: Api.DictDetail, params });
