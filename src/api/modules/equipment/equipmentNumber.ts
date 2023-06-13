import type {
  EquipmentListParams,
  EquipmentList,
  GenerateEquipmentParams,
  UpdateEquipment,
  AddEquipment,
  GetNewCodeResult,
} from './types/equipmentNumber';

import { defHttp } from '@/api';

enum Api {
  GetEquipmentList = '/base/charge-pile-code/list', // 获取设备列表
  GenerateEquipmentNumber = '/base/charge-pile-code/generateChargePileCode', // 批量生成设备信息
  DeleteEquipmentNumber = '/base/charge-pile-code/delete/', // 删除设备信息
  UpdateEquipmentInfo = '/base/charge-pile-code/singletonUpdate', // 修改单个设备信息
  AddEquipmentInfo = '/base/charge-pile-code/addChargePileCode', // 新增单个设备信息
  GetEquipmentInfo = '/base/charge-pile-code/', // 获取单个设备信息
  GetEquipmentNewCode = '/base/charge-pile-code/getNewPileCode', // 获取新的设备编号
}

// 获取设备列表
export const getEquipmentList = (params?: EquipmentListParams) =>
  defHttp.get<EquipmentList[]>({ url: Api.GetEquipmentList, params });

// 批量生成设备信息
export const generateEquipmentNumber = (params: GenerateEquipmentParams) =>
  defHttp.post({ url: Api.GenerateEquipmentNumber, params });

// 删除设备信息
export const deleteEquipmentNumber = (id: string) =>
  defHttp.delete({ url: Api.DeleteEquipmentNumber + id });

// 修改单个设备信息
export const updataEquipmentInfo = (params: UpdateEquipment) =>
  defHttp.put({ url: Api.UpdateEquipmentInfo, params });

// 新增单个设备信息
export const addEquipmentInfo = (params: AddEquipment) =>
  defHttp.post({ url: Api.AddEquipmentInfo, params });

// 获取设备编辑状态下的信息
export const getEquipmentModelInfo = (params: string) =>
  defHttp.get<UpdateEquipment>({ url: Api.GetEquipmentInfo + params });

// 获取新的设备编号
export const getEquipmentNewCode = () =>
  defHttp.get<GetNewCodeResult>({ url: Api.GetEquipmentNewCode });
