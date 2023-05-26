import type { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    path: 'dictId',
    component: 'NInput',
    show: false,
  },
  {
    path: 'dictName',
    component: 'NInput',
    required: true,
    label: '字典名称',
    componentProps: { maxlength: 30 },
  },
  {
    path: 'dictType',
    component: 'NInput',
    required: true,
    label: '字典类型',
    componentProps: { maxlength: 30 },
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
