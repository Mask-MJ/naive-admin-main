import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';
import { NTag } from 'naive-ui';

export const schemas: FormSchema[] = [
  {
    path: 'menuName',
    component: 'NInput',
    label: '菜单名称',
    span: 8,
    componentProps: { placeholder: '请输入菜单名称' },
  },
  {
    path: 'status',
    component: 'NSelect',
    label: '状态',
    span: 8,
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
];

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    key: 'menuName',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    key: 'icon',
    width: 50,
    render: (rowData) => h('i', { class: `i-${rowData.icon}` }),
  },
  {
    title: '权限标识',
    key: 'perms',
    width: 180,
  },
  {
    title: '排序',
    key: 'orderNum',
    width: 50,
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
    render: (rowData) => {
      const status = rowData.status;
      const enable = ~~status === 0;
      return h(NTag, { type: enable ? 'success' : 'error' }, () => (enable ? '正常' : '停用'));
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 180,
  },
];
