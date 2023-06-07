import type { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '型号名称', key: 'name', width: 200 },
  { title: '充电枪数量', key: 'count', width: 100 },
  { title: '充电类型', key: 'chargeType', width: 100 },
  { title: '创建人', key: 'createBy', width: 100 },
  { title: '创建时间', key: 'createTime', width: 200 },
  { title: '更新时间', key: 'updateTime', width: 200 },
];

export const schemas: FormSchema[] = [
  { path: 'moduleName', label: '型号名称', component: 'NInput', span: 8 },
  {
    path: 'chargeType',
    label: '充电类型',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '交流', value: '34' },
        { label: '直流', value: '35' },
        { label: '混合', value: '36' },
      ],
    },
  },
];
