import type { SearchBrandListParams, BrandList, BrandListParams } from './types/chargingPileBrand';

import { defHttp } from '@/api';

enum Api {
  BrandList = '/base/charge-pile-brand/list', // 获取充电桩品牌列表
  ChargingPileBrand = '/base/charge-pile-brand/', // 操作充电桩品牌
  BrandOptions = '/base/charge-pile-brand/options/list', // 充电桩品牌选项列表
}
// 获取充电桩品牌列表
export const getBrandList = (params: SearchBrandListParams) =>
  defHttp.get<BrandList[]>({ url: Api.BrandList, params });
// 充电桩品牌选项列表
export const getBrandOptions = () => defHttp.get({ url: Api.BrandOptions });

// 新增
export const addBrand = (params: BrandListParams) =>
  defHttp.post({ url: Api.ChargingPileBrand, params });
// 删除
export const deleteBrand = (params: string) =>
  defHttp.delete({ url: Api.ChargingPileBrand + params });
// 修改
export const setBrand = (params: BrandListParams) =>
  defHttp.put({ url: Api.ChargingPileBrand, params });
