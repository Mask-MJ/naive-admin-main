import type { ListParams, List } from './types/alarmlog';
import { defHttp } from '@/api';

enum Api {
  List = '/base/device-alarm-log/list',
}

/** 获取列表 */
export const getList = (params?: ListParams) => defHttp.get<List>({ url: Api.List, params });
