import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';

export const schemas: FormSchema[] = [
  {
    path: 'userName',
    component: 'NInput',
    label: '用户名称',
    componentProps: { placeholder: '请输入用户名称' },
    span: 6,
  },
  {
    path: 'phonenumber',
    component: 'NInput',
    label: '手机号码',
    componentProps: { placeholder: '请输入手机号码' },
    span: 6,
  },
];

export const columns: BasicColumn[] = [
  { type: 'selection', fixed: 'left', key: '' },
  { title: '用户名称', key: 'userName', width: 100 },
  { title: '用户昵称', key: 'nickName', width: 100 },
  { title: '邮箱', key: 'email', width: 150 },
  { title: '手机', key: 'phonenumber', width: 150 },
  { title: '状态', key: 'status', width: 100 },
  { title: '创建时间', key: 'createTime', width: 150 },
];
