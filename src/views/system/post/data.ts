import type { BasicColumn } from '@/components/Table';
import type { FormSchema } from '@/components/Form';
import type { PostList } from '@/api/modules/system/types/post';

import { NTag } from 'naive-ui';

export const columns: BasicColumn<PostList>[] = [
  {
    title: '岗位编号',
    key: 'postId',
    width: 100,
  },
  {
    title: '岗位编码',
    key: 'postCode',
    width: 100,
  },
  {
    title: '岗位名称',
    key: 'postName',
    width: 200,
  },
  {
    title: '岗位排序',
    key: 'postSort',
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (rowData) => {
      const status = rowData.status;
      const enable = ~~status === 0;
      return h(NTag, { type: enable ? 'success' : 'error' }, () => (enable ? '启用' : '停用'));
    },
  },

  {
    title: '创建时间',
    key: 'createTime',
    width: 200,
  },
];

export const schemas: FormSchema[] = [
  {
    path: 'postCode',
    component: 'NInput',
    label: '岗位编码',
    span: 6,
    defaultValue: '',
    componentProps: { placeholder: '请输入岗位编码' },
  },
  {
    path: 'postName',
    component: 'NInput',
    label: '岗位名称',
    span: 6,
    defaultValue: '',
    componentProps: { placeholder: '请输入岗位名称' },
  },
  {
    path: 'status',
    component: 'NSelect',
    label: '状态',
    span: 4,
    componentProps: {
      options: [
        { label: '正常', value: '0', key: '0' },
        { label: '停用', value: '1', key: '1' },
      ],
    },
  },
];
