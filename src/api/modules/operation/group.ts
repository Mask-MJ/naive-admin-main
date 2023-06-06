import type { GroupList, GroupListParams, GroupParams } from './types/group';
import { defHttp } from '@/api';

enum Api {
  List = '/base/charging-group/group/list',
  TreeList = '/base/charging-group/group/treeList',
  Group = '/base/charging-group/group',
  ListDeTa = '/base/charging-group/{id}',
  FatherGroup = '/base/charging-group/fatherGroup',
  DeleteGroup = '/base/charging-group/group/',
}

export const getGroupList = (params: GroupListParams) =>
  defHttp.get<GroupList[]>({ url: Api.List, params });

export const addGroup = (params: GroupParams) => defHttp.post({ url: Api.Group, params });

export const setGroup = (params: GroupParams) => defHttp.put({ url: Api.Group, params });

export const getFatherGroup = () => defHttp.get({ url: Api.FatherGroup });

export const deleteGroup = (id: string) => defHttp.delete({ url: Api.DeleteGroup + id });
