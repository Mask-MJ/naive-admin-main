import type { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    path: 'id',
    component: 'NInput',
    show: false,
  },
  { path: 'name', component: 'NInput', required: true, label: '应用名称' },
];
