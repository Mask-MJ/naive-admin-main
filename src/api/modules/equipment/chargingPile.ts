import type { BasicPage } from '@/api/modules/basic/types/basicPage';
import { defHttp } from '@/api';
enum Api {
  getChargeStationOptions = '/base/charge-station/options/list', //所属电站列表
}

// 所属电站列表
export const getChargeStationOptions = (params: BasicPage) =>
  defHttp.get({ url: Api.getChargeStationOptions, params });
