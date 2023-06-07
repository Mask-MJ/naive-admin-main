export interface SearchCarListParams {
  chargeType: string;
  moduleName: string;
}

export interface CarList {
  chargeType: string;
  count: number;
  createBy: string;
  createTime: string;
  id: string;
  name: string;
  updateTime: string;
}

export interface CarListParams {
  chargeType: string;
  count: number;
  id?: string;
  name: string;
}
