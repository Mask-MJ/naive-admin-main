export interface SearchModelList {
  brandName: string;
  chargeType: 1 | 2;
  modelName: string;
}

export interface ModelList {
  brandName: string;
  chargeKw: number;
  chargeType: 1 | 2;
  createBy: string;
  createTime: string;
  gunAmount: number;
  id: string;
  modelName: string;
  updateTime: string;
}

export interface SetModelParams {
  brandId: string;
  chargeKw: number;
  chargeType: 1 | 2;
  gunAmount: number;
  id?: string;
  name: string;
}

export interface SearchModel {
  brandId: string;
}
