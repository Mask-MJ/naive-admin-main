export interface CouponSearchParams {
  beginCreateTime: string;
  canStack: number;
  discountType: number;
  endCreateTime: string;
  maxAmount: number;
  minAmount: number;
  minConsumptionMax: number;
  minConsumptionMin: number;
  name: string;
  nickName: string;
  phoneNumber: string;
  source: number;
  used: number;
}

export interface CouponList {
  id: string;
  name: string;
  amount: number;
  discountType: { type: number; desc: string };
  minConsumption: number;
  canStack: boolean;
  expiryDate: string;
  source: number;
  phoneNumber: string;
  nickName: string;
  createTime: string;
  used: boolean;
}
