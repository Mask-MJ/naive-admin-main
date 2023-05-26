import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';

import { NTag } from 'naive-ui';

export const schemas: FormSchema[] = [
  {
    path: 'deptName',
    component: 'NInput',
    label: '部门名称',
    span: 8,
    componentProps: { placeholder: '请输入部门名称' },
  },
  {
    path: 'status',
    component: 'NSelect',
    label: '状态',
    span: 8,
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
];

export const columns: BasicColumn[] = [
  { title: '部门名称', key: 'deptName', width: 200 },
  { title: '排序', key: 'orderNum', width: 100 },
  {
    title: '状态',
    key: 'status',
    width: 150,
    render: (rowData) => {
      const status = rowData.status;
      const enable = ~~status === 0;
      return h(NTag, { type: enable ? 'success' : 'error' }, () => (enable ? '正常' : '停用'));
    },
  },
  { title: '创建时间', key: 'createTime', width: 180 },
  { title: '手机号码', key: 'phone', width: 180 },
];
