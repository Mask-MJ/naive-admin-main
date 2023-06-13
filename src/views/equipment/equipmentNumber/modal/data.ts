import type { FormSchema } from '@/components/Form';

import { getBrandOptions } from '@/api/modules/equipment/chargingPileBrand';
import { getModelOptions } from '@/api/modules/equipment/chargingPileModel';
import { getEquipmentNewCode } from '@/api/modules/equipment/equipmentNumber';

export const schemas = (type: 'set' | 'batch'): FormSchema[] => {
  return [
    {
      path: 'id',
      component: 'NInput',
      show: false,
    },
    {
      path: 'brandId',
      component: 'ApiSelect',
      required: true,
      label: '品牌',
      componentProps: ({ formActionType }) => ({
        api: getBrandOptions,
        labelField: 'name',
        valueField: 'id',
        onUpdateValue: () => {
          const { setPathsValue } = formActionType;
          setPathsValue({ modelId: null });
        },
      }),
    },
    {
      path: 'modelId',
      component: 'ApiSelect',
      required: true,
      label: '型号',
      ifShow: ({ values }) => !!values.brandId,
      componentProps: ({ formModel }) => ({
        api: getModelOptions,
        params: { brandId: formModel.brandId },
        labelField: 'name',
        valueField: 'id',
      }),
    },
    {
      path: 'code',
      component: 'NInput',
      label: '设备编码',
      rule: {
        required: true,
        validator: (_rule, value) => /^\d{16}$/.test(value),
        message: '设备编码为16位数字',
        trigger: 'blur',
      },
      componentProps: { maxlength: 16 },
      ifShow: () => type === 'set',
      renderComponentContent: ({ model }) => ({
        suffix: () =>
          h('i', {
            class: 'i-carbon:renew cursor-pointer',
            onClick: async () => {
              model.code = await getEquipmentNewCode();
            },
          }),
      }),
    },
    {
      path: 'codeNum',
      component: 'NInputNumber',
      label: '设备数量',
      required: true,
      ifShow: () => type === 'batch',
      componentProps: { min: 1, precision: 0, max: 500 },
    },
  ];
};
