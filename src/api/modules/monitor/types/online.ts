export interface OnlineList {
  tokenId: string;
  userName: string;
  ipaddr: string;
  loginTime: string;
}

export interface OnlineListParams {
  ipaddr: string;
  userName: string;
  pageNum: number;
  pageSize: number;
}
