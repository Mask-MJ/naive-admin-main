import { defHttp } from '@/api';

enum Api {
  AlarmList = '/base/device-alarm-log/list',
}

/** 获取列表 */
export const getAlarmList = (params: any) => defHttp.get({ url: Api.AlarmList, params });
