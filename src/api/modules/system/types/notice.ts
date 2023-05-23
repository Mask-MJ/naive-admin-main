export interface NoticeList {
  noticeId: string;
  noticeType: string;
  status: string;
}
export interface NoticeParams {
  noticeTitle: string;
  noticeType: string;
}

export interface NoticeSearchParams extends NoticeParams {
  status: string;
}
