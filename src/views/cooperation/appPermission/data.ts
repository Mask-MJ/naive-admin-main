import type { BasicColumn, FormSchema } from '@/components/Table';
import type { ListResult } from '@/api/modules/cooperation/types/appPermission';

export const schemas: FormSchema[] = [
  { path: 'appName', component: 'NInput', label: '应用名称', span: 8 },
  {
    path: 'enable',
    label: '启用状态',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  { path: 'groupName', component: 'NInput', label: '所属分组', span: 8 },
  { path: 'userName', component: 'NInput', label: '登录名称', span: 8 },
  { path: 'nickName', component: 'NInput', label: '用户名称', span: 8 },
];

export const columns: BasicColumn<ListResult>[] = [
  { title: '登录名称', key: 'userName', width: 80 },
  { title: '用户姓名', key: 'nickName', width: 80 },
  { title: '应用名称', key: 'appName', width: 100 },
  { title: '所属分组', key: 'groupName', width: 80 },
  { title: '图标地址', key: 'iconPath', width: 120 },
  { title: '跳转地址', key: 'url', width: 150 },
  { title: '排序号', key: 'sort', width: 60 },
  {
    title: '启用状态',
    key: 'isEnable',
    width: 80,
    render: (rowData) => (rowData.isEnable ? '启用' : '停用'),
  },
  { title: '创建人', key: 'createBy', width: 80 },
  { title: '创建时间', key: 'createTime', width: 150 },
];
