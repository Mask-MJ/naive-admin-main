import type { FormSchema } from '@/components/Form';
import { getMenuList } from '@/api/modules/system/menu';

export const schemas: FormSchema[] = [
  {
    path: 'menuId',
    component: 'NInput',
    show: false,
  },
  {
    path: 'menuType',
    component: 'NRadioGroup',
    required: true,
    label: '菜单类型',
    defaultValue: 'M',
    componentProps: {
      type: 'Button',
      options: [
        { label: '目录', value: 'M' },
        { label: '菜单', value: 'C' },
        { label: '按钮', value: 'F' },
      ],
    },
  },
  {
    path: 'menuName',
    component: 'NInput',
    required: true,
    label: '菜单名称',
  },
  {
    path: 'parentId',
    label: '上级菜单',
    component: 'ApiTreeSelect',
    ifShow: ({ values }) => values.menuType === 'C',
    componentProps: {
      api: getMenuList,
      resultField: 'data',
      keyField: 'menuId',
      labelField: 'menuName',
    },
  },
  {
    path: 'orderNum',
    label: '排序',
    component: 'NInputNumber',
    required: true,
  },
  {
    path: 'icon',
    label: '图标',
    component: 'NIconPicker',
    required: true,
    ifShow: ({ values }) => values.menuType !== 'F',
  },
  {
    path: 'path',
    label: '路由地址',
    component: 'NInput',
    required: true,
    ifShow: ({ values }) => values.menuType !== 'F',
  },
  {
    path: 'perms',
    label: '权限标识',
    component: 'NInput',
    ifShow: ({ values }) => values.menuType !== 'M',
  },
  {
    path: 'status',
    label: '状态',
    component: 'NRadioGroup',
    defaultValue: '0',
    componentProps: {
      type: 'Button',
      options: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
    },
  },
  {
    path: 'isFrame',
    label: '是否外链',
    component: 'NRadioGroup',
    defaultValue: '1',
    componentProps: {
      type: 'Button',
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
    ifShow: ({ values }) => values.menuType !== 'F',
  },
  {
    path: 'isCache',
    label: '是否缓存',
    component: 'NRadioGroup',
    defaultValue: '0',
    componentProps: {
      type: 'Button',
      options: [
        { label: '缓存', value: '0' },
        { label: '不缓存', value: '1' },
      ],
    },
    ifShow: ({ values }) => values.menuType === 'C',
  },
  {
    path: 'visible',
    label: '是否显示',
    component: 'NRadioGroup',
    defaultValue: '0',
    componentProps: {
      type: 'Button',
      options: [
        { label: '显示', value: '0' },
        { label: '隐藏', value: '1' },
      ],
    },
    ifShow: ({ values }) => values.menuType !== 'F',
  },
];
