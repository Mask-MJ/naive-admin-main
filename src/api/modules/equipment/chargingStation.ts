import type {
  StationList,
  SearchStationListParams,
  SetStationParams,
  OperateSetting,
  CarModelList,
  OpeningStatusParams,
  OperateSettingParams,
} from './types/chargingStation';

import { defHttp } from '@/api';

enum Api {
  StationList = '/base/charge-station/station/list', // 获取充电站列表
  SetStation = '/base/charge-station/station/', //新增充电站
  OperateSetting = '/base/charge-station/setting/', //充电站运营设置
  ChangeOpeningStatus = '/base/charge-station/station/opening-status', //设置投运状态
  CarModelList = '/base/charge-car/getChargeCarModelInfo', // 充电站选项列表
}
// 获取充电站列表
export const getStationList = (params: Partial<SearchStationListParams>) =>
  defHttp.get<StationList[]>({ url: Api.StationList, params });

// 新增
export const addStation = (params: SetStationParams) =>
  defHttp.post({ url: Api.SetStation, params });
// 删除
export const deleteStation = (id: string) => defHttp.delete({ url: Api.SetStation + id });
// 修改
export const setStation = (params: SetStationParams) =>
  defHttp.put({ url: Api.SetStation, params });
// 查询
export const getStation = (params: string) =>
  defHttp.get<StationList>({ url: Api.SetStation + params });

// 根据充电站id获取充电站运营设置信息
export const getOperateSetting = (id: string) =>
  defHttp.get<OperateSetting>({ url: Api.OperateSetting + id });
// 充电站运营设置
export const operateSetting = (params: OperateSettingParams) =>
  defHttp.put({ url: Api.OperateSetting, params });
// 设置投运状态
export const setOpeningStatus = (params: OpeningStatusParams) =>
  defHttp.put({ url: Api.ChangeOpeningStatus, params });
// 充电站选项列表
export const getCarModelList = () => defHttp.get<CarModelList[]>({ url: Api.CarModelList });
