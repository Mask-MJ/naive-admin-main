import type { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    path: 'configId',
    component: 'NInput',
    show: false,
  },
  {
    path: 'configName',
    component: 'NInput',
    required: true,
    label: '参数名称',
    componentProps: { maxlength: 30 },
  },
  {
    path: 'configKey',
    component: 'NInput',
    required: true,
    label: '参数键名',
    componentProps: { maxlength: 30 },
  },
  {
    path: 'configValue',
    component: 'NInput',
    required: true,
    label: '参数键值',
    componentProps: { maxlength: 30 },
  },
  {
    path: 'configType',
    label: '系统内置',
    component: 'NRadioGroup',
    defaultValue: 'N',
    componentProps: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
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
