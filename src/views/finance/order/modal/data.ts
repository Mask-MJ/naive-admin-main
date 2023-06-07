import type { DescItem } from '@/components/Descriptions';

export const schema: DescItem[] = [
  { path: 'code', label: '订单编号' },
  { path: 'createBy', label: '创建者' },
  { path: 'createTime', label: '创建时间' },
  { path: 'credential', label: '凭据' },
  { path: 'id', label: 'ID' },
  { path: 'orderStatus', label: '订单状态', render: (val) => `${val?.desc}` },
  { path: 'ownerId', label: '拥有者id' },
  { path: 'payStatus', label: '支付状态', render: (val) => `${val?.desc}` },
  { path: 'payTime', label: '支付时间' },
  { path: 'paymentMethod', label: '支付方式', render: (val) => `${val?.desc}` },
  { path: 'phoneNumber', label: '所属会员' },
  { path: 'totalAmount', label: '订单金额' },
  { path: 'updateBy', label: '更新者' },
  { path: 'updateTime', label: '更新时间' },
  { path: 'userId', label: '所属会员id' },
  { path: 'remark', label: '备注' },
];
