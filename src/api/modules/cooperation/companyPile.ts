import { defHttp } from '@/api';
import { CompanyPileParams, CompanyPileList } from './types/companyPile';

enum Api {
  companyPileList = '/system/partner/company/companyChargePileQuery', //公司充电桩查询
}

// 公司列表查询
export const getCompanyList = (params?: CompanyPileParams) =>
  defHttp.get<CompanyPileList>({ url: Api.companyPileList, params });
