import type { DescItem } from '@/components/Descriptions';

export const schema: DescItem[] = [
  { path: 'name', label: '名称' },
  { path: 'code', label: '编号' },
  { path: 'brand', label: '品牌', render: (val) => (val ? val.name : '----') },
  { path: 'company', label: '所属公司' },
  { path: 'station', label: '所属电站', render: (val) => (val ? val.name : '----') },
  { path: 'model', label: '型号', render: (val) => (val ? val.name : '----') },
  { path: 'openingStatus', label: '运营状态', render: (val) => (val ? '营业中' : '已停业') },
  { path: 'chargeType', label: '充电类型', render: (val) => (val ? val.desc : '----') },
  { path: 'gunAmount', label: '充电枪数量' },
];
