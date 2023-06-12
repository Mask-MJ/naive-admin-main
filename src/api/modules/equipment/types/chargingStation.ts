export interface StationList {
  id: string;
  name: string;
  internalSn: string;
  positionType: { type: number; desc: string };
  operationType: { type: number; desc: string };
  stationType: { type: number; desc: string };
  chargerAmount: string;
  openingTime: string;
  isChargeCar: number;
  licensePlate: null | any;
  shortAddress: string;
  openingStatus: boolean;
  createTime: string;
}

export interface SearchStationListParams {
  address: string;
  internalSn: string;
  isChargeCar: number;
  licensePlate: string;
  name: string;
  openingStatus: boolean;
  openingTimeBegin: string;
  openingTimeEnd: string;
  stationType: number;
}
export interface SetStationParams {
  address: string;
  carportAmount: number;
  chargeCarModelId: bigint;
  city: string;
  district: string;
  id: bigint;
  images: string[];
  internalSn: string;
  isChargeCar: boolean;
  kvType: number;
  kva: number;
  latitude: number;
  licensePlate: string;
  linkman: string;
  longitude: number;
  name: string;
  operationType: number;
  placeType: number;
  positionType: number;
  propertyDescription: string;
  propertyRightUnit: string;
  province: string;
  stationType: number;
  supplyLine: string;
  tel: string;
}
export interface OperateSetting {
  alarmThreshold: number;
  appointment: boolean;
  aroundFacility: number[];
  devTimeDescription: string;
  discountsDescription: string;
  forcePlateNo: boolean;
  kva: number;
  notice: string;
  outageSoc: number;
  outboundMode: number;
  parkingDescription: string;
  parkingDiscounts: boolean;
  powerAlarm: boolean;
  receiptDescription: string;
  receiptReceive: boolean;
  receiptReceiveLimit: number;
  receiptValidity: number;
  serviceFacility: number[];
  stationId: number;
  stationName: string;
}
export interface CarModelList {
  id: string;
  name: string;
}
export interface OperateSettingParams {
  alarmThreshold: number;
  appointment: boolean;
  aroundFacility: number[];
  devTimeDescription: string;
  discountsDescription: string;
  forcePlateNo: boolean;
  kva: number;
  notice: string;
  outageSoc: number;
  outboundMode: number;
  parkingDescription: string;
  parkingDiscounts: boolean;
  powerAlarm: boolean;
  receiptDescription: string;
  receiptReceive: boolean;
  receiptReceiveLimit: number;
  receiptValidity: number;
  serviceFacility: number[];
  stationId: bigint;
}
export interface OpeningStatusParams {
  id: string;
  openingStatus: boolean;
}
