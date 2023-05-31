export interface ListParams {
  phoneNumber: string;
  nickName: string;
  status: number;
}

export interface List {
  id: string;
}

export interface RechargeParams {
  userId: string;
  money: number;
  [x: string]: any;
}

export interface RecordList {
  adjustMoney: number;
  balance: number;
  createTime: string;
  id: string;
  incomeOrPay: string;
  tradeSource: string;
  tradeType: { desc: string; type: number };
}

export interface RecordListParams {
  status: number;
  id: string;
  beginTime: Date;
  endTime: Date;
}

export interface OverChargeParams {
  id: string;
  limitAmount: number;
  limitOrder: number;
  memberId: string;
  overCharge: boolean;
}

export interface OverListParams {
  pageNum: number;
  pageSize: number;
  orderCode: number;
  stationName: number;
  code: number;
  startMode: number;
  phoneNumber: number;
  startTime: Date;
  endTime: Date;
}

export interface OverList {
  beginTime: string;
  code: string;
  createBy: string;
  createTime: string;
  discountMoney: number;
  endTime: string;
  gunId: string;
  gunName: string;
  id: string;
  isAbnormal: boolean;
  memberCarId: null | string;
  memberId: string;
  orderCode: string;
  orderStatus: { type: number; desc: string };
  originalMoney: number;
  ownerId: string;
  payStatus: { type: number; desc: string };
  payTime: null | string;
  paymentMethod: null | { type: number; desc: string };
  phoneNumber: string;
  pileId: string;
  source: number;
  startMode: { type: number; desc: string };
  stationId: string;
  stationName: string;
  totalBattery: number;
  totalMoney: number;
  totalTime: string;
  updateBy: string;
  updateTime: string;
}

export interface userCardItem {
  id: string;
  cardCode: string;
  type: {
    desc: string;
    type: number;
  };
  status: {
    desc: string;
    type: number;
  };
}

export interface Details {
  phoneNumber: string;
  userCard: userCardItem[];
}

export interface CarDetail {
  licenceNumber: string;
  carBrand: string;
  carSeries: string;
  carType: string;
}
