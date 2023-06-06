import type { FormSchema } from '@/components/Table';
import { getFatherGroup } from '@/api/modules/operation/group';

export const schemas: FormSchema[] = [
  { path: 'id', component: 'NInput', show: false },
  {
    path: 'groupName',
    component: 'NInput',
    label: '名称',
    required: true,
    componentProps: { placeholder: '请输入名称' },
  },
  {
    path: 'groupFather',
    label: '父分组',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getFatherGroup,
      labelField: 'groupName',
      keyField: 'id',
    },
  },
  { path: 'orderNo', component: 'NInputNumber', label: '排序号', required: true },
];
