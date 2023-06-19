import type { FormSchema } from '@/components/Form';
import { getChargeType } from '@/api/modules/equipment/chargingCarModel';

export const schemas: FormSchema[] = [
  {
    path: 'id',
    component: 'NInput',
    show: false,
  },
  { path: 'name', component: 'NInput', required: true, label: '型号名称' },
  {
    path: 'count',
    component: 'NInputNumber',
    required: true,
    label: '充电枪数量',
    componentProps: { min: 0 },
  },
  {
    path: 'chargeType',
    component: 'ApiSelect',
    required: true,
    label: '充电类型',
    componentProps: {
      immediate: true,
      api: getChargeType,
      labelField: 'dictLabel',
      valueField: 'dictCode',
    },
  },
];
