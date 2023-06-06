import type {
  RuleList,
  SearchListParams,
  ManageParams,
  historyListParams,
  AuditParams,
} from './types/rule';
import { defHttp } from '@/api';

enum Api {
  List = '/base/charging-manage/manage/list',
  FatherGroup = '/base/charging-group/fatherGroup',
  Manage = '/base/charging-manage/manage',
  Commit = '/base/charging-manage/manage/commit',
  Audit = '/base/charging-manage/manage/audit',
  Details = '/base/charging-manage/manage/details/',
  HistoryList = '/base/charging-history/history/historyList',
  HistoryListDetails = '/base/charging-history/details/',
  RunJob = '/base/charging-manage/manage/immediately-issue/',
}

/** 获取树结构 */
export const getFatherGroup = () => defHttp.get({ url: Api.FatherGroup });
/** 获取列表 */
export const getRuleList = (params: SearchListParams) =>
  defHttp.get<RuleList[]>({ url: Api.List, params });
/** 新增 */
export const addManage = (params: ManageParams) => defHttp.post({ url: Api.Manage, params });
/** 修改 */
export const setManage = (params: ManageParams) => defHttp.put({ url: Api.Manage, params });
/** 立即下发 */
export const runJob = (id: string) => defHttp.put({ url: `${Api.RunJob}${id}` });
/** 申请 */
export const applyManage = (id: string) => defHttp.put({ url: `${Api.Commit}/${id}` });
/** 删除 */
export const deleteManage = (id: string) => defHttp.delete({ url: `${Api.Manage}/${id}` });
/** 获取历史列表 */
export const getHistoryList = (params: historyListParams) =>
  defHttp.get({ url: Api.HistoryList, params });
/** 审核 */
export const auditRule = (params: AuditParams) =>
  defHttp.put({ url: Api.Audit, params }, { joinParamsToUrl: true });
/** 详情 */
export const getListDetail = (id: string) => defHttp.get({ url: `${Api.Details}/${id}` });
/** 历史详情 */
export const getHistoryListDetails = (ruleId: number) =>
  defHttp.get({ url: Api.HistoryListDetails + ruleId });
