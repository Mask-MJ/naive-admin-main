import type { SearchCarListParams, CarList, CarListParams } from './types/chargingCarModel';

import { defHttp } from '@/api';

enum Api {
  CarList = '/base/charge-car/list', // 获取充电车的列表
  DictChargeType = '/system/dict/data/type/base_charge_type', // 获取充电类型
  AddCar = '/base/charge-car/save', //新增充电车型 (wtf: 就不能统一一下)
  GetCar = '/base/charge-car/getById/', //通过ID获取车型
  UpdateCar = '/base/charge-car/update', //修改车型
  DeleteCar = '/base/charge-car/delete/', // 删除充电车
}
// 获取充电车的列表
export const getCarList = (params: SearchCarListParams) =>
  defHttp.get<CarList[]>({ url: Api.CarList, params });

// 新增
export const addCar = (params: CarListParams) => defHttp.post({ url: Api.AddCar, params });
// 删除
export const deleteCar = (params: string) => defHttp.delete({ url: Api.DeleteCar + params });
// 修改
export const setCar = (params: CarListParams) => defHttp.put({ url: Api.UpdateCar, params });

//  获取充电类型(字典)
export const getChargeType = () => defHttp.get({ url: Api.DictChargeType });
