import type { OrderList, ListParams, UserList } from './types/order';
import { defHttp } from '@/api';

enum Api {
  List = '/member/rechargeOrder/list',
  UserList = '/member/card/userList',
}

/** 获取列表 */
export const getList = (params?: Partial<ListParams>) =>
  defHttp.get<OrderList[]>({ url: Api.List, params });
/** 获取所属会员搜索列表 */
export const getUserList = (params?: Partial<ListParams>) =>
  defHttp.get<UserList[]>({ url: Api.UserList, params });
