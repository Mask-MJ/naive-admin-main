import { FormSchema } from '@/components/Form';

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
