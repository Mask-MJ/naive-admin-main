import type { CouponSearchParams, CouponList } from './types/memberCoupon';
import { defHttp } from '@/api';

enum Api {
  List = '/member/memberCoupon/list',
}
/** 获取列表 */
export const getList = (params?: CouponSearchParams) =>
  defHttp.get<CouponList[]>({ url: Api.List, params });
