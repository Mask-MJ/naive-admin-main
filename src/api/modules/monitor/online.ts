import type { OnlineList, OnlineListParams } from './types/online';
import { defHttp } from '@/api';

enum Api {
  List = '/system/online/list',
  OnLine = '/system/online/',
}

export const getOnlineList = (params: OnlineListParams) =>
  defHttp.get<OnlineList[]>({ url: Api.List, params });
// 强制退出登录
export const deleteOnline = (id: string) => defHttp.delete({ url: Api.OnLine + id });
