// 公司详情
export interface companyDetails {
  createTime: string;
  id: number;
  name: string;
  partner: boolean;
  updateTime: string;
}
// 人员列表
export interface DetailListParams {
  id: string;
}
// 人员列表
export interface DetailUserList {
  createTime: string;
  id: string;
  nickName: string;
  userName: string;
  status: string;
}
// 添加用户
export interface SaveUserParams {
  companyId: string;
  userId: string[];
}
// 未归属任何公司的用户列表
export interface unrelatedUserListParams {
  nickName: string;
  userName: string;
  pageSize: number;
  pageNum: number;
}
// 用户列表
export interface unrelatedUserItem {
  id: string;
  nickName: string;
  userName: string;
}
// 未归属任何公司的用户列表
export interface unrelatedUserList {
  currentPage: number;
  total: number;
  totalPage: number;
  rows: unrelatedUserItem[];
}
// 充电桩列表
export interface DetailsPileList {
  code: string;
  id: string;
  name: string;
  stationName: string;
  status: boolean;
}
// 充电桩删除
export interface DeleteListParams {
  idList: string;
}
// 未归属任何公司的充电桩列表
export interface unrelatedPileListParams {
  name: string;
  stationName: string;
  status: string;
  pageSize: number;
  pageNum: number;
}
// 充电桩列表
export interface unrelatedPileItem {
  code: string;
  id: string;
  name: string;
}
// 未归属任何公司的充电桩列表
export interface unrelatedPileList {
  currentPage: number;
  total: number;
  totalPage: number;
  rows: unrelatedPileItem[];
}
// 公司详情-添加充电桩
export interface SavePileParams {
  companyId: string;
  pileId: string[];
}
