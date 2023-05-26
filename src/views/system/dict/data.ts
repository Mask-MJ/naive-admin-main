import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';

import { NTag } from 'naive-ui';

export const schemas: FormSchema[] = [
  {
    path: 'dictName',
    component: 'NInput',
    label: '字典名称',
    span: 6,
    componentProps: { placeholder: '请输入字典名称' },
  },
  {
    path: 'dictType',
    component: 'NInput',
    label: '字典类型',
    span: 6,
    componentProps: { placeholder: '请输入字典类型' },
  },
  {
    path: 'status',
    component: 'NSelect',
    label: '状态',
    span: 4,
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
];

export const columns: BasicColumn[] = [
  { title: '编号', key: 'dictId', width: 80 },
  { title: '字典名称', key: 'dictName', width: 150 },
  { title: '字典类型', key: 'dictType', width: 200 },
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
  { title: '备注', key: 'remark', width: 200 },
  { title: '创建时间', key: 'createTime', width: 200 },
];
