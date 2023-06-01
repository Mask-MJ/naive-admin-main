import {
  companyDetails,
  DetailListParams,
  DeleteListParams,
  unrelatedUserList,
  unrelatedUserListParams,
  SaveUserParams,
  DetailUserList,
  DetailsPileList,
  unrelatedPileListParams,
  unrelatedPileList,
  SavePileParams,
} from './types/companyDetail';
import { defHttp } from '@/api';

enum Api {
  companyDetails = '/system/partner/company/details/', //公司详情

  detailUserList = '/system/partner/company/userList/', //公司详情中的人员列表
  deleteUserList = '/system/partner/company/deleteUserList', //人员列表删除操作
  unrelatedUserList = '/system/partner/company/unrelatedUserList', //获取未归属任何公司的用户列表
  saveUser = '/system/partner/company/saveUser', //公司详情-添加用户

  detailPileList = '/system/partner/company/chargePileList/', //公司详情中的充电桩列表查询
  deletePileList = '/system/partner/company/deleteChargePileList', //充电桩列表删除操作
  unrelatedPileList = '/system/partner/company/unrelatedChargePileList', //获取未归属任何公司的充电桩列表
  savePile = '/system/partner/company/saveChargePile', //公司详情-添加充电桩
}

// 公司详情查询
export const getCompanyDetails = (id: string) =>
  defHttp.get<companyDetails>({ url: Api.companyDetails + id });

// 公司详情-人员列表
export const getDetailUserList = (params: DetailListParams) =>
  defHttp.get<DetailUserList[]>({ url: Api.detailUserList + params.id });
// 人员删除
export const deleteUserList = (params: DeleteListParams) =>
  defHttp.delete({ url: Api.deleteUserList, params }, { joinParamsToUrl: true });
// 未归属任何公司的用户列表
export const getUnrelatedUserList = (params?: Partial<unrelatedUserListParams>) =>
  defHttp.get<unrelatedUserList>({ url: Api.unrelatedUserList, params });
// 公司详情-添加用户
export const saveUser = (params: SaveUserParams) => defHttp.post({ url: Api.saveUser, params });

// 公司详情-充电桩列表
export const getDetailPileList = (params: DetailListParams) =>
  defHttp.get<DetailsPileList[]>({ url: Api.detailPileList + params.id });
// 充电桩删除
export const deletePileList = (params: DeleteListParams) =>
  defHttp.delete({ url: Api.deletePileList, params }, { joinParamsToUrl: true });
// 未归属任何公司的充电桩列表
export const getUnrelatedPileList = (params?: Partial<unrelatedPileListParams>) =>
  defHttp.get<unrelatedPileList>({ url: Api.unrelatedPileList, params });

// 公司详情-添加充电桩
export const savePile = (params: SavePileParams) => defHttp.post({ url: Api.savePile, params });
