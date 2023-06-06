import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';

import dayjs from 'dayjs';

export const schemas: FormSchema[] = [
  {
    path: 'ruleModel',
    component: 'NSelect',
    label: '规则模式',
    span: 8,
    componentProps: {
      options: [
        { label: '标准计费', value: 0 },
        { label: '分时计费', value: 1 },
      ],
    },
  },
];

export const columns: BasicColumn[] = [
  {
    title: '规则模式',
    key: 'ruleModel',
    width: 100,
    render: (rowData) => (rowData.ruleModel === 0 ? '标准计费' : '分时计费'),
  },
  {
    title: '下发时间',
    key: 'issueTime',
    width: 150,
    render: (rowData) => dayjs(rowData.issueTime).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '审核通过时间',
    key: 'passTime',
    width: 150,
    render: (rowData) => dayjs(rowData.passTime).format('YYYY-MM-DD HH:mm:ss'),
  },
  { title: '版本号', key: 'versionNo', width: 80 },
];
