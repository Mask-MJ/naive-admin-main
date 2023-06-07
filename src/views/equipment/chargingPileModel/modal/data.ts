import type { FormSchema } from '@/components/Form';
import { getBrandOptions } from '@/api/modules/equipment/chargingPileBrand';

export const schemas: FormSchema[] = [
  {
    path: 'id',
    component: 'NInput',
    show: false,
  },
  { path: 'name', label: '型号名称', component: 'NInput', required: true },
  {
    path: 'brandId',
    label: '品牌',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: getBrandOptions,
      allOptions: true,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    path: 'chargeType',
    label: '充电类型',
    component: 'NSelect',
    required: true,
    componentProps: {
      options: [
        { label: '直流', value: 1 },
        { label: '交流', value: 2 },
      ],
    },
  },
  { path: 'chargeKw', label: '充电功率(kw)', component: 'NInputNumber', required: true },
  {
    path: 'gunAmount',
    label: '充电枪数量',
    component: 'NInputNumber',
    required: true,
    componentProps: {
      min: 0,
      max: 100,
    },
  },
];
