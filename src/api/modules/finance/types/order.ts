export interface ListParams {
  startTime: string;
  endTime: string;
  code: number;
  payStatus: number;
  paymentMethod: number;
  startPayTime: string;
  endPayTime: string;
  memberBelong: number;
  createBy: number;
  orderStatus: number;
}

export interface OrderList {
  id: string;
  code: string;
  ownerId: string;
  userId: string;
  phoneNumber: string;
  credential: string;
  totalAmount: number;
  paymentMethod: { type: number; desc: string };
  orderStatus: { type: number; desc: string };
  payStatus: { type: number; desc: string };
  remark: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  payTime: string;
}

export interface UserList {
  id: string;
  nickName: string;
  phoneNumber: string;
}
