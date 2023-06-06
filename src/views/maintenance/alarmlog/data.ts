import type { FormSchema, BasicColumn } from '@/components/Table';

export const schemas: FormSchema[] = [
  {
    path: 'shortAddress',
    component: 'NInput',
    label: '省份城市',
    span: 6,
  },
  {
    path: 'station',
    component: 'NInput',
    label: '充电站',
    span: 6,
  },
  {
    path: 'pileCode',
    component: 'NInput',
    label: '充电桩编号',
    span: 6,
  },
  {
    path: 'gunName',
    component: 'NInput',
    label: '充电枪',
    span: 6,
  },
  {
    path: 'alarmCode',
    component: 'NInput',
    label: '告警编码',
    span: 6,
  },
  {
    path: 'alarmStatus',
    label: '告警状态',
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '恢复', value: 0, key: '0' },
        { label: '告警', value: 1, key: '1' },
        { label: '人工处理', value: 2, key: '2' },
      ],
    },
    span: 6,
  },
  {
    path: '[alarmTimeStart, alarmTimeEnd]',
    label: '告警时间',
    component: 'NDatePicker',
    changeEvent: 'update:formatted-value',
    componentProps: {
      type: 'datetimerange',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
    span: 12,
  },
];

export const columns: BasicColumn[] = [
  {
    title: '告警时间',
    key: 'alarmTime',
    width: 150,
  },
  {
    title: '省份城市',
    key: 'shortAddress',
    width: 150,
  },
  {
    title: '充电站',
    key: 'station',
    width: 100,
  },
  {
    title: '充电桩',
    key: 'pileCode',
    width: 150,
  },
  {
    title: '充电枪',
    key: 'gunName',
    width: 100,
  },
  {
    title: '告警编码',
    key: 'alarmCode',
    width: 100,
  },

  {
    title: '告警状态',
    key: 'alarmStatus.desc',
    width: 100,
  },
  {
    title: '告警值',
    key: 'alarmValue',
    width: 100,
  },
  {
    title: '告警内容',
    key: 'alarmMsg',
    width: 150,
  },
  {
    title: '处理说明',
    key: 'handleMsg',
    width: 150,
    render: ({ value }) => value || '----',
  },
];
