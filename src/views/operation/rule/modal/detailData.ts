import type { DescItem } from '@/components/Descriptions';
import type { SelectPickerOption } from '@/components/Form';

const basicSchema: DescItem[] = [
  { path: 'ruleName', label: '规则名称' },
  { path: 'issueTime', label: '下发时间' },
  { path: 'groupName', label: '所属分组' },
  { path: 'ruleDescript', label: '规则说明' },
];

const occupySchema: DescItem[] = [
  { path: 'freeTime', label: '免费时长', render: (val) => (val ? val + '分钟' : '未设置') },
  { path: 'highConsume', label: '最高消费', render: (val) => (val ? val + '元/单' : '未设置') },
  {
    path: 'standardMoney',
    label: '标准占桩费',
    render: (val, data) => (val ? `${val} 元 / ${data.standardTime} 分钟` : '未设置'),
  },
];

const appointmentSchema: DescItem[] = [
  {
    path: 'reserveTime',
    label: '预约保留时长',
    render: (val) => (val ? val + '分钟/次' : '未设置'),
  },
  {
    path: 'reserveCharge',
    label: '预约计费',
    render: (val) => (val ? val + '元/次' : '未设置'),
  },
];

const chargingSchema: DescItem[] = [
  {
    path: 'ruleModel',
    label: '规则模式',
    render: (val) => (val === 0 ? '标准计费' : '分时计费(尖峰平谷)'),
  },
];

const standardSchema: DescItem[] = [
  { path: 'standardEnergy', label: '标准电费', render: (val) => val + '元/度' },
  { path: 'standardService', label: '标准服务费', render: (val) => val + '元/度' },
];

const timeSlotSchema: DescItem[] = [
  { path: 'tipEnergy', label: '尖时电费', render: (val) => val + '元/度' },
  { path: 'peakEnergy', label: '峰时电费', render: (val) => val + '元/度' },
  { path: 'ordinaryEnergy', label: '平时电费', render: (val) => val + '元/度' },
  { path: 'valleyEnergy', label: '谷时电费', render: (val) => val + '元/度' },
  { path: 'tipService', label: '尖时服务费', render: (val) => val + '元/度' },
  { path: 'peakService', label: '峰时服务费', render: (val) => val + '元/度' },
  { path: 'ordinaryService', label: '平时服务费', render: (val) => val + '元/度' },
  { path: 'valleyService', label: '谷时服务费', render: (val) => val + '元/度' },
];

export const detailData = [
  { id: 1, title: '基础数据', schema: basicSchema },
  { id: 2, title: '占桩费设置', schema: occupySchema },
  { id: 3, title: '预约设置', schema: appointmentSchema },
  { id: 4, title: '规则模式', schema: chargingSchema },
  { id: 5, title: '标准计费', schema: standardSchema },
  { id: 6, title: '分时计费', schema: timeSlotSchema, column: 4 },
];

export const options: SelectPickerOption[] = [
  { label: '尖', type: 'error', path: 'tipTime' },
  { label: '峰', type: 'warning', path: 'peakTime' },
  { label: '平', type: 'success', path: 'ordinaryTime' },
  { label: '谷', type: 'info', path: 'valleyTime' },
];
