import type { DescItem } from '@/components/Descriptions';

export const memberInfoSchemas: DescItem[] = [
  { path: 'nickName', label: '会员昵称' },
  { path: 'phoneNumber', label: '会员手机号' },
];

export const couponSchemas: DescItem[] = [
  { path: 'name', label: '优惠券名称' },
  { path: 'discountType', label: '优惠类型', render: (row) => row.desc },
  { path: 'minConsumption', label: '满额限制', render: (row) => `${row}元` },
  { path: 'amount', label: '面额', render: (row) => `${row}元` },
  { path: 'canStack', label: '叠加使用', render: (row) => (row ? '是' : '否') },
  { path: 'used', label: '使用状态', render: (row) => (row ? '已使用' : '未使用') },
  { path: 'source', label: '来源', render: (row) => (row === 1 ? '优惠活动' : '后台发券') },
  { path: 'createTime', label: '创建时间' },
  { path: 'expiryDate', label: '到期时间' },
];
