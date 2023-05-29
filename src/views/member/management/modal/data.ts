import type { FormSchema } from '@/components/Form';
import { NPopover } from 'naive-ui';

export const schemas: FormSchema[] = [
  {
    path: 'nickname',
    component: 'NInput',
    label: '会员昵称',
    componentProps: { disabled: true },
  },
  {
    path: 'id',
    component: 'NInput',
    label: '用户id',
    componentProps: { disabled: true },
  },
  {
    path: 'balance',
    component: 'NInputNumber',
    label: '当前余额',
    componentProps: { showButton: false, disabled: true },
  },
  {
    path: 'balance2',
    component: 'NInputNumber',
    label: '充值后余额',
    render: ({ model }) => h('span', null, Number(model['balance']) + (model['money'] || 0)),
    componentProps: { showButton: false, disabled: true },
  },
  {
    path: 'money',
    component: 'NInputNumber',
    label: '充值金额',
    componentProps: {
      precision: 2,
      showButton: false,
    },
    required: true,
    renderComponentContent: () => ({ suffix: () => '元' }),
  },
  { path: 'credential', component: 'NInput', label: '凭据' },
  { path: 'remark', component: 'NInput', label: '备注' },
];

export const orderSchemas: FormSchema[] = [
  {
    path: 'overCharge',
    component: 'NRadioGroup',
    label: '允许多充',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    path: 'id',
    component: 'NInput',
    label: '用户id',
    show: false,
  },
  {
    path: 'limitAmount',
    component: 'NInputNumber',
    label: '最小余额',
    defaultValue: 0,
    ifShow: ({ model }) => model['overCharge'],
    componentProps: { precision: 2, showButton: false, min: 0 },
    renderComponentContent: () => ({
      suffix: () =>
        h(
          NPopover,
          { trigger: 'hover', placement: 'top' },
          {
            default: () =>
              h('span', null, '允许用户多充的最小余额，当用户当前余额大于此金额时才能进行多充'),
            trigger: () =>
              h('i', {
                class: 'i-ant-design:info-circle-outlined',
                style: { color: '#999', cursor: 'pointer' },
              }),
          },
        ),
    }),
  },
  {
    path: 'limitOrder',
    component: 'NInputNumber',
    label: '最大订单数',
    defaultValue: 1,
    ifShow: ({ model }) => model['overCharge'],
    componentProps: { precision: 0, showButton: false, min: 1 },
    renderComponentContent: () => ({
      suffix: () =>
        h(
          NPopover,
          { trigger: 'hover', placement: 'top' },
          {
            default: () =>
              h(
                'span',
                null,
                '允许用户多充的最大订单数。当用户进行多充时，当存在此数量的充电中状态的订单时，不允许再新增充电订单',
              ),
            trigger: () =>
              h('i', {
                class: 'i-ant-design:info-circle-outlined',
                style: { color: '#999', cursor: 'pointer' },
              }),
          },
        ),
    }),
  },
];
