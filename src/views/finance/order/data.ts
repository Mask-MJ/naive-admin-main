import type { BasicColumn, FormSchema } from '@/components/Table';
import type { OrderList } from '@/api/modules/finance/types/order';
import { getUserList } from '@/api/modules/finance/order';

export const schemas: FormSchema[] = [
  { path: 'code', label: '订单编号', component: 'NInput', span: 6 },
  {
    path: 'memberBelong',
    label: '所属会员',
    component: 'AutoComplete',
    span: 6,
    componentProps: {
      immediate: false,
      allOptions: true,
      resultField: 'rows',
      api: getUserList,
    },
  },
  {
    path: '[startTime,endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 12,
    changeEvent: 'update:formatted-value',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
  },
  { path: 'createBy', label: '创建者', component: 'NInput', span: 6 },
  {
    path: 'payStatus',
    component: 'NSelect',
    label: '支付状态',
    span: 6,
    componentProps: {
      options: [
        { label: '未支付', value: '0' },
        { label: '已支付', value: '1' },
      ],
    },
  },
  {
    path: '[startPayTime,endPayTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 12,
    changeEvent: 'update:formatted-value',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
  },
  {
    path: 'paymentMethod',
    component: 'NSelect',
    label: '支付方式',
    span: 6,
    componentProps: {
      options: [
        { label: '线下支付', value: '1' },
        { label: '微信', value: '2' },
        { label: '支付宝', value: '3' },
      ],
    },
  },
  {
    path: 'orderStatus',
    component: 'NSelect',
    label: '订单状态',
    span: 6,
    componentProps: {
      options: [
        { label: '待支付', value: '0' },
        { label: '已支付', value: '1' },
        { label: '已完成', value: '2' },
        { label: '已取消', value: '3' },
      ],
    },
  },
];

export const columns: BasicColumn<OrderList>[] = [
  { title: '订单编号', key: 'code', width: 200 },
  {
    title: '订单金额',
    key: 'totalAmount',
    width: 100,
    render: (rowData) => {
      return h('span', { style: { color: '#ea1b1b' } }, rowData.totalAmount);
    },
  },
  { title: '所属会员', key: 'phoneNumber', width: 100 },
  { title: '支付方式', key: 'paymentMethod.desc', width: 100 },
  { title: '创建时间', key: 'createTime', width: 200 },
  { title: '支付时间', key: 'payTime', width: 200 },
  { title: '支付状态', key: 'payStatus.desc', width: 100 },
  { title: '订单状态', key: 'orderStatus.desc', width: 100 },
  { title: '创建者', key: 'createBy', width: 100 },
];
