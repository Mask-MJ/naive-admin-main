export interface ListParams {
  pageNum: number;
  pageSize: number;
  phoneNumber?: string;
  nickName?: string;
  status?: number;
}

export interface List {
  id: string;
}

export interface RechargeParams {
  userId: string;
  money: number;
}

export interface RecordListParams {
  pageNum: number;
  pageSize: number;
  beginTime: Date;
  endTime: Date;
  status: number;
  id: string;
}

export interface OverChargeParams {
  limitAmount: number;
  limitOrder: number;
  memberId: string;
  overCharge: boolean;
}

export interface OverListParams {
  pageNum: number;
  pageSize: number;
  startTime: Date;
  endTime: Date;
  orderCode: number;
  stationName: number;
  code: number;
  startMode: number;
  phoneNumber: number;
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
