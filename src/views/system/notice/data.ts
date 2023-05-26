import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';

import { NTag } from 'naive-ui';

export const schemas: FormSchema[] = [
  {
    path: 'noticeTitle',
    component: 'NInput',
    label: '公告标题',
    span: 6,
    componentProps: { placeholder: '请输入公告标题' },
  },
  {
    path: 'createBy',
    component: 'NInput',
    label: '操作人员',
    span: 6,
    componentProps: { placeholder: '请输入操作人员' },
  },
  {
    path: 'noticeType',
    component: 'NSelect',
    label: '类型',
    span: 4,
    componentProps: {
      options: [
        { label: '通知', value: '1' },
        { label: '公告', value: '2' },
      ],
    },
  },
];

export const columns: BasicColumn[] = [
  { type: 'selection', key: '' },
  { title: '编号', key: 'noticeId', width: 100 },
  { title: '公告标题', key: 'noticeTitle', width: 200 },
  {
    title: '公告类型',
    key: 'noticeType',
    width: 100,
    render: (rowData) => (rowData.noticeType === '2' ? '公告' : '通知'),
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (rowData) => {
      const status = rowData.status;
      const enable = ~~status === 0;
      return h(NTag, { type: enable ? 'success' : 'error' }, () => (enable ? '正常' : '停用'));
    },
  },
  { title: '创建者', key: 'createBy', width: 100 },
  { title: '创建时间', key: 'createTime', width: 200 },
];
