import type { ConfigList, ConfigSearchParams, ConfigParams } from './types/config';
import { defHttp } from '@/api';

enum Api {
  ListConfig = '/system/config/list', // 查询参数列表
  GetConfigKey = '/system/config/configKey/', // 根据参数键名查询参数值
  SetConfig = '/system/config', // 设置参数配置
  RefreshCache = '/system/config/refreshCache', // 刷新参数缓存
}

// 查询参数列表
export const getConfigList = (params: ConfigSearchParams) =>
  defHttp.get<ConfigList>({ url: Api.ListConfig, params });
// 刷新缓存
export const refreshCache = () => defHttp.delete({ url: Api.RefreshCache });
// 查询参数详细
export const getConfig = (id: string) => defHttp.get({ url: `${Api.SetConfig}/${id}` });
// 新增参数配置
export const addConfig = (params: ConfigParams) => defHttp.post({ url: Api.SetConfig, params });
// 修改参数配置
export const updateConfig = (params: ConfigParams) => defHttp.put({ url: Api.SetConfig, params });
// 删除参数配置
export const delConfig = (id: string) => defHttp.delete({ url: `${Api.SetConfig}/${id}` });
// 根据参数键名查询参数值
export const getConfigKey = (id: string) => defHttp.get({ url: `${Api.GetConfigKey}/${id}` });
