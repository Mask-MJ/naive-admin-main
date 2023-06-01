import { defHttp } from '@/api';
import { CompanySearchParams, CompanyList, SetCompanyParams } from './types/company';

enum Api {
  companyList = '/system/partner/company/list', //公司列表查询
  setCompany = '/system/partner/company/', //新建、编辑、删除公司操作
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
