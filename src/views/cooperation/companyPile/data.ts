import type { BasicColumn, FormSchema } from '@/components/Table';
import type { CompanyPileList } from '@/api/modules/cooperation/types/companyPile';
import { getChargeStationOptions } from '@/api/modules/equipment/chargingPile';
import { NTag } from 'naive-ui';

export const schemas: FormSchema[] = [
  { path: 'pileName', label: '充电桩名称', component: 'NInput', span: 8 },
  { path: 'code', label: '编号', component: 'NInput', span: 8 },
  { path: 'brandName', label: '品牌', component: 'NInput', span: 8 },
  { path: 'modelName', label: '型号', component: 'NInput', span: 8 },
  {
    path: 'stationIds',
    label: '所属电站',
    component: 'ApiSelect',
    span: 8,
    componentProps: {
      immediate: true,
      api: getChargeStationOptions,
      labelField: 'name',
      valueField: 'id',
    },
  },
  { path: 'company', label: '所属公司', component: 'NInput', span: 8 },

  {
    path: 'openingStatus',
    component: 'NSelect',
    label: '运营状态',
    span: 8,
    componentProps: {
      options: [
        { label: '营业中', value: '1' },
        { label: '已停业', value: '0' },
      ],
    },
  },
  {
    path: 'status',
    component: 'NSelect',
    label: '服务状态',
    span: 8,
    componentProps: {
      multiple: true,
      options: [
        { label: '离线', value: '0' },
        { label: '空闲', value: '1' },
        { label: '服务中', value: '2' },
      ],
    },
  },
  {
    path: 'useTypes',
    component: 'NSelect',
    label: '使用范围',
    span: 8,
    componentProps: {
      multiple: true,
      options: [
        { label: '个人', value: '1' },
        { label: '公用', value: '2' },
        { label: '专用', value: '3' },
        { label: '私人', value: '4' },
      ],
    },
  },
  {
    path: 'chargeType',
    component: 'NSelect',
    label: '充电类型',
    span: 8,
    componentProps: {
      options: [
        { label: '直流', value: '1' },
        { label: '交流', value: '2' },
      ],
    },
  },
];

export const columns: BasicColumn<CompanyPileList>[] = [
  { title: '充电桩名称', key: 'name', width: 150 },
  { title: '编号', key: 'code', width: 150 },
  {
    title: '所属公司',
    key: 'company',
    width: 200,
    ellipsis: true,
    render: (rowData) => rowData.company ?? '------',
  },
  { title: '所属电站', key: 'station.name', width: 200 },
  { title: '品牌', key: 'brand.name', width: 150 },
  { title: '型号', key: 'model.name', width: 150 },
  { title: '充电枪数量', key: 'gunAmount', width: 100 },
  { title: '充电类型', key: 'chargeType.desc', width: 100 },
  {
    title: '运营状态',
    key: 'openingStatus',
    width: 80,
    render: (rowData) => {
      return rowData.openingStatus ? '营业中' : h(NTag, { type: 'error' }, () => '已停业');
    },
  },
  { title: '最后上线时间', key: 'lastOnlineTime', width: 200 },
];
