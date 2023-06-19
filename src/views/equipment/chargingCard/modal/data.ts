import type { FormSchema } from '@/components/Form';
import type { DescItem } from '@/components/Descriptions';
import { NTooltip, SelectOption } from 'naive-ui';
import { getMemberList } from '@/api/modules/equipment/chargingCard';

export const schemas: FormSchema[] = [
  {
    path: 'cardCode',
    label: '卡号',
    rule: {
      required: true,
      message: '卡号长度不能超过16位，且不能包含字母',
      trigger: 'blur',
      pattern: /^[0-9]{1,16}$/,
    },
    component: 'NInput',
    componentProps: {
      maxlength: 16,
    },
    span: 12,
  },
  {
    path: 'type',
    label: '卡类型',
    span: 12,
    required: true,
    component: 'NSelect',
    componentProps: {
      renderOption: ({ node, option }: { node: VNode; option: SelectOption }) =>
        h(NTooltip, null, {
          trigger: () => node,
          default: () => {
            const map = new Map([
              [1, '「校验卡」是指卡内不存钱。使用「校验卡」充电，费用在绑定的会员平台钱包内扣取。'],
              [
                2,
                '「储值卡」是指资金储存于卡内，平台不对卡内资金管理！使用「储值卡」充电时，充电费用由桩体的读卡器扣取！',
              ],
              [
                3,
                '「VIN卡」是指卡内不存钱，费用在绑定的会员平台钱包内扣取。「VIN卡」卡号为车辆VIN，可支持插抢即启动充电。',
              ],
            ]);
            return map.get(option.value as number);
          },
        }),
      options: [
        { label: '校验卡', value: 1 },
        { label: '储值卡', value: 2 },
        { label: 'VIN卡', value: 3 },
      ],
    },
  },
  {
    path: 'blackWhiteList',
    label: '黑白名单',
    span: 12,
    required: true,
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '无', value: 0 },
        { label: '白名单', value: 1 },
        { label: '黑名单', value: 2 },
      ],
    },
  },
  {
    path: 'memberId',
    label: '所属会员',
    span: 12,
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getMemberList,
      remote: true,
      filterable: true,
      queryField: 'phoneNumber',
      resultField: 'rows',
      labelField: 'phoneNumber',
      valueField: 'id',
    },
  },
  {
    path: 'status',
    label: '状态',
    span: 12,
    required: true,
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '停用', value: 0 },
        { label: '启用', value: 1 },
      ],
    },
  },
  {
    path: 'verifyPassword',
    label: '检验密码',
    span: 12,
    required: true,
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
  },
  {
    path: 'password',
    label: '密码',
    span: 12,
    component: 'NInput',
    rule: {
      required: true,
      message: '密码为纯数字，且长度在4-6之间',
      trigger: 'blur',
      pattern: /^[0-9]{4,6}$/,
    },
    componentProps: {
      type: 'password',
      showPasswordOn: 'click',
    },
  },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: {
      type: 'textarea',
    },
  },
];

export const detailSchemas: DescItem[] = [
  { path: 'cardCode', label: '卡号' },
  { path: 'createTime', label: '创建时间' },
  {
    path: 'phoneNumber',
    label: '所属会员',
    render: (val) => (val ? val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : ''),
  },
  { path: 'verifyPassword', label: '是否校验密码', render: (val) => val?.desc },
  { path: 'status', label: '当前状态', render: (val) => val?.desc },
  { path: 'type', label: '所持卡类型', render: (val) => val?.desc },
  { path: 'blackWhiteList', label: '黑白名单', render: (val) => val?.desc },
];
