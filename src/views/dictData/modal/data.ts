import type { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    path: 'dictType',
    component: 'NInput',
    required: true,
    label: '字典类型',
    componentProps: { maxlength: 30, disabled: true },
  },
  {
    path: 'dictCode',
    component: 'NInput',
    label: '字典类型',
    show: false,
    componentProps: { maxlength: 30 },
  },
  {
    path: 'dictLabel',
    component: 'NInput',
    required: true,
    label: '字典标签',
    componentProps: { maxlength: 30 },
  },
  {
    path: 'dictValue',
    component: 'NInput',
    required: true,
    label: '字典键值',
    componentProps: { maxlength: 30 },
  },
  {
    path: 'cssClass',
    component: 'NInput',
    label: '样式属性',
    componentProps: { maxlength: 30 },
  },
  {
    path: 'listClass',
    component: 'NSelect',
    label: '回显样式',
    defaultValue: 'default',
    componentProps: {
      options: [
        { value: 'default', label: '默认' },
        { value: 'primary', label: '主要' },
        { value: 'success', label: '成功' },
        { value: 'info', label: '信息' },
        { value: 'warning', label: '警告' },
        { value: 'danger', label: '危险' },
      ],
    },
  },
  {
    path: 'dictSort',
    component: 'NInputNumber',
    required: true,
    label: '字典排序',
    componentProps: { max: 30, precision: 0 },
  },
  {
    path: 'isDefault',
    component: 'NRadioGroup',
    label: '系统默认',
    defaultValue: 'N',
    componentProps: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
    },
  },
  {
    path: 'status',
    component: 'NRadioGroup',
    label: '状态',
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
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea' },
  },
];
