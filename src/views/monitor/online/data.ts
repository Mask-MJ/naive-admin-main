import type { BasicColumn, FormSchema } from '@/components/Table';
import type { OnlineList } from '@/api/modules/monitor/types/online';

export const columns: BasicColumn<OnlineList>[] = [
  {
    title: '会话编号',
    key: 'tokenId',
    width: 300,
  },
  {
    title: '登录名称',
    key: 'userName',
    width: 100,
  },
  {
    title: '主机',
    key: 'ipaddr',
    width: 100,
  },

  {
    title: '登录时间',
    key: 'loginTime',
    width: 150,
  },
];

export const schemas: FormSchema[] = [
  {
    path: 'ipaddr',
    label: '登录地址',
    component: 'NInput',
    span: 8,
  },
  {
    path: 'userName',
    label: '用户名称',
    component: 'NInput',
    span: 8,
  },
];
