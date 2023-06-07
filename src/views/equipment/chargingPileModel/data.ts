import type { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '型号名称', key: 'modelName', width: 200 },
  { title: '品牌', key: 'brandName', width: 200 },
  { title: '充电枪数量', key: 'gunAmount', width: 100 },
  {
    title: '充电类型',
    key: 'chargeType',
    width: 100,
    render: (rowData) => (rowData.chargeType === 1 ? '直流' : '交流'),
  },
  { title: '充电功率', key: 'chargeKw', width: 100 },
  { title: '创建者', key: 'createBy', width: 100 },
  { title: '创建时间', key: 'createTime', width: 200 },
  { title: '更新时间', key: 'updateTime', width: 200 },
];

export const schemas: FormSchema[] = [
  { path: 'brandName', label: '品牌名称', component: 'NInput', span: 8 },
  { path: 'modelName', label: '型号名称', component: 'NInput', span: 8 },
  {
    path: 'chargeType',
    label: '充电类型',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '直流', value: 1 },
        { label: '交流', value: 2 },
      ],
    },
  },
];
