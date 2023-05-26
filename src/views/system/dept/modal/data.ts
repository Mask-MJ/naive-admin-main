import type { FormSchema } from '@/components/Form';
import { getTreeSelect } from '@/api/modules/system/dept';

export const schemas: FormSchema[] = [
  { path: 'deptId', component: 'NInput', show: false },
  {
    path: 'deptName',
    component: 'NInput',
    required: true,
    label: '部门名称',
    componentProps: { placeholder: '请输入部门名称' },
  },
  {
    path: 'leader',
    component: 'NInput',
    label: '负责人',
    componentProps: { placeholder: '请输入负责人' },
  },
  {
    path: 'phone',
    component: 'NInput',
    label: '联系电话',
    rule: [{ pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '手机号码不正确' }],
    componentProps: { placeholder: '请输入电话' },
  },
  {
    path: 'email',
    component: 'NInput',
    label: '邮箱',
    rule: [
      {
        pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
        message: '邮箱格式不正确',
      },
      { max: 50, message: '邮箱不得超过50字符' },
    ],
    componentProps: { placeholder: '请输入邮箱' },
  },
  {
    path: 'orderNum',
    component: 'NInputNumber',
    required: true,
    label: '显示排序',
    componentProps: { placeholder: '排序' },
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
    path: 'parentId',
    component: 'ApiTreeSelect',
    label: '部门权限',
    required: true,
    componentProps: {
      api: getTreeSelect,
      keyField: 'deptId',
      labelField: 'deptName',
    },
  },
];
