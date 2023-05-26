import type { BasicColumn, FormSchema } from '@/components/Table';

export const schemas: FormSchema[] = [
  {
    path: 'divider-basic',
    component: 'NDivider',
    label: '基本信息',
    span: 24,
  },
  {
    path: 'nickName',
    component: 'NInput',
    label: '用户昵称',
    span: 12,
    labelWidth: 200,
    componentProps: { disabled: true },
  },
  {
    path: 'userName',
    component: 'NInput',
    label: '登录账号',
    span: 12,
    labelWidth: 200,
    componentProps: { disabled: true },
  },
];

export const columns: BasicColumn[] = [
  { type: 'selection', fixed: 'left', key: '' },
  { title: '角色编号', key: 'roleId', width: 200 },
  { title: '角色名称', key: 'roleName', width: 200 },
  { title: '权限字符', key: 'roleKey', width: 200 },
  { title: '创建时间', key: 'createTime', width: 200 },
];
