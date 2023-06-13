export interface EquipmentListParams {
  brandName: string;
  code: number;
  status: number;
}
export interface EquipmentList {
  id: string;
  code: string;
  brandName: string;
  modelName: string;
  status: number;
  createBy: string;
  createTime: string;
  updateTime: string;
}

export interface GenerateEquipmentParams {
  modelId: string;
  brandId: string;
  codeNum: number;
}

export interface UpdateEquipment {
  brandId?: number;
  code?: string;
  id: number;
  modelId?: number;
  status?: number;
}
export interface AddEquipment {
  brandId: number;
  code: string;
  modelId: number;
}

export interface GetNewCodeResult {
  data: string;
}
