import { defHttp } from '@/api';
import { CompanySearchParams, CompanyList, SetCompanyParams } from './types/company';

enum Api {
  companyList = '/system/partner/company/list', //公司列表查询
  setCompany = '/system/partner/company/', //新建、编辑、删除公司操作

  detailPileList = '/system/partner/company/chargePileList/', //公司详情中的充电桩列表查询
  deletePileList = '/system/partner/company/deleteChargePileList?idList=', //充电桩列表删除操作
  deleteUserList = '/system/partner/company/deleteUserList?idList=', //人员列表删除操作
  companyDetails = '/system/partner/company/details/', //公司详情
  addPile = '/system/partner/company/saveChargePile', //公司详情-添加充电桩
  companyPileList = '/system/partner/company/companyChargePileQuery', //公司充电桩查询
  addUser = '/system/partner/company/saveUser', //公司详情-添加用户
  unrelatedPileList = '/system/partner/company/unrelatedChargePileList', //获取未归属任何公司的充电桩列表
  unrelatedUserList = '/system/partner/company/unrelatedUserList', //获取未归属任何公司的用户列表
  detailUserList = '/system/partner/company/userList/', //公司详情中的人员列表
  switchStatus = '/system/partner/company/switchStatus', //切换合作状态
}

// 公司列表查询
export const getCompanyList = (params?: CompanySearchParams) =>
  defHttp.get<CompanyList>({ url: Api.companyList, params });
// 删除公司列表
export const deleteCompany = (id: string) => defHttp.delete({ url: Api.setCompany + id });

// 新增公司
export const addCompany = (params: SetCompanyParams) =>
  defHttp.post({ url: Api.setCompany, params });
// 修改公司
export const setCompany = (params: SetCompanyParams) =>
  defHttp.put({ url: Api.setCompany, params });

// 切换合作状态
export const setCompanyStatus = (params: SetCompanyParams) =>
  defHttp.put({ url: Api.switchStatus, params });
