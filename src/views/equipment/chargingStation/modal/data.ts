import type { FormSchema } from '@/components/Form';
import { NButton } from 'naive-ui';
import { getCarModelList } from '@/api/modules/equipment/chargingStation';
import { useModal } from '@/components/Modal';
import { uploadApi } from '@/api/modules/basic/common';

export const [registerMapModal, { openModal: openMapModel }] = useModal();

export const schemas: FormSchema[] = [
  { path: 'id', component: 'NInput', show: false },
  { path: 'name', component: 'NInput', label: '充电站名称', required: true, span: 8 },
  {
    path: 'operationType',
    component: 'NSelect',
    label: '运营类型',
    required: true,
    span: 8,
    componentProps: {
      options: [
        { label: '自营', value: 1 },
        { label: '加盟', value: 2 },
        { label: '第三方', value: 3 },
      ],
    },
  },
  {
    path: 'stationType',
    component: 'NSelect',
    label: '站点类型',
    required: true,
    span: 8,
    componentProps: {
      options: [
        { label: '个人', value: 1 },
        { label: '公用', value: 2 },
        { label: '专用(公交)', value: 3 },
      ],
    },
  },
  {
    path: 'isChargeCar',
    component: 'NRadioGroup',
    label: '是否充电车',
    defaultValue: 0,
    span: 8,
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
  },
  {
    path: 'chargeCarModelId',
    component: 'ApiSelect',
    label: '充电车型号',
    required: true,
    span: 8,
    ifShow: ({ values }) => values.isChargeCar,
    componentProps: {
      api: getCarModelList,
      immediate: true,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    path: 'licensePlate',
    component: 'NInput',
    label: '车牌号码',
    required: true,
    ifShow: ({ values }) => values.isChargeCar,
    span: 8,
  },
  {
    path: 'placeType',
    component: 'NSelect',
    label: '建设场所',
    required: true,
    span: 8,
    ifShow: ({ values }) => !values.isChargeCar,
    componentProps: {
      options: [
        { label: '居民区', value: 1 },
        { label: '公共机构', value: 2 },
        { label: '事业单位', value: 3 },
        { label: '写字楼', value: 4 },
        { label: '其他', value: 5 },
      ],
    },
  },
  {
    path: 'positionType',
    component: 'NSelect',
    label: '站点位置',
    required: true,
    span: 8,
    ifShow: ({ values }) => !values.isChargeCar,
    componentProps: {
      options: [
        { label: '室内地面', value: 1 },
        { label: '室内地下', value: 2 },
        { label: '室外', value: 3 },
      ],
    },
  },
  {
    path: 'province',
    component: 'NInput',
    label: '省',
    required: true,
    ifShow: ({ values }) => !values.isChargeCar,
    componentProps: { disabled: true },
    span: 8,
  },
  {
    path: 'city',
    component: 'NInput',
    label: '市',
    required: true,
    ifShow: ({ values }) => !values.isChargeCar,
    componentProps: { disabled: true },
    span: 8,
  },
  {
    path: 'district',
    component: 'NInput',
    label: '区',
    required: true,
    ifShow: ({ values }) => !values.isChargeCar,
    componentProps: { disabled: true },
    span: 8,
  },
  {
    path: 'address',
    component: 'NInput',
    label: '安装地址',
    required: true,
    ifShow: ({ values }) => !values.isChargeCar,
    renderComponentContent: ({ model }) => ({
      suffix: () =>
        h(NButton, { text: true, onClick: () => openMapModel(true, model) }, () =>
          h('i', { class: 'i-ant-design:environment-outlined' }),
        ),
    }),
  },
  { path: 'longitude', component: 'NInputNumber', label: '经度', show: false },
  { path: 'latitude', component: 'NInputNumber', label: '纬度', show: false },
  { path: 'internalSn', component: 'NInput', label: '内部编号', required: true, span: 8 },
  {
    path: 'images',
    component: 'Upload',
    label: '站点图片',
    componentProps: {
      max: 4,
      name: 'file',
      accept: 'image/*',
      type: ['image/png', 'image/jpeg', 'image/jpg'],
      api: uploadApi,
    },
  },

  { path: 'divider-basic', component: 'NDivider', renderComponentContent: '物业信息' },
  { path: 'propertyRightUnit', component: 'NInput', label: '产权单位' },
  { path: 'linkman', component: 'NInput', label: '联系人', span: 8 },
  { path: 'tel', component: 'NInput', label: '联系电话', span: 8 },
  { path: 'carportAmount', component: 'NInputNumber', label: '车位数量', span: 8 },
  {
    path: 'propertyDescription',
    component: 'NInput',
    label: '物业描述',
    componentProps: {
      type: 'textarea',
    },
  },

  { path: 'divider-basic', component: 'NDivider', renderComponentContent: '电路信息' },
  { path: 'kva', component: 'NInputNumber', label: '供电容量', span: 8 },
  {
    path: 'kvType',
    component: 'NSelect',
    label: '电压等级',
    span: 8,
    componentProps: {
      options: [
        { label: '标准', value: 1 },
        { label: '低压', value: 2 },
      ],
    },
  },
  { path: 'supplyLine', component: 'NInput', label: '供电线路', span: 8 },
];
