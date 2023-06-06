import type { BasicColumn, FormSchema } from '@/components/Table';
import type { CouponList } from '@/api/modules/member/types/memberCoupon';

export const schemas: FormSchema[] = [
  { path: 'name', label: '优惠券名称', component: 'NInput', span: 8 },
  {
    path: 'discountType',
    label: '优惠类型',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '服务费', value: 1 },
        { label: '电费', value: 2 },
        { label: '服务费+电费', value: 3 },
      ],
    },
  },
  {
    path: 'canStack',
    label: '叠加使用',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
  },
  {
    path: '[minConsumptionMin, minConsumptionMax]',
    label: '满额限制',
    component: 'NInput',
    span: 8,
    componentProps: { placeholder: ['最小值', '最大值'], pair: true, separator: '-' },
  },
  {
    path: '[minAmount, maxAmount]',
    label: '面额',
    component: 'NInput',
    span: 8,
    componentProps: { placeholder: ['最小值', '最大值'], pair: true, separator: '-' },
  },
  {
    path: 'used',
    label: '使用状态',
    component: 'NSelect',
    span: 8,
    componentProps: {
      options: [
        { label: '未使用', value: 0 },
        { label: '已使用', value: 1 },
      ],
    },
  },
  { path: 'nickName', label: '会员昵称', component: 'NInput', span: 8 },
  { path: 'phoneNumber', label: '会员手机号', component: 'NInput', span: 8 },
  { path: 'source', label: '来源', component: 'NInput', span: 8 },
  {
    path: '[beginCreateTime, endCreateTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 16,
    changeEvent: 'update:formatted-value',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
  },
];

export const columns: BasicColumn<CouponList>[] = [
  { title: '会员昵称', key: 'nickName', width: 100 },
  { title: '会员手机号', key: 'phoneNumber', width: 150 },
  { title: '优惠券名称', key: 'name', width: 150 },
  { title: '优惠类型', key: 'discountType.desc', width: 150 },
  { title: '满额限制(元)', key: 'minConsumption', width: 150 },
  { title: '面额(元)', key: 'amount', width: 100 },
  {
    title: '叠加使用',
    key: 'canStack',
    width: 100,
    render: (rowData) => (rowData.canStack ? '是' : '否'),
  },
  { title: '创建时间', key: 'createTime', width: 150 },
  { title: '到期时间', key: 'expiryDate', width: 150 },
  {
    title: '使用状态',
    key: 'used',
    width: 100,
    render: (rowData) => (rowData.used ? '已使用' : '未使用'),
  },
  {
    title: '来源',
    key: 'source',
    width: 100,
    render: (rowData) => (rowData.source === 1 ? '优惠活动' : '后台发券'),
  },
];
