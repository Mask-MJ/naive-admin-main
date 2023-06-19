export interface SearchListParams {
  startTime: string;
  endTime: string;
  cardCode: string;
  // 卡类型
  type: number;
  phoneNumber: string;
  verifyPassword: number;
  status: number;
  blackWhiteList: number;
}

export interface CardList {
  blackWhiteList: {
    desc: string;
    type: number;
  };
  cardCode: string;
  createBy: string;
  createTime: string;
  id: string;
  memberId: number;
  ownerId: number;
  phoneNumber: string;
  status: {
    desc: string;
    type: number;
  };
  type: {
    desc: string;
    type: number;
  };
  updateBy: string;
  updateTime: string;
  verifyPassword: {
    desc: string;
    type: number;
  };
}

export interface SetCard {
  id?: string;
  blackWhiteList: number;
  cardCode: string;
  memberId: number;
  password: string;
  remark: string;
  status: number;
  type: number;
  verifyPassword: number;
}

export interface memberListParams {
  phoneNumber: string;
  pageNum: number;
  pageSize: number;
}

export interface MemberList {
  nickname: string;
  phoneNumber: string;
  id: number;
}

export interface CardInfo {
  balance: number;
  blackWhiteList: number;
  cardCode: string;
  createBy: string;
  createTime: string;
  id: number;
  memberId: number;
  ownerId: number;
  password: string;
  status: number;
  type: number;
  updateBy: string;
  updateTime: string;
  verifyPassword: number;
}
