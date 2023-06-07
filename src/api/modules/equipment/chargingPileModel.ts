import type {
  SearchModelList,
  SearchModel,
  ModelList,
  SetModelParams,
} from './types/chargingPileModel';

import { defHttp } from '@/api';

enum Api {
  ModelList = '/base/charge-pile-model/list', // 获取充电桩型号列表
  SetModel = '/base/charge-pile-model/', //新增充电桩型号
  getModelOptions = '/base/charge-pile-model/options/list', //型号选项列表
}

// 获取充电桩型号列表
export const getModelList = (params: SearchModelList) =>
  defHttp.get<ModelList[]>({ url: Api.ModelList, params });

// 型号选项列表
export const getModelOptions = (params: SearchModel) =>
  defHttp.get({ url: Api.getModelOptions, params });

export const addModel = (params: SetModelParams) => defHttp.post({ url: Api.SetModel, params });

export const setModel = (params: SetModelParams) => defHttp.put({ url: Api.SetModel, params });

export const deleteModel = (params: string) => defHttp.delete({ url: Api.SetModel + params });

export const getModel = (params: string) => defHttp.get<ModelList>({ url: Api.SetModel + params });
