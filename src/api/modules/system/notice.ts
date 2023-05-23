import { defHttp } from '@/api';
import { NoticeParams, NoticeList, NoticeSearchParams } from './types/notice';

enum Api {
  GetNoticeList = '/system/notice/list', // 获取公告列表
  controlNotice = '/system/notice/',
}
// 获取公告列表
export const getNoticeList = (params: NoticeSearchParams) =>
  defHttp.get<NoticeList[]>({ url: Api.GetNoticeList, params });
// 获取设置的 Notice
export const getNotice = (id: string) => defHttp.get({ url: `${Api.controlNotice}${id}` });
// 新增公告
export const addNotice = (params: NoticeParams) => defHttp.post({ url: Api.controlNotice, params });
// 修改公告
export const setNotice = (params: NoticeParams) => defHttp.put({ url: Api.controlNotice, params });
// 删除公告
export const deleteNotice = (params: string) =>
  defHttp.delete({ url: `${Api.controlNotice}${params}` });
