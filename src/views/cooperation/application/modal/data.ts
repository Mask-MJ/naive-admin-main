import type { DescItem } from '@/components/Descriptions';
import type { FormSchema } from '@/components/Form';
import { getGroupList, uploadIcon } from '@/api/modules/cooperation/application';

export const schemas: FormSchema[] = [
  {
    path: 'id',
    component: 'NInput',
    show: false,
  },
  { path: 'name', component: 'NInput', required: true, label: '应用名称' },
  {
    path: 'groupId',
    label: '所属分组',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: getGroupList,
      allOptions: true,
      resultField: 'rows',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    path: 'enable',
    component: 'NRadioGroup',
    label: '启用状态',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '禁用', value: false },
      ],
    },
  },
  { path: 'sort', component: 'NInputNumber', required: true, label: '排序号' },
  { path: 'url', component: 'NInput', required: true, label: '跳转地址' },
  {
    path: 'icon',
    component: 'Upload',
    label: '图标地址',
    componentProps: {
      max: 1,
      name: 'icon',
      accept: 'image/*',
      type: ['image/png', 'image/jpeg', 'image/jpg'],
      api: uploadIcon,
    },
  },
];

export const DescItemSchemas: DescItem[] = [
  { path: 'appName', label: '应用名称' },
  { path: 'groupName', label: '所属分组' },
  { path: 'sort', label: '排序号' },
  { path: 'enable', label: '启用状态', render: (val) => (val ? '已启用' : '未启用') },
  { path: 'createBy', label: '创建人' },
  { path: 'createTime', label: '创建时间' },
  { path: 'url', label: '跳转地址', span: 3 },
  { path: 'icon', label: '图标地址', span: 3 },
];
