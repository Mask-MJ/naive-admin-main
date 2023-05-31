import type { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    path: 'id',
    component: 'NInput',
    show: false,
  },
  {
    path: 'partner',
    label: '合伙状态',
    component: 'NRadioGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '合作中', value: true },
        { label: '未合作', value: false },
      ],
    },
  },
  {
    path: 'name',
    component: 'NInput',
    label: '公司名称',
  },
];
