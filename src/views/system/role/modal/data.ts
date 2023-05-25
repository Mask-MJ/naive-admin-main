import type { FormSchema } from '@/components/Form';
import { getTreeSelect, getRoleDeptTree } from '@/api/modules/system/role';

export const setSchemas: FormSchema[] = [
  {
    path: 'roleName',
    component: 'NInput',
    required: true,
    label: '角色名称',
    defaultValue: '',
    componentProps: { placeholder: '请输入角色名称' },
  },
  {
    path: 'roleKey',
    component: 'NInput',
    required: true,
    label: '权限字符',
    defaultValue: '',
    componentProps: { placeholder: '请输入权限字符' },
  },
  {
    path: 'roleSort',
    component: 'NInputNumber',
    label: '显示顺序',
    required: true,
    defaultValue: 0,
    componentProps: { placeholder: '显示顺序' },
  },
  {
    path: 'status',
    label: '状态',
    component: 'NRadioGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
  {
    path: 'menuIds',
    component: 'ApiTree',
    label: '菜单权限',
    required: true,
    componentProps: {
      api: getTreeSelect,
      keyField: 'id',
      checkable: true,
      virtualScroll: true,
      style: { height: '120px' },
    },
  },
  {
    path: 'remark',
    component: 'NInput',
    label: '备注',
    defaultValue: '',
    componentProps: { type: 'textarea', placeholder: '请输入内容' },
  },
];

export const depSchemas: FormSchema[] = [
  {
    path: 'roleName',
    component: 'NInput',
    label: '角色名称',
    componentProps: {
      disabled: true,
    },
  },
  {
    path: 'roleId',
    component: 'NInput',
    label: '角色Id',
    componentProps: {
      disabled: true,
    },
  },
  {
    path: 'roleKey',
    component: 'NInput',
    label: '权限字符',
    componentProps: {
      disabled: true,
    },
  },
  {
    path: 'dataScope',
    component: 'NSelect',
    label: '权限范围',
    required: true,
    componentProps: {
      options: [
        { id: '1', value: '1', label: '全部数据权限' },
        { id: '2', value: '2', label: '自定数据权限' },
        { id: '3', value: '3', label: '本部门数据权限' },
        { id: '4', value: '4', label: '本部门及以下数据权限' },
        { id: '5', value: '5', label: '仅本人数据权限' },
      ],
    },
  },
  {
    path: 'deptIds',
    label: '数据权限',
    component: 'ApiTree',
    required: true,
    ifShow: ({ values }) => values.dataScope === '2',
    componentProps: {
      api: getRoleDeptTree,
      immediate: false,
      resultField: 'depts',
      checkable: true,
      keyField: 'id',
    },
  },
];
