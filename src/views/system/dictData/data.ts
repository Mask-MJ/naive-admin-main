import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';
import { getDictList } from '@/api/modules/system/dict';

import { NTag } from 'naive-ui';

export const schemas: FormSchema[] = [
  {
    path: 'dictType',
    component: 'ApiSelect',
    label: '字典名称',
    span: 6,
    componentProps: {
      disabled: true,
      api: getDictList,
      immediate: true,
      resultField: 'rows',
      labelField: 'dictName',
      valueField: 'dictType',
    },
  },
  {
    path: 'dictLabel',
    component: 'NInput',
    label: '字典标签',
    span: 6,
    componentProps: { placeholder: '请输入字典标签' },
  },
  {
    path: 'status',
    component: 'NSelect',
    label: '数据状态',
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
  { title: '字典编码', key: 'dictCode', width: 80 },
  { title: '字典标签', key: 'dictLabel', width: 150 },
  { title: '字典键值', key: 'dictValue', width: 200 },
  { title: '字典排序', key: 'dictSort', width: 100 },
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
