import type { ListParams, CarList } from './types/car';
import { defHttp } from '@/api';

enum Api {
  List = '/member/car/list',
}
/** 获取列表 */
export const getList = (params?: ListParams) => defHttp.get<CarList>({ url: Api.List, params });
