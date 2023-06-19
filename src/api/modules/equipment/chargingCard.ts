import type {
  SearchListParams,
  CardList,
  SetCard,
  memberListParams,
  MemberList,
  CardInfo,
} from './types/chargingCard';

import { defHttp } from '@/api';

enum Api {
  CardList = '/member/card/list', //充电卡列表查询
  ChangeStatus = '/member/card/status/', //停用启用状态转换
  setCard = '/member/card', //新增或编辑充电卡
  MemberList = '/member/card/userList', //获取会员列表
  DeleteCard = '/member/card/delete/', //删除充电卡
  CardInfo = '/member/inner/card/infoByCode/', //根据卡号获取信息
}

// 获取卡列表
export const getCardList = (params?: SearchListParams) =>
  defHttp.get<CardList[]>({ url: Api.CardList, params });
// 改变卡的状态
export const ChangeStatus = (id: string) => defHttp.put({ url: Api.ChangeStatus + id });
// 新增充电卡
export const addCard = (params: SetCard) => defHttp.post({ url: Api.setCard, params });
// 修改编辑充电卡
export const setCard = (params: SetCard) => defHttp.put({ url: Api.setCard, params });
// 获取会员搜索列表
export const getMemberList = (params?: memberListParams) =>
  defHttp.get<MemberList[]>({ url: Api.MemberList, params });
// 删除充电卡
export const deleteCard = (id: string) => defHttp.delete({ url: Api.DeleteCard + id });
//根据卡号获取信息
export const getCardInfo = (code: string) => defHttp.get<CardInfo>({ url: Api.CardInfo + code });
