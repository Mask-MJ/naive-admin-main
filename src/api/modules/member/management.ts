import type {
  List,
  ListParams,
  RechargeParams,
  OverChargeParams,
  Details,
  CarDetail,
  RecordListParams,
  RecordList,
  OverListParams,
  OverList,
} from './types/management';
import { defHttp } from '@/api';

enum Api {
  List = '/member/user/list',
  Status = '/member/user/status/',
  Recharge = '/member/wallet/offline/recharge',
  OverCharge = '/member/user/overCharge/', // 获取多充设置信息
  SetOverCharge = '/member/user', // 多充信息设置
  Details = '/member/user/details/', // 会员详细信息
  MemberCars = '/member/user/userCar/',
  RecordList = '/member/user/tradeRecord', // 交易记录列表
  OrderList = '/member/charging-order/list', // 充电订单列表
  CardStatus = '/member/card/status/', // 会员充电卡状态
}

/** 获取列表 */
export const getList = (params?: ListParams) => defHttp.get<List>({ url: Api.List, params });
/** 设置状态 */
export const setStatus = (id: string) => defHttp.put({ url: Api.Status + id });
/** 充值 */
export const recharge = (params: RechargeParams) => defHttp.post({ url: Api.Recharge, params });

// 获取多充设置信息
export const getOverCharge = (id: string) => defHttp.get({ url: Api.OverCharge + id });
// 新增多充
export const addOverCharge = (params: OverChargeParams) =>
  defHttp.post({ url: Api.SetOverCharge, params });
// 修改多充
export const updateOverCharge = (params: OverChargeParams) =>
  defHttp.put({ url: Api.SetOverCharge, params });
// 获取会员详情
export const getDetails = (id: string) => defHttp.get<Details>({ url: Api.Details + id });
// 获取会员车辆详情
export const getMemberCars = (id: string) => defHttp.get<CarDetail[]>({ url: Api.MemberCars + id });
// 获取会员交易记录
export const getRecordList = (params?: RecordListParams) =>
  defHttp.get<RecordList>({ url: Api.RecordList, params });
// 获取会员充电订单
export const getOrderList = (params?: OverListParams) =>
  defHttp.get<OverList>({ url: Api.OrderList, params });
// 切换会员充电卡状态
export const setCardStatus = (id: string) => defHttp.put({ url: Api.CardStatus + id });
