import type { BasicColumn } from '@/components/Table';
import type { FormSchema } from '@/components/Form';

export const columns: BasicColumn[] = [
  { title: '分组名称', key: 'groupName', width: 150 },
  { title: '排序号', key: 'orderNo', width: 100 },
  { title: '创建者', key: 'createBy', width: 100 },
  { title: '创建时间', key: 'createTime', width: 150 },
  { title: '更新时间', key: 'updateTime', width: 150 },
];

export const schemas: FormSchema[] = [
  {
    path: 'groupName',
    component: 'NInput',
    label: '分组名称',
    span: 8,
    componentProps: { placeholder: '输入分组名称' },
  },
  {
    path: 'groupFatherName',
    component: 'NInput',
    label: '父分组名称',
    span: 8,
    componentProps: { placeholder: '输入父分组名称' },
  },
];
