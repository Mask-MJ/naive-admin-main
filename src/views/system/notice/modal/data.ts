import type { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    path: 'noticeId',
    component: 'NInput',
    show: false,
  },
  {
    path: 'noticeTitle',
    component: 'NInput',
    required: true,
    label: '公告标题',
    componentProps: { placeholder: '请输入公告标题' },
  },
  {
    path: 'noticeType',
    component: 'NSelect',
    required: true,
    label: '公告类型',
    componentProps: {
      options: [
        { label: '通知', value: '1' },
        { label: '公告', value: '2' },
      ],
    },
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
    path: 'noticeContent',
    component: 'NInput',
    label: '内容',
    componentProps: {
      type: 'textarea',
    },
  },
];
