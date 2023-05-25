import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';

import { NTag } from 'naive-ui';

export const schemas: FormSchema[] = [
  {
    path: 'configName',
    component: 'NInput',
    label: '参数名称',
    span: 6,
    componentProps: { placeholder: '请输入参数名称' },
  },
  {
    path: 'configKey',
    component: 'NInput',
    label: '参数键名',
    span: 6,
    componentProps: { placeholder: '请输入参数键名' },
  },
  {
    path: 'configType',
    component: 'NSelect',
    label: '系统内置',
    span: 4,
    componentProps: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
    },
  },
];

export const columns: BasicColumn[] = [
  { title: '参数主键', key: 'configId', width: 100 },
  { title: '参数名称', key: 'configName', width: 200 },
  { title: '参数键名', key: 'configKey', width: 200 },
  { title: '参数键值', key: 'configValue', width: 200 },
  {
    title: '系统内置',
    key: 'configType',
    width: 100,
    render: (rowData) => {
      const enable = rowData.configType === 'Y';
      return h(NTag, { type: enable ? 'success' : 'error' }, () => (enable ? '是' : '否'));
    },
  },
  { title: '备注', key: 'remark', width: 200 },
  { title: '创建时间', key: 'createTime', width: 200 },
];
