import type { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    path: 'postId',
    component: 'NInput',
    show: false,
  },
  {
    path: 'postName',
    component: 'NInput',
    required: true,
    label: '岗位名称',
    componentProps: { placeholder: '请输入岗位名称' },
  },
  {
    path: 'postCode',
    component: 'NInput',
    required: true,
    label: '岗位编码',
    componentProps: { placeholder: '请输入岗位编码' },
  },
  {
    path: 'postSort',
    component: 'NInputNumber',
    required: true,
    label: '岗位排序',
    componentProps: { placeholder: '请输入岗位名称' },
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
    path: 'remark',
    component: 'NInput',
    label: '备注',
    componentProps: { type: 'textarea', placeholder: '请输入内容' },
  },
];
